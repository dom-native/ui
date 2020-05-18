import { customElement } from 'dom-native';
import { CodeDoc, SpecView } from 'spec-views';


@customElement('spec-d-options')
export class SpecDOptionsView extends SpecView {
	name = 'spec-d-options'
	doc = SPEC_DOC
}


const OPTIONS_DEFAULT = `
  <option>None</option>
  <option value="one">value one</option>
  <option value="G">value G</option>
`;

const SPEC_DOC: CodeDoc = {
	title: 'Spec for d-options',
	groups: [
		{
			items: [
				{
					title: 'd-options standard',
					code: `<d-options name="state"\n  options="1:Open, 0:Close, 2: Both" value="0">\n</d-options>`
				}
			]
		}
	]
}