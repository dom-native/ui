import { append, attr, elem, on } from 'dom-native';
import { BaseFieldElement } from './d-base-field';
import { css } from './utils';


/**
 * Base field element for d-input and d-text (text area)
 * 
 * Attributes: 
 *   - See BaseFieldElement.
 *   - `password?`: set input as password
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
export abstract class BaseInputElement extends BaseFieldElement {


	//// Component Key Children (on demand for more DOM mutation resiliency)
	inputEl!: HTMLInputElement | HTMLTextAreaElement;
	labelEl!: HTMLElement | null;
	labelTrailEl?: HTMLElement;

	//// Properties (CSS Reflective)
	get focused(): boolean { return this.classList.contains('focused') };
	set focused(b: boolean) { css(this, { focused: b }) };

	//// Input value are always text
	abstract get value(): string | null
	abstract set value(val: string | null)

	//#region    ---------- Lifecycle ---------- 
	// Component initialization (will be called once by BaseHTMLElement on first connectedCallback)
	init() {
		super.init();

		//// Build the component HTML
		const content = document.createDocumentFragment();

		// Add ico-lead if needed
		const icoLead = this.icoLead;
		if (icoLead) {
			const icoEl = attr(elem('d-ico'), { 'name': icoLead, 'class': 'lead' });
			content.appendChild(icoEl);
		}

		// add the input
		this.inputEl = this.createIptEl();
		this.inputEl.classList.add('d-ipt');
		content.appendChild(this.inputEl);

		const [label, labelTrail, textTrail] = attr(this, ['label', 'label-trail', 'text-trail']);

		// add the label
		if (label) {
			this.labelEl = elem('label');
			this.labelEl.textContent = label;
			content.appendChild(this.labelEl);
		}

		// add the label-trail
		if (labelTrail) {
			const labelTrailEl = attr(elem('label'), { 'class': 'label-trail' });
			labelTrailEl.textContent = labelTrail;
			content.appendChild(labelTrailEl);
		}

		// add the text-trail 
		if (textTrail) {
			const textTrailEl = attr(elem('div'), { 'class': 'text-trail' });
			textTrailEl.textContent = textTrail;
			content.appendChild(textTrailEl);
		}

		// Add the ico-trail if needed
		const icoTrail = this.icoTrail;
		if (icoTrail) {
			const icoEl = attr(elem('d-ico'), { 'name': icoTrail, 'class': 'trail' });
			content.appendChild(icoEl);
		}

		content.appendChild(attr(elem('div'), { class: 'd-box' }));

		// get the attribute from this d-input to be copied to the input child
		const [readonly, disabled, placeholder] = attr(this, ['readonly', 'disabled', 'placeholder']);
		attr(this.inputEl, { readonly, disabled, placeholder });

		const value = this.getInitialValue();
		this.value = value;

		append(this, content, 'empty');

		//// Set the states
		this.noValue = (!value);

		//// Bind internal component events
		on(this, 'focusin, focusout, change', '.d-ipt', (evt) => {
			const m_input = this;

			switch (evt.type) {
				case 'focusin':
					m_input.focused = true;
					break;
				case 'focusout':
					m_input.focused = false;
					break;
				case 'change':
					// here we forward the value from the input to this component state value to make srue all get changed.
					this.value = this.inputEl.value;
					break;
			}
		});

		// TODO: minor bug when user re-click on label when input is empty, it toggle focus off. 
		on(this, 'click', 'label', (evt) => {
			this.inputEl.focus();
		});
	}

	attributeChangedCallback(name: string, oldVal: any, newVal: any) {
		super.attributeChangedCallback(name, oldVal, newVal); // always

		if (this.initialized) {
			switch (name) {
				case 'readonly':
					attr(this.inputEl, { readonly: newVal });
					break;
				case 'disabled':
					attr(this.inputEl, { disabled: newVal });
					break;
				case 'placeholder':
					attr(this.inputEl, { placeholder: newVal });
					break;
			}
		}

	}
	//#endregion ---------- /Lifecycle ---------- 

	//#region    ---------- HTML Element Overrides ---------- 
	focus() {
		this.inputEl?.focus();
	}
	//#endregion ---------- /HTML Element Overrides ----------

	abstract createIptEl(): HTMLInputElement | HTMLTextAreaElement
	abstract getInitialValue(): string | null
}


