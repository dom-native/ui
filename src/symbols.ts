import { frag } from 'dom-native';


export class Symbols {
	doc: string

	constructor(doc: string) {
		this.doc = doc;
	}

	load() {
		document.addEventListener("DOMContentLoaded", async (event) => {
			document.head.append(frag(this.doc));
		});
	}
}