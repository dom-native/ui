import { all, append, BaseHTMLElement, customElement, elem, first, frag, getAttr, off, on, setAttr, style, trigger } from 'dom-native';
import { BaseFieldElement } from './d-base-field.js';

/**
 * d-select is a select component.
 *
 * Usage: `<d-select name="fieldA" value="0" popup-css="my-select-popup"><option value="0">Item 0</option></d-select>`
 * See:  http://localhost:8080/_spec/controls
 * 
 * Attributes:
 *   - See BaseFieldElement.
 *   - `popup-css?` the css class text to be added to the `d-select-popup` for custom styling.
 *   - DEPRECATED AND REMOVED (FOR CSP) : `popup-style?` style text to be added to the `d-select-popup` after the set values (top/left/width)
 * 
 * Properties:
 *   - See BaseFieldElement.
 *   - `options: Option[]` The list of options object for this field. Can be initialized with HTML content or with the DATA API.
 * 
 * CSS:
 *   - See BaseFieldElement.
 * 
 * Content (NOT reflective, just for initialization)
 *   - List of `<option value="1">Value 1</option>` (value must be unique, one can be non present, which === null)
 *   - or shorthand for one option `<d-select value="1">Value One</d-select>` will create one `<option` with this value/content
 *   - or shorhand for place holder `<d-select>Select User</d-select>` same as `<d-select placeholder="Select User"></d-select>`
 * 
 * Events:
 *   - `CHANGE` see BaseFieldElement.
 *   - `DATA` with `evt.detail: {sendData: (options: Option[]) => void}` that provide a data callback when the component needs the data.
 * 
 */
export type SelectOption = { content: string, value: string | null };
export type SelectDataSender = (options: SelectOption[]) => void;

@customElement('d-select')
export class SelectElement extends BaseFieldElement {

	static get observedAttributes() { return BaseFieldElement.observedAttributes.concat(); }

	labelEl: any;

	popupShowing = false;

	//// Key Elements
	iptEl!: HTMLElement;

	//// Properties
	options: SelectOption[] = [];

	//// Property (Value)
	get value() {
		return this.getAttribute('value');
	}
	set value(v: string | null) {
		setAttr(this, 'value', v);
		this.refresh();
	}

	get popupCss(): string | null { return getAttr(this, 'popup-css') }

	//#region    ---------- Component Events ----------
	triggerData(sendData: SelectDataSender) {
		trigger(this, 'D-DATA', { detail: sendData });
	}
	//#endregion ---------- /Component Events ---------- 


	//#region    ---------- Lifecycle ---------- 

	// Component initialization (will be called once by BaseHTMLElement on first connectedCallback)
	init() {
		super.init();


		const [label, value] = getAttr(this, 'label', 'value');

		//// create the appropriate this.options list from content HTML
		const firstElement = this.firstElementChild;
		let content: string | null = null;
		// if we have options, then, we create the list
		if (firstElement && firstElement.tagName === "OPTION") {
			this.options = all(this, 'option').map(option => { return { content: option.innerHTML, value: option.getAttribute('value') } });
		}
		// if the content is not <option>, then, assume it shorthands for 
		//   - placeholder (if no value)
		//   - the content of the only option of the value (if value)
		else {
			content = (firstElement) ? firstElement.textContent : (this.firstChild) ? this.firstChild.textContent : null;
			if (content) {
				// if we have a value, then, create the single options with this value and content.
				if (value != null) {
					this.options.push({ value, content });
				}
				// otherwise, we set the place holder with the content
				else {
					this.placeholder = content;
				}
			}
		}

		//// Create Content
		let tmp = frag(`<label></label><div class="d-ipt"></div><d-ico class="chevron" name="d-ico-chevron-down"></d-ico><div class="d-box"></div>`);
		let els = [...tmp.children];
		[this.labelEl, this.iptEl] = [...tmp.children] as HTMLElement[];
		this.labelEl.textContent = label;
		this.innerHTML = ''; // to remove

		// Add ico-lead if needed
		const icoLead = this.icoLead;
		if (icoLead) {
			const icoEl = setAttr(elem('d-ico'), { 'name': icoLead, 'class': 'lead' });
			append(tmp, icoEl, 'first');
		}

		this.appendChild(tmp);

		//// Refresh the content
		this.refresh();

		//// Bind internal component events
		on(this, 'click', (evt) => {

			if (!this.popupShowing && !this.disabled && !this.readonly) {
				const popupCss = this.popupCss;
				const cssAttr = (popupCss) ? ` class="${popupCss}" ` : '';
				let popupFrag = frag(`<d-select-popup${cssAttr}></d-select-popup>`).firstElementChild as SelectPopupElement;

				popupFrag._options = this.options;
				popupFrag._select = this;

				// Append it to the body.
				// Note: SelectPopupElement constructor get called as it get appended to document)
				const popup = first('body')!.appendChild(popupFrag);
				this.classList.add('focused');
				this.popupShowing = true;

				// listen the popup if select occurs
				on(popup, 'SELECT, CANCELED', (evt) => {
					if (evt.type === 'SELECT') {
						this.value = evt.detail.value;

						this.triggerChange();
						this.refresh();
					} else {
						// do nothing, assume the popup auto hide
					}
					this.classList.remove('focused');
					this.popupShowing = false;
				});

				// trigger a data event if a listener wants to provide data

				this.triggerData((options: SelectOption[]) => {
					this.options = options; // TODO: probably needs to have popup just asking select for options[]
					popup.options = options;
				});
			}

		});
	}
	//#endregion ---------- /Lifecycle ---------- 

