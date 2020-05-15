import { customElement, onEvent, OnEvent } from 'dom-native';
import { CodeDoc, SpecView } from 'spec-views';
import { wait } from 'utils';
import { SelectDataSender, SelectOption } from '../../src/index';


@customElement('spec-d-select')
export class SpecMSelectView extends SpecView {
	name = 'spec-d-select'
	doc = SPEC_DOC

	@onEvent('M-DATA', 'd-select.load-example')
	async onSelectData(evt: OnEvent<SelectDataSender>) {
		await wait(2000);
		evt.detail(OPTIONS_LOADED);
	}
}

const OPTIONS_LOADED: SelectOption[] = [{ value: 'one', content: "One" }, { value: 'two', content: "Two" }];

const OPTIONS_DEFAULT = `
  <option>None</option>
  <option value="one">value one</option>
  <option value="G">value G</option>
`;

const SPEC_DOC: CodeDoc = {
	title: 'Spec for d-select',
	groups: [
		{
			items: [
				{
					title: 'd-select standard (label, value)',
					code: `<d-select label="Label" value="one">${OPTIONS_DEFAULT}</d-select>`
				},
				{
					title: 'd-select empty (no placeholder)',
					code: `<d-select label="Label">${OPTIONS_DEFAULT}</d-select>`
				},
				{
					title: 'd-select load data',
					code: `<d-select class="load-example" label="Label" value="one">Some stuff</d-select>`
				},
				{
					title: 'd-select leading ico',
					code: `<d-select ico-lead='d-ico-star' label="Label" value="one">${OPTIONS_DEFAULT}</d-select>`
				},
				{
					title: 'd-select placeholder',
					code: `<d-select label="Label" placeholder="Placeholder">${OPTIONS_DEFAULT}</d-select>`
				}
			]
		},
		{
			items: [
				{
					title: 'd-select disabled',
					code: `<d-select label="Label" value="Value" disabled>${OPTIONS_DEFAULT}</d-select>	`
				},
				{
					title: 'd-select empty and disabled',
					code: `<d-select label="Label" disabled>${OPTIONS_DEFAULT}</d-select>`
				},
				{
					title: 'd-select no label',
					code: `<d-select value="value">${OPTIONS_DEFAULT}</d-select>`
				},
				{
					title: 'd-select placeholder no label',
					code: `<d-select placeholder="Placeholder">${OPTIONS_DEFAULT}</d-select>`
				}
			]
		}
	]
}