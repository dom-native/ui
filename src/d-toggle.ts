import { attr, elem, on } from 'dom-native';
import { BaseFieldElement } from './d-base-field';

/**
 * Base component for toggle like components 'd-check', 'd-radio'
 *
 * Attributes:
 *   - See BaseFieldElement.
 *   - label
 *   - `value?`: value of the component (when checked).
 *   - `checked?`: checked states of te component (on / off state of the individual element)
 *   
 * Properties:
 *   - See BaseFieldElement.
 *   - `value`: If checkbox checked true or 'value' attribute if present, otherwise, if not checked false.
 *   - `checked: boolean`: reflective of Attribute.
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

export abstract class BaseToggleElement extends BaseFieldElement {

	static get observedAttributes() { return BaseFieldElement.observedAttributes.concat(['checked']) }

	//// private elements
	protected labelEl?: HTMLElement;
	protected iptEl?: HTMLElement;

	//// Properties (Attribute Reflective)
	get checked() { return this.hasAttribute('checked') }
	set checked(v: boolean) { attr(this, { checked: v }) }

	//// Property (Value)
	get value() {
		const attrValue = attr(this, 'value');
		const checked = this.checked;
		// if we have a attribute value return it 
		if (attrValue) {
			return (checked) ? attrValue : false; // could have return undefined rather than false, but decide to always return a value.
		}
		else {
			return checked;
		}
	}
	set value(v: any) {
		// if it is a boolean, then, just pass the value
		if (typeof v === 'boolean') {
			this.checked = v;
		}
		// otherwise, we assume we have attr
		else {
			const attrValue = attr(this, 'value');
			if (attrValue) {
				this.checked = (attrValue === v);
			}
			// Should not be in this state, we log for the component user to fix issue.
			else {
				console.log(`Warning - d-check - Tries to set a non boolean value '${v}' to checkElement.value which do not have a attribute value to match with. Skipping. `);
			}
		}
	}


	//#region    ---------- Lifecycle ---------- 
	// Component initialization (will be called once by BaseHTMLElement on first connectedCallback)
	init() {
		super.init(); // just call it for BaseFieldElement sub classes.

		//// NOTE: Here we create the inner elements and assign it to component properties while avoiding any dom query for performance reason. 
		////       We use the documentFragment to concatinate the needed element before adding them to this component. 
		//// NOTE: This is way of building inner content is consistent with a component shadow DOM approach.
		const content = document.createDocumentFragment();

		// create the label element if defined
		const label = attr(this, 'label');
		if (label != null) { // empty string will create an empty label
			this.labelEl = elem('label');
			this.labelEl.textContent = label;
			content.appendChild(this.labelEl);
		}

		// create the .d-ipt element
		// Note: here we render the iptContent before setting the this.d-iptEl allowing the renderIptContent to know if it is initial or post rendering
		const iptContent = this.renderIptContent()!;
		this.iptEl = attr(elem('div'), { class: 'd-ipt' });
		this.iptEl.innerHTML = iptContent;
		content.append(this.iptEl);

		// append the elements needed
		this.appendChild(content);

		//// Bind internal component events
		on(this, 'click', (evt) => {
			// handle click only if not disabled or not readonly
			// NOTE: JS logic can still change .checked property
			if (!this.disabled && !this.readonly) {
				this.handleClick();
			}
		});
	}

	/** Return the innerHTML content for the .d-iptEl. If undefined, .d-iptEl innerHTML won't be updated (allows uncessary updates) */
	abstract renderIptContent(): string | undefined;

	abstract handleClick(): void;

	attributeChangedCallback(name: string, oldVal: any, newVal: any) {
		super.attributeChangedCallback(name, oldVal, newVal); // always

		if (this.initialized) {
			switch (name) {
				case 'checked':
					if (oldVal !== newVal) {
						const iptContent = this.renderIptContent();
						// If the renderer does not render something, means no need to update
						if (iptContent) {
							this.iptEl!.innerHTML = iptContent;
						}
						this.triggerChange();
					}
					break;
			}
		}

	}
	//#endregion ---------- /Lifecycle ---------- 

}

