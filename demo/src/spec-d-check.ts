import { customElement } from 'dom-native';
import { CodeDoc, simplePull, SpecView } from 'spec-views';


@customElement('spec-d-check')
export class SpecMCheckView extends SpecView {
	name = 'spec-d-check'
	doc = SPEC_DOC
}

const SPEC_DOC: CodeDoc = {
	title: 'Spec for d-check',
	groups: [
		{
			items: [
				{
					title: 'd-check checked',
					code: `<d-check name="nameA" label="Label" checked></d-check>`,
					fn: simplePull
				},
				{
					title: 'd-check with value',
					code: `<d-check name="mood" label="Label" \n\tvalue="happy" checked>\n</d-check>`,
					fn: simplePull
				},
				{
					title: 'd-check multiple',
					code: `<d-check name="nameA" label="Label A" checked></d-check>\n<d-check name="nameB" value="value-b" label="Label B"></d-check>\n<d-check name="nameC" value="value-c" label="Label C" checked></d-check>`,
					fn: simplePull
				},
				{
					title: 'd-check no label',
					code: `<d-check checked></d-check>`
				}
			]
		},
		{
			items: [
				{
					title: 'd-check disabled checked',
					code: `<d-check label="Label" checked disabled></d-check>`
				},
				{
					title: 'd-check readonly checked',
					code: `<d-check label="Label" checked readonly></d-check>`
				}
			]
		}
	]
}