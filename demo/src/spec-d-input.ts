import { customElement, first } from 'dom-native';
import { CodeDoc, SpecView } from 'spec-views';


@customElement('spec-d-input')
export class SpecMInputView extends SpecView {
	name = 'spec-d-input'
	doc = spec_input_doc

	postDisplay() {
		// get the first input and set focus
		const firstMInput = first(this, 'd-input');
		firstMInput?.focus();
	}
}


const spec_input_doc: CodeDoc = {
	title: 'Spec for d-input',
	groups: [
		{
			items: [
				{
					title: 'd-input standard (label, value)',
					code: '<d-input label="Label" value="Value"></d-input>'
				},
				{
					title: 'd-input empty (no placeholder)',
					code: '<d-input label="Label"></d-input>'
				},
				{
					title: 'd-input Leading Icon and Trailing Label',
					code: '<d-input ico-lead="d-ico-star" label-trail="Trail Label" label="Label" value="Value">\n</d-input>'
				},
				{
					title: 'd-input Empty Leading Icon',
					code: '<d-input ico-lead="d-ico-star" label="Label"></d-input>'
				},
				{
					title: 'd-input Trailing Icon',
					code: '<d-input ico-trail="d-ico-visible" label="Label" value="Value"></d-input>'
				},
				{
					title: 'd-input placeholder',
					code: '<d-input label="Label" placeholder="Placeholder"></d-input>'
				},
				{
					title: 'd-input disabled',
					code: '<d-input label="Label" value="Value" disabled></d-input>	'
				},
				{
					title: 'd-input empty and disabled',
					code: '<d-input label="Label" disabled></d-input>'
				}
			]
		},
		{
			items: [
				{
					title: 'd-input no label',
					code: '<d-input value="value"></d-input>'
				},
				{
					title: 'd-input placeholder no label',
					code: '<d-input placeholder="Placeholder"></d-input>'
				},
				{
					title: 'd-input trail text',
					code: '<d-input label="label" text-trail="CM"></d-input>'
				}
			]
		}
	]
}