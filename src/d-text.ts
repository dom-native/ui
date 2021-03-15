import { customElement, elem } from 'dom-native';
import { BaseInputElement } from './d-base-input';


/**
 * d-text custom element encapsulate a label/input field group ()`d-text > label, input`) structure. 
 * component styles are global but scoped via css naming (see d-text.pcss). 
 * 
 * Usage: `<d-text name="fieldNameA" value="value A"></d-text>`
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
@customElement("d-text")
export class TextElement extends BaseInputElement {
	inputEl!: HTMLTextAreaElement

	//// Property (Value)
	get value() { return this.inputEl.value };
	set value(val: any) { // today takes any, will get parsed by standard html input element .value
		const inputEl = this.inputEl;
		const old = inputEl.value;

		// set the value. Note that if the UI call this setter, will always be ===
		if (val !== old) {
			this.inputEl.value = val;
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
	createIptEl(): HTMLTextAreaElement {
		//// Build the component HTML
		const el = elem('textarea') as HTMLTextAreaElement;
		return el;
	}

	getInitialValue() {
		return this.textContent;
	}
	//#endregion ---------- /BaseInput Implementations ----------
}