	refresh() {
		const val = this.value;
		this.noValue = (val == null || val === '');

		if (this.noValue) {
			let text: string | null | undefined = this.placeholder;
			if (text) {
				this.iptEl.innerHTML = text;
			} else {
				this.iptEl.innerHTML = '';
			}
		} else {
			const option = this.options.find(o => (o.value === val));
			if ((option == null || option.value == null) && this.placeholder != null) {
				this.iptEl.textContent = this.placeholder;
			} else if (option) {
				this.iptEl.innerHTML = option.content;
			}
		}




	}
}




//#region    ---------- SelectPopupElement ---------- 
/**
 * Component to be used only by the SelectElement (for now).
 * Events: 
 * 	- `SELECT` when an item is selected
 * 	- `CANCELED` when the user click outside
 */
@customElement('d-select-popup')
class SelectPopupElement extends BaseHTMLElement {
	_options!: SelectOption[];
	_select!: SelectElement;

	//// Properties
	get options() { return this._options };
	set options(val: SelectOption[]) {
		this._options = val;
		if (this.initialized) {
			this.render();
		}
	}

	//#region    ---------- Lifecycle ---------- 
	init() {
		super.init();

		this.render();

		// events
		on(this, 'click', 'li', (evt) => {
			const li = evt.selectTarget;
			const value = getAttr(li, 'data-val');
			trigger(this, 'SELECT', { detail: { value } })
			this.remove();
		});

		// TRICK: put on a timeout to get the event only after display, otherwise we get the click even when the 
		//        user click on the d-select. 
		//        TODO: might need to find a more elegant way.
		// IMPORTANT: MUST be unbound in the disconnectedCallback
		// setTimeout(() => {
		// 	on(document, 'click', (evt) => {
		// 		// TODO 
		// 		const target = evt.target as HTMLElement;
		// 		if (target.closest('d-select-popup') !== this) {
		// 			this.remove();
		// 			trigger(this, 'CANCELED');
		// 		}

		// 	}, { ns: this.uid });

		// }, 10)

	}

	// IMPORTANT: unregister parent DOM event bindings in the disconnectedCallback
	disconnectedCallback() {
		super.disconnectedCallback(); // ALWAYS
		off(document, { ns: this.uid });
	}

	preDisplay() {
		// position the popup
		const emRect = this._select.getBoundingClientRect();
		const currentStyle = this.style;

		// Note: here we use || and not ?? because empty string is non defined
		const newStyle = {
			top: currentStyle.top || window.scrollY + emRect.top + emRect.height + 4 + 'px',
			left: currentStyle.left || window.scrollX + emRect.left + 'px',
			width: currentStyle.width || emRect.width + 'px'
		}
		style(this, newStyle);
	}

	postDisplay() {
		// Do the binding on postDisplay to avoid getting first click. 
		on(document, 'click', (evt) => {
			// TODO 
			const target = evt.target as HTMLElement;
			if (target.closest('d-select-popup') !== this) {
				this.remove();
				trigger(this, 'CANCELED');
			}
		}, { ns: this.uid });
	}
	//#region ---------- /Lifecycle ---------- 


	render() {
		const selectVal = this._select.value;
		let html = `\n<ul>`;
		for (const item of this._options) {
			const attrCss = (item.value === selectVal) ? 'class="sel"' : '';
			const attrVal = (item.value) ? `data-val="${item.value}"` : '';
			html += `\n  <li ${attrVal} ${attrCss}>${item.content}</li>`;
		}
		html += `\n</ul>`;
		this.innerHTML = html;
	}

}
//#endregion ---------- /SelectPopupElement ----------