import { readable, writable, type StartStopNotifier, type Updater } from 'svelte/store';

const isClient = typeof localStorage !== 'undefined';
const listeners = new Set<(key: string | null, value: string | null) => void>();

let initialized = false;
const initialize = () => {
	if (!initialized && isClient) {
		initialized = true;
		const _setItem = localStorage.setItem;
		localStorage.setItem = (key: string, value: string) => {
			listeners.forEach((listener) => listener(key, value));
			_setItem.call(localStorage, key, value);
		};
	}
};

const save = <T>(key: string, value: T) => {
	if (isClient) localStorage.setItem(key, JSON.stringify(value));
};

const parse = (value: string | null) => {
	if (value !== null) {
		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}
	return null;
};

const listen = (handler: (key: string | null, value: string | null) => void) => {
	initialize();

	const listener = (event: StorageEvent) => {
		handler(event.key, event.newValue);
	};

	if (isClient) window.addEventListener('storage', listener);
	listeners.add(handler);

	return () => {
		if (isClient) window.removeEventListener('storage', listener);
		listeners.delete(handler);
	};
};

const load = (key: string) => {
	if (!isClient) return null;
	const raw = localStorage.getItem(key);
	return parse(raw);
};

/**
 * @example
 * ```
 * const store = writableLocalStorage('key', 'initial-value');
 * ```
 */
export function writableLocalStorage<T>(
	key: string,
	initialValue?: T,
	start?: StartStopNotifier<T>
) {
	const {
		subscribe,
		set: writableSet,
		update: writableUpdate
	} = writable<T>(load(key) ?? initialValue, (originalSet) => {
		const set = (value: T) => {
			save(key, value);
			originalSet(value);
		};

		const unsubscriber = start?.(set);
		const removeListener = listen((_key, _value) => {
			if (_key === key) originalSet(parse(_value) ?? initialValue);
		});

		return () => {
			unsubscriber?.();
			removeListener();
		};
	});
	return {
		subscribe,
		set(value: T) {
			save(key, value);
			writableSet(value);
		},
		update(fn: Updater<T>) {
			writableUpdate((currentValue: T) => {
				const nextValue = fn(currentValue);
				save(key, nextValue);
				return nextValue;
			});
		}
	};
}

/**
 * @example
 * ```
 * const store = readableLocalStorage('key', 'initial-value');
 * ```
 */
export function readableLocalStorage<T>(
	key: string,
	initialValue?: T,
	start?: StartStopNotifier<T>
) {
	return readable<T>(load(key) ?? initialValue, (originalSet) => {
		const set = (value: T) => {
			save(key, value);
			originalSet(value);
		};

		const unsubscriber = start?.(set);
		const removeListener = listen((_key, _value) => {
			if (_key === key) originalSet(parse(_value) ?? initialValue);
		});

		return () => {
			unsubscriber?.();
			removeListener();
		};
	});
}
