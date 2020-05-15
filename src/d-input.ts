import { attr, customElement, elem } from 'dom-native';
import { BaseInputElement } from './d-base-input';


/**
 * d-input custom element encapsulate a label/input field group ()`d-input > label, input`) structure. 
 * component styles are global but scoped via css naming (see d-input.pcss). 
 * 
 * Usage: `<d-input name="fieldNameA" value="value A"></d-input>`
 * See:  http://localhost:8080/_spec/controls
 * 
 * Attributes: 
 *   - See BaseFieldElement.
 *   - `password?`: set input as password
 * 
 * 
 * Properties: 
 *   - See BaseFieldElement.
 *   - `password: boolean`: reflective of attribute.
 * 
 * CSS:
 *   - See BaseFieldElement.
 * 
 * Content:
 *   - none
 * 
 * Events:
 *   - `CHANGE` see BaseFieldElement.
 * 
 */
@customElement("d-input")
export class InputElement extends BaseInputElement {
	inputEl!: HTMLInputElement

	static get observedAttributes() { return BaseInputElement.observedAttributes.concat(['password']) }

	get value() { return this.inputEl.value };
	set value(val: any) { // today takes any, will get parsed by standard html input element .value
		const inputEl = this.inputEl;
		const old = inputEl.value;

		// set the value. Note that if the UI call this setter, will always be ===
		if (val !== old) {
			inputEl.value = val;
		}

		// get the value from input so that we use the html input parsing behavior
		const newVal = this.value;

		// update the empty state
		this.noValue = (!(newVal && newVal.length > 0));

		// Note: If the UI call this setter, will always be input value old/new will be always equals.
		//       however, it if is programmatic call, it might be different. so for now, we have to always trigger it. 
		//       TODO: need to find a way to trigger only on change.
		this.triggerChange();
	};

	//#region    ---------- BaseInput Implementations ---------- 
	createIptEl(): HTMLInputElement {
		const type = this.hasAttribute('password') ? 'password' : 'text';

		//// Build the component HTML
		const el = elem('input') as HTMLInputElement;
		if (type != null) {
			el.setAttribute('type', type);
		}
		return el;
	}

	getInitialValue() {
		return attr(this, 'value');
	}
	//#endregion ---------- /BaseInput Implementations ---------- 

}


