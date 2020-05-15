import { customElement } from 'dom-native';
import { CodeDoc, SpecView } from 'spec-views';


@customElement('spec-d-ico-symbol')
export class SpecMIcoMSymbolView extends SpecView {
	name = 'spec-d-ico-symbol'
	doc = spec_input_doc
}


const spec_input_doc: CodeDoc = {
	title: 'Spec for d-ico and d-symbol',
	groups: [
		{
			items: [
				{
					title: 'd-ico',
					code: '<d-ico name="d-ico-star"></d-ico>'
				},
				{
					title: 'd-symbol',
					code: '<d-symbol name="d-ico-star"\n  style="max-width:5rem;max-height:5rem;fill:blue">\n</d-symbol>'
				}
			]
		}
	]
}