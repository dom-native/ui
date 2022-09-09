
const DEFAULT_GAP = 8;

type HLoc = 'left' | 'right';
type HAlign = 'top' | 'bottom' | 'center';

type VLoc = 'top' | 'bottom';
type VAlign = 'left' | 'right' | 'center';

// TODO: for later, will add all 
interface HPos { loc: HLoc, align: HAlign }
interface VPos { loc: VLoc, align: VAlign }

type Pos = HPos | VPos;
type To = HLoc | VLoc | Pos;

export interface PositionOptions {
  // TODO: 'top' | 'bottom' (centered)
  to: To;
  ref: HTMLElement;

  width?: boolean | number;
  height?: boolean | number;

  gap?: number;
}

export function position(el: HTMLElement, opts: PositionOptions) {
  const gap = opts.gap ?? DEFAULT_GAP;

  const posObj = getPos(opts.to);

  const top_left: { top: number, left: number } = { top: -1, left: -1 };

  const rec = el.getBoundingClientRect();
  const refRec = opts.ref.getBoundingClientRect();


  //// Horizontal Positioning
  if (posObj.type === 'h') {
    const pos = posObj.pos;

    //// calculate the left (location)
    const leftOnRight = refRec.right + gap;
    const leftOnLeft = refRec.left - gap - rec.width;
    const windowWidth = window.innerWidth;

    // if left of left is out of window, then, display to the right anything (at least can be scrolled)
    if (leftOnLeft < 0) {
      top_left.left = leftOnRight;
    } else if (leftOnRight + rec.width > windowWidth) {
      top_left.left = leftOnLeft;
    } else if (pos.loc === 'right') {
      top_left.left = leftOnRight;
    } else if (pos.loc === 'left') {
      top_left.left = leftOnLeft;
    }

    //// calculate the top (alignment)
    if (pos.align === 'top') {
      top_left.top = refRec.top;
    } else if (pos.align === 'bottom') {
      top_left.top = refRec.bottom;
    } else if (pos.align === 'center') {
      top_left.top = refRec.top + refRec.height / 2;
    }


  }

  //// Vertical Positioning
  else if (posObj.type === 'v') {
    const pos = posObj.pos;

    //// calculate the top (location)
    // TODO: When top, need to check if enough room, otherwise bottom
    if (pos.loc === 'bottom') {
      top_left.top = refRec.bottom + gap;
    } else if (pos.loc === 'top') {
      top_left.top = refRec.top - gap - rec.height;
    }

    //// calculate the left (alignement)
    if (pos.align === 'left') {
      top_left.left = refRec.left;
    } else if (pos.align === 'right') {
      top_left.left = refRec.right - rec.width;
    } else if (pos.align === 'center') {
      top_left.left = refRec.left + (refRec.width / 2) - rec.width / 2;
    }

  }

  // if the rect.height + wanted_top > window.innherHeight, we should move up to offset
  // and have a .5rem bottom margin
  if (top_left.top + rec.height + 8 > window.innerHeight && top_left.top > top_left.top + rec.height + 8 - window.innerHeight) {
    top_left.top -= (top_left.top + rec.height + 8 - window.innerHeight);
  }

  // TODO: should use .bottom or .right if position to the bottom or to the right
  el.style.top = top_left.top + 'px';
  el.style.left = top_left.left + 'px';


  if (opts.width != null && opts.width !== false) {
    const width = (opts.width === true) ? 0 : opts.width;
    el.style.width = `${refRec.width + width}px`;
  }

  if (opts.height != null && opts.height !== false) {
    const height = (opts.height === true) ? 0 : opts.height;
    el.style.height = `${refRec.height + height}px`;
  }

}


function getPos(to: To): { type: 'h', pos: HPos } | { type: 'v', pos: VPos } {
  const loc: HLoc | VLoc = (typeof to === 'string') ? to : to.loc;

  if (loc === 'left' || loc === 'right') {
    const align = (typeof to !== 'string') ? to.align as HAlign : 'top'; // by default align top
    return { type: 'h', pos: { loc, align } };
  } else if (loc === 'top' || loc === 'bottom') {
    const align = (typeof to !== 'string') ? to.align as VAlign : 'left'; // by default align top
    return { type: 'v', pos: { loc, align } };
  } else {
    throw new Error(`Can't getPos from ${to}`);
  }
}

