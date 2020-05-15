import { customElement, first } from 'dom-native';
import { CodeDoc, SpecView } from 'spec-views';


@customElement('spec-d-text')
export class SpecMTextView extends SpecView {
	name = 'spec-d-text'
	doc = spec_input_doc

	postDisplay() {
		// get the first input and set focus
		const firstMInput = first(this, 'd-text');
		firstMInput?.focus();
	}
}


const spec_input_doc: CodeDoc = {
	title: 'Spec for d-text',
	groups: [
		{
			items: [
				{
					title: 'd-text standard (label, value)',
					code: '<d-text label="Label">Value...</d-text>',
					css: 'tall'
				},
				{
					title: 'd-text empty (no placeholder)',
					code: '<d-text label="Label"></d-text>'
				},
				{
					title: 'd-text Leading Icon',
					code: '<d-text ico-lead="d-ico-star" label="Label" value="Value">\n</d-text>'
				},
				{
					title: 'd-text Empty Leading Icon',
					code: '<d-text ico-lead="d-ico-star" label="Label"></d-text>'
				},
				{
					title: 'd-text Trailing Icon',
					code: '<d-text ico-trail="d-ico-visible" label="Label" value="Value"></d-text>'
				},
				{
					title: 'd-text placeholder',
					code: '<d-text label="Label" placeholder="Placeholder"></d-text>'
				},
				{
					title: 'd-text disabled',
					code: '<d-text label="Label" value="Value" disabled></d-text>	'
				},
				{
					title: 'd-text empty and disabled',
					code: '<d-text label="Label" disabled></d-text>'
				}
			]
		},
		{
			items: [
				{
					title: 'd-text no label',
					code: '<d-text value="value"></d-text>'
				},
				{
					title: 'd-text placeholder no label',
					code: '<d-text placeholder="Placeholder"></d-text>'
				}
			]
		}
	]
}