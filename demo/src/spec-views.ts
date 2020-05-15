import { all, append, BaseHTMLElement, pull } from 'dom-native';

export interface CodeDoc {
	title: string,
	groups: {
		items: {
			title: string,
			code: string,
			ts?: string, // optional typescript code
			fn?: (itemEl: HTMLElement) => string,
			css?: string // optional item css classes
		}[]
	}[]
}

export abstract class SpecView extends BaseHTMLElement {
	abstract name: string
	abstract doc: CodeDoc

	init() {
		this.innerHTML = _render(this.doc);
		all(this, 'code.typescript').forEach(el => (<any>window).hljs.highlightBlock(el));
		all(this, 'code.javascript').forEach(el => (<any>window).hljs.highlightBlock(el));
		all(this, 'code.json').forEach(el => (<any>window).hljs.highlightBlock(el));
	}
}

let itemSeq = 0;

function _render(doc: CodeDoc) {
	const groupHTMLs: string[] = [];
	for (const group of doc.groups) {
		const html = group.items.map(item => {
			itemSeq++;
			const itemId = `result_${itemSeq}`;

			//// Render custom item function and result
			let fnBody: string | null = null;
			if (item.fn) {
				const fnString = item.fn.toString();
				fnBody = fnString.slice(fnString.indexOf("{") + 1, fnString.lastIndexOf("}")).trim();
				requestAnimationFrame(() => {
					const itemEl = document.getElementById(itemId)!;
					if (itemEl) {
						const result = item.fn!(itemEl);
						if (result) {
							const resultStr = JSON.stringify(result, null, 2);
							append(itemEl, `<pre><code class="json">${resultStr}</code></pre>`)
						}
					}
				});
			}

			return `
			<div id="${itemId}" class="item ${item.css || ''}">
				<h3>${item.title}</h3>
				<div class="result">${item.code}</div>
				<pre><code>${escapeHtml(item.code)}</code></pre>
				${item.ts ? `<pre><code class="typescript">${item.ts}</code></pre>` : ''}
				${fnBody ? `<pre><code class="javascript">${fnBody}</code></pre>` : ''}
			</div>`;
		}).join('\n');
		groupHTMLs.push(html);
	}

	return `
	<h1>${doc.title}</h1>
	<section>
	${groupHTMLs.map(ghtml => `<div class="panel w-med">${ghtml}</div>`).join('\n')}
	</section>
	`
}


function escapeHtml(html: string) {

	// replace the start tags
	html = html.replace(/(<|<\/)(\w[\w-]*)/g, (match, start, name) => {
		start = start.replace('<', '&lt;');
		name = `<span class="tag">${name}</span>`;
		return start + name;
	});

	// replace attributes
	html = html.replace(/([\w-]+)=/g, (match, name) => {
		// hack for now to not encode the class="tag" attribute
		if (name === 'class') {
			return name + '=';
		} else {
			return `<span class="attr">${name}</span>=`;
		}
	});

	return html;
}

export function simplePull(containerEl: HTMLElement) {
	return pull(containerEl);
}