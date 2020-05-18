import { all, append, BaseHTMLElement, customElement, elem, first, onWin } from 'dom-native';

// 'd-options' (not officially supported)
const components = ['d-input', 'd-check', 'd-radio', 'd-options', 'd-select', 'd-text', 'd-ico-symbol'];

@customElement('spec-main-view')
class SpecMainView extends BaseHTMLElement {

	init() {
		this.innerHTML = _render();
		this.refresh();
	}

	@onWin('hashchange')
	onHashChange() {
		this.refresh();
	}

	refresh() {
		let name = window.location.hash;
		if (!name) {
			window.location.hash = `#spec-${components[0]}`;
			return;
		}
		all(this, 'nav a.sel').forEach(a => a.classList.remove('sel'));

		if (name) {
			name = name.substring(1); // remove the first #

			// update content
			document.title = `Test - ${name}`;
			const mainEl = first(this, 'main')!;
			mainEl.innerHTML = '';
			const el = append(mainEl, elem(name));
			el.classList.add('spec-view');

			// update nav
			const select = `nav a[href="#${name}"]`;
			const aEl = first(this, select);
			if (aEl) {
				aEl.classList.add('sel');
			} else {
				console.log(`WARNING - cannot find nav a for '${select}'`);
			}
		}

	}
}




function _render() {
	return `
	<nav>
	${components.map((name) => `<a href="#spec-${name}">${name}</a>`).join('\n')}
	</nav>
	<main>
	</main>
	`
}