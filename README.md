
**@dom-native/ui** is a minimalist set of base dom-native UI component based on DOM component (customElements) with a minimal style based on google material.



## Approach

- Based on **DOM native browser web component** support (.e.g., customElements)
  - i.e., NO virtual DOM, NO parallel component model, NO polyfill, just based on HTMLElement customElement base class. 
- Use modern CSS (CSS Var, CSS Grid)
- Default Google Material Style and Component Sets
- UI and CSS Designed to be highly stylable (UI states expressed in concise css class name, css driven layout)
- Target only for modern browser: Chrome, Firefox, Safari, and Edge Chromium.

> **IMPORTANT** This component set is still under development. 0.1.x is going to be mostly releases for our own projects as API / Style might change significantly. Base component set will be stabilized in subsequent major or minor releases.

## Install

- `npm install dom-native` (install the core dom-native library, DOM Centric MVC)
- `npm install @dom-native/ui`
- Add the `./node_module/ui/dist/css/all.css` in your html or css bundle.
- Or if you use `pcss` you can do like
```css
@import './node_module/ui/pcss/all.pcss'
````
- Add the following in your main javascript file

```ts
// load all ui components (as the constructors will be called by the browser)
import '@dom-native/ui'; 

// Load default icon set as <svg><symbol></symbol></svg> doc in the html head. 
import { defaultIcons } from '@dom-native/ui';
defaultIcons.load();
```


## Current components

- `d-input`
- `d-check`
- `d-select`
- `d-ico`
- `d-symbol`

## Future components

- `d-popup`
- `d-dialog`
- `d-img`
- `d-combo`





