import { CodeDoc, SpecView } from '@dom-native/demo-infra';
import { customElement, first } from 'dom-native';


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
					html: '<d-text label="Label">Value...</d-text>',
					css: 'tall'
				},
				{
					title: 'd-text empty (no placeholder)',
					html: '<d-text label="Label"></d-text>'
				},
				{
					title: 'd-text Leading Icon',
					html: '<d-text ico-lead="d-ico-star" label="Label" value="Value">\n</d-text>'
				},
				{
					title: 'd-text Empty Leading Icon',
					html: '<d-text ico-lead="d-ico-star" label="Label"></d-text>'
				},
				{
					title: 'd-text Trailing Icon',
					html: '<d-text ico-trail="d-ico-visible" label="Label" value="Value"></d-text>'
				},
				{
					title: 'd-text placeholder',
					html: '<d-text label="Label" placeholder="Placeholder"></d-text>'
				},
				{
					title: 'd-text disabled',
					html: '<d-text label="Label" value="Value" disabled></d-text>	'
				},
				{
					title: 'd-text empty and disabled',
					html: '<d-text label="Label" disabled></d-text>'
				}
			]
		},
		{
			items: [
				{
					title: 'd-text no label',
					html: '<d-text value="value"></d-text>'
				},
				{
					title: 'd-text placeholder no label',
					html: '<d-text placeholder="Placeholder"></d-text>'
				}
			]
		}
	]
}