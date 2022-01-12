import { customElement } from 'dom-native';
import { htmlSvgSymbol } from './d-ico-symbol.js';
import { BaseToggleElement } from './d-toggle.js';

/**
 * d-check custom element encapsulate a checkbox true/false component with or without label concept.
 *
 * Usage: `<d-check name="fieldA" checked></d-check>`
 * See:  http://localhost:8080/_spec/controls
 * 
 * Attributes:
 *   - See BaseFieldElement.
 *   - label
 *   - `value?`: value of the component (when checked).
 *   - `checked?`: checked states of te component.
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

@customElement("d-check")
export class CheckElement extends BaseToggleElement {

	//#region    ---------- base-toggle implementations ---------- 
	handleClick(): void {
		this.checked = !this.checked;
	}

	renderIptContent(): string | undefined {
		if (!this.iptEl) {
			return htmlSvgSymbol('d-ico-check');
		} else {
			return undefined; // no need to update for checkbox if iptEl has been already initialized
		}
	}
	//#region    ---------- /base-toggle implementations ---------- 
}
