const SHIFT = ['shift'];
const META = ['cmd', 'command'];
const CONTROL = ['control', 'ctrl'];
const ALT = ['alt', 'option'];

const FOCUSABLE = ['INPUT', 'TEXTAREA', (el: HTMLElement) => el.getAttribute('tabIndex') !== '-1'];
const CLICKABLE = ['BUTTON', 'A'];

const requireModifier = (MODIFIER: string[], modifiers: string[]) =>
	MODIFIER.some((mod) => modifiers.includes(mod));

const hasModifiers = (event: KeyboardEvent, modifiers: string[]) => {
	if (event.shiftKey !== requireModifier(SHIFT, modifiers)) return false;
	if (event.metaKey !== requireModifier(META, modifiers)) return false;
	if (event.ctrlKey !== requireModifier(CONTROL, modifiers)) return false;
	if (event.altKey !== requireModifier(ALT, modifiers)) return false;
	return true;
};

export function shortcut(el: HTMLElement, param: string) {
	const keys = param.toLowerCase().split('+');
	const key = keys[keys.length - 1];
	const modifiers = keys.length > 1 ? keys.slice(0, -1) : [];

	const listener = (event: KeyboardEvent) => {
		if (event.key === key && hasModifiers(event, modifiers)) {
			event.preventDefault();
			if (CLICKABLE.includes(el.tagName)) {
				el.dispatchEvent(new MouseEvent('click'));
			} else if (FOCUSABLE.some((f) => (typeof f === 'function' ? f(el) : f === el.tagName))) {
				el.focus();
			}
		}
	};

	window.addEventListener('keydown', listener);

	return {
		destroy() {
			window.removeEventListener('keydown', listener);
		}
	};
}
