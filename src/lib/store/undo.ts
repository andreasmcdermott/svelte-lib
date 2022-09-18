import { writable, type StartStopNotifier, type Updater } from 'svelte/store';

type UndoableOptions = {
	historySize?: number;
};

class History<T> {
	history: T[];
	currentSize: number;
	maxSize: number;
	cursor: number;

	constructor(size: number, initialValue: T) {
		this.maxSize = size;
		this.history = new Array<T>(this.maxSize);
		this.cursor = 0;
		this.currentSize = 0;
		this.add(initialValue);
	}
	add(value: T) {
		if (this.currentSize > this.cursor + 1) this.currentSize = this.cursor + 1;
		if (this.currentSize >= this.maxSize) {
			this.history.shift();
			this.history[this.currentSize - 1] = value;
		} else {
			this.cursor = this.currentSize;
			this.history[this.currentSize++] = value;
		}
		return value;
	}
	current() {
		return this.history[this.cursor];
	}
	undo() {
		if (this.cursor > 0) this.cursor--;
		return this.current();
	}
	redo() {
		if (this.cursor < this.currentSize - 1) this.cursor++;
		return this.current();
	}
}

type Maybe<T> = T | undefined;

export function undoable<T>(
	initialValue?: T,
	start?: StartStopNotifier<Maybe<T>>,
	options?: UndoableOptions
) {
	const { historySize = 10 } = options || {};
	const history = new History<Maybe<T>>(historySize, initialValue);
	const { subscribe, set, update } = writable<Maybe<T>>(initialValue, start);
	return {
		subscribe,
		set(value: T) {
			set(history.add(value));
		},
		update(fn: Updater<Maybe<T>>) {
			update((currentValue) => {
				const newValue = fn(currentValue);
				return history.add(newValue);
			});
		},
		undo() {
			set(history.undo());
		},
		redo() {
			set(history.redo());
		}
	};
}
