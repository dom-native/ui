import { Symbols } from './symbols';


const SVG_SYMBOLS = `
<svg xmlns="http://www.w3.org/2000/svg" style="width:0; height:0; visibility:hidden; display:none">
<symbol id="d-ico-check" viewBox="0 0 24 24"><g id="ico/" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="d-ico/check" fill-rule="nonzero"> <polygon id="Path" points="8.2255884 16.7829562 3.58145537 12.1388232 2 13.7091416 8.2255884 19.93473 21.59 6.57031836 20.0196816 5"/> </g> </g></symbol>
<symbol id="d-ico-chevron-down" viewBox="0 0 16 16"><g id="ico/" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="d-ico/chevron-down" fill-rule="nonzero"> <polygon id="Shape" points="3.41 5 8 9.59 12.59 5 14 6.42 8 12.42 2 6.42"/> </g> </g></symbol>
<symbol id="d-ico-chevron-right" viewBox="0 0 16 16"><g id="ico/" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="d-ico/chevron-right"> <polygon id="Shape" transform="translate(8.500000, 8.000000) rotate(-90.000000) translate(-8.500000, -8.000000) " points="3.91 4.5 8.5 8.83018868 13.09 4.5 14.5 5.83962264 8.5 11.5 2.5 5.83962264"/> </g> </g></symbol>
<symbol id="d-ico-fav" viewBox="0 0 24 24"><g id="ico/" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="d-ico/fav" fill-rule="nonzero"> <path d="M12,21.35 L10.55,20.03 C5.4,15.36 2,12.28 2,8.5 C2,5.42 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.09 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.42 22,8.5 C22,12.28 18.6,15.36 13.45,20.04 L12,21.35 Z" id="Path"/> </g> </g></symbol>
<symbol id="d-ico-radio-off" viewBox="0 0 24 24"><g id="ico/" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="d-ico/radio-off" fill-rule="nonzero"> <path d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z" id="Oval"/> </g> </g></symbol>
<symbol id="d-ico-radio-on" viewBox="0 0 24 24"><g id="ico/" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="d-ico/radio-on" fill-rule="nonzero"> <path d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M12,7 C14.7614237,7 17,9.23857625 17,12 C17,14.7614237 14.7614237,17 12,17 C9.23857625,17 7,14.7614237 7,12 C7,9.23857625 9.23857625,7 12,7 Z" id="Oval"/> </g> </g></symbol>
<symbol id="d-ico-star" viewBox="0 0 24 24"><g id="ico/" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="d-ico/star" fill-rule="nonzero"> <path d="M14.81,8.62 L12.92,4.17 C12.58,3.36 11.42,3.36 11.08,4.17 L9.19,8.63 L4.36,9.04 C3.48,9.11 3.12,10.21 3.79,10.79 L7.46,13.97 L6.36,18.69 C6.16,19.55 7.09,20.23 7.85,19.77 L12,17.27 L16.15,19.78 C16.91,20.24 17.84,19.56 17.64,18.7 L16.54,13.97 L20.21,10.79 C20.88,10.21 20.53,9.11 19.65,9.04 L14.81,8.62 Z" id="Shape"/> </g> </g></symbol>
<symbol id="d-ico-triangle-down" viewBox="0 0 16 16"><g id="ico/" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="d-ico/triangle-down" fill-rule="nonzero"> <polygon id="Shape" points="14 6 8 12 2 6"/> </g> </g></symbol>
<symbol id="d-ico-visible" viewBox="0 0 24 24"><g id="ico/" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="d-ico/visible" fill-rule="nonzero"> <path d="M12,4.5 C7,4.5 2.73,7.61 1,12 C2.73,16.39 7,19.5 12,19.5 C17,19.5 21.27,16.39 23,12 C21.27,7.61 17,4.5 12,4.5 Z M12,17 C9.24,17 7,14.76 7,12 C7,9.24 9.24,7 12,7 C14.76,7 17,9.24 17,12 C17,14.76 14.76,17 12,17 Z M12,9 C10.34,9 9,10.34 9,12 C9,13.66 10.34,15 12,15 C13.66,15 15,13.66 15,12 C15,10.34 13.66,9 12,9 Z" id="Shape"/> </g> </g></symbol>
</svg>
`

export const symbols = new Symbols(SVG_SYMBOLS);