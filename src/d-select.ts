import { BaseHTMLElement, OnEvent, all, customElement, elem, frag, getAttr, html, on, onDoc, onEvent, onWin, setAttr, trigger } from 'dom-native';
import { BaseFieldElement } from './d-base-field.js';
import { BaseInputElement } from './d-base-input.js';
import { svgSymbolEl } from './d-ico-symbol.js';
import { position } from './position.js';

const SHADOW_CONTENT = html`
	<slot name="icon-lead"></slot>
	<slot name="label"></slot>
	<div class="box" part="box"></div>
`;

/**
 * UNDER REFACTORIZATION DO NOT USE 
 * 
 * d-select is a select component.
 *
 * Usage: `<d-select name="fieldA" value="0" popup-css="my-select-popup"><option value="0">Item 0</option></d-select>`
 * See:  http://localhost:8080/_spec/controls
 * 
 * Attributes:
 *   - See BaseFieldElement.
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
export class DSelectElement extends BaseInputElement {

	static get observedAttributes() { return BaseFieldElement.observedAttributes.concat(); }

	// #region    --- Transitive Properties
	get popupCss(): string | null { return getAttr(this, 'popup-css') }
	// #endregion --- Transitive Properties

	popupShowing = false;
	popupEl: null | Element = null;

	#value: any;

	//// Properties
	// options: SelectOption[] = [];

	//// Property (Value)
	get value() {
		return this.#value;
	}
	set value(v: string | null) {
		if (v == null && this.placeholder) {
			this.ctrlEl.part.add("placeholder");
			this.ctrlEl.textContent = this.placeholder;
		} else if (v != null) {
			this.ctrlEl.part.remove("placeholder");
			this.ctrlEl.textContent = v;
		}

		this.#value = v;
	}

	// #region    --- Component Events
	triggerData(sendData: SelectDataSender) {
		trigger(this, 'D-DATA', { detail: sendData });
	}
	// #endregion --- Component Events

	// #region    --- UI Events
	@onEvent('pointerup')
	onClick(evt: PointerEvent) {

		if (!this.popupShowing && !this.disabled && !this.readonly) {

			let options = all(this, "option").map((el) => { return { content: el.innerHTML, value: getAttr(el, "value") } })
			let popupEl = elem('d-select-popup', { class: this.popupCss ?? '' });
			popupEl._setupData = [this, options];

			// Append it to the body.
			document.body.appendChild(popupEl);

			// TODO - handle the focus logic
			// this.classList.add('d-focus');
			this.popupShowing = true;

			// listen the popup if select occurs
			on(popupEl, 'SELECT, CANCEL', (evt) => {
				if (evt.type === 'SELECT') {
					this.value = evt.detail.value;

					this.triggerChange();
					this.refresh();
				} else {
					// do nothing, assume the popup auto hide
				}

				// this.classList.remove('d-focus');
				this.popupShowing = false;
			});

			// trigger a data event if a listener wants to provide data

			// this.triggerData((options: SelectOption[]) => {
			// 	this.options = options; // TODO: probably needs to have popup just asking select for options[]
			// 	popup.options = options;
			// });
		}

	}

	// #endregion --- UI Events


	constructor() {
		super();
		// add the popup component
		this.shadowRoot!.appendChild(elem('slot', { name: 'popup' }));
	}

	// #region    --- Lifecycle
	// Component initialization (will be called once by BaseHTMLElement on first connectedCallback)
	init() {
		super.init();

		this.append(setAttr(svgSymbolEl('d-ico-chevron-down'), { slot: 'icon-trail' }));
		this.classList.add('has-icon-trail');
	}
	// #endregion --- Lifecycle

	refresh() {

	}

	// #region    --- BaseInput Implementations
	createCtrlEl(): HTMLElement {
		return elem('div');
	}

	getInitialValue() {
		return getAttr(this, 'value');
	}
	// #endregion --- BaseInput Implementations
}
declare global {
	interface HTMLElementTagNameMap {
		'd-select': DSelectElement;
	}
}


// #region    --- SelectPopupElement

const SELECT_POPUP_POSITION = Object.freeze({ loc: 'bottom', align: 'left' } as const);

interface WithData { _data: any }
/**
 * Component to be used only by the SelectElement (for now).
 * Events: 
 * 	- `SELECT` when an item is selected
 * 	- `CANCEL` when the user click outside
 */
@customElement('d-select-popup')
class SelectPopupElement extends BaseHTMLElement {
	_setupData!: [DSelectElement, SelectOption[]?];

	previousSelectElRect?: DOMRect;

	get selectEl(): DSelectElement { return this._setupData[0] }

	get selectOptions(): SelectOption[] | undefined { return this._setupData[1] }

	// #region    --- UI Events
	@onEvent('pointerup', '.option')
	onClickOption(evt: Event & OnEvent) {
		let target = (<any>evt.selectTarget) as WithData;
		let option = target._data;
		let selectEl = this._setupData?.[0];
		trigger(this, "SELECT", { detail: option });
		this.discard(false);
	}

	@onDoc('scroll', { capture: true })
	removeOnScroll(evt: Event) {
		// TODO: Add some padding to not close on small scrolls, or prevent scroll all together (making it modal)
		this.discard(true);
	}

	@onWin('resize', { capture: true, passive: true })
	onRepositionEvents(evt: Event) {
		this.reposition();
	}

	// Auto remove when click outide of parent 
	// (click on parent, d-select, will be responsibility of d-select)
	@onDoc('pointerup')
	onDocClick(evt: PointerEvent) {
		if (!this.selectEl.contains(evt.target as Element) && !this.contains(evt.target as Element)) {
			this.discard(true);
		}
	}
	// #endregion --- UI Events

	// #region    --- Lifecycle

	init() {
		let options = this._setupData?.[1];
		if (options != null) {
			let content = frag(options, (o) => elem("div", {
				class: "option",
				value: o.value || "",
				$: {
					textContent: o.content,
					_data: o
				}
			}))
			this.replaceChildren(content);
		}
		this.reposition();
	}


	// #endregion --- Lifecycle


	discard(cancel: boolean) {
		this.remove();
		if (cancel) {
			trigger(this, 'CANCEL');
		}
	}


	reposition() {
		const parentRect = this.selectEl.getBoundingClientRect();
		if (parentRect != null && !isSameRect(parentRect, this.previousSelectElRect)) {
			position(this, { ref: this.selectEl, to: SELECT_POPUP_POSITION, width: true });
		}
		this.previousSelectElRect = parentRect;
	}


}

// Augment the global TagName space to match runtime
declare global {
	interface HTMLElementTagNameMap {
		'd-select-popup': SelectPopupElement;
	}
}


function isSameRect(a: DOMRect, b?: DOMRect): boolean {
	if (b == null) return false;
	return (a.top == b.top && a.left == b.left && a.right == b.right && a.bottom == b.bottom);
}


// #endregion --- SelectPopupElement


