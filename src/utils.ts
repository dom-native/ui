
//#region    ---------- css ---------- 
/**
 * From mvdom-xp
 * Minimilist DOM css class helper. 
 * 
 * Setter: Base on keyValues, for value null or === false, the class name key is removed, otherwise it is added. 
 * 
 * Examples: 
 *   - `css(el, {prime: true, 'dark-mode': false} )` add css class 'prime' and remove 'dark-mode'
 *   - `css(el, {prime: someNonNullObject, 'dark-mode': false})` same as above. 
 *   - `css(els, {prime: someNonNullObject, 'dark-mode': false})` Will add/remove class for all of the elements.
 * 
 * @param el 
 * @param keyValues e.g. `{prime: true, 'dark-mode': fase, 'compact-view': someObj}`
 */
export function css<E extends HTMLElement | HTMLElement[]>(els: E, keyValues: { [name: string]: boolean | null | object }): E {

	if (els instanceof Array) {
		for (const el of els) {
			_setCss(el, keyValues);
		}
	}
	else {
		_setCss(els as HTMLElement, keyValues);
	}
	return els;
}

function _setCss(el: HTMLElement, keyValues: { [name: string]: boolean | null | object }) {
	for (const name of Object.keys(keyValues)) {
		const val = keyValues[name];
		if (val === null || val === false) {
			el.classList.remove(name);
		} else if (val !== undefined) { // for now, do nothing if undefined
			el.classList.add(name);
		}
	}
}
//#endregion ---------- /css ----------