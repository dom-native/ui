import Handlebars from 'handlebars/runtime';

// make sure the Handlebar.templates exists (will be used by templates.js as template store)
(<any>window).Handlebars = Handlebars;

(<any>window).Handlebars.templates = Handlebars.template || {};


export function render(templateName: string, data?: any) {
	var tmpl = (<any>window).Handlebars.templates[templateName];

	// if not found, throw an error
	if (!tmpl) {
		throw "Not template found in pre-compiled and in DOM for " + templateName;
	}

	return tmpl(data);
}