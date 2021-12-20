/* TypeScript file generated from EventType.res by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:interface-over-type-literal
export type pointEventName = 
    "PointTap"
  | "PointDown"
  | "PointUp"
  | "PointMove"
  | "PointScale"
  | "PointDragStart"
  | "PointDragOver"
  | "PointDragDrop";

// tslint:disable-next-line:interface-over-type-literal
export type domEventName = 
    "Contextmenu"
  | "Click"
  | "MouseDown"
  | "MouseUp"
  | "MouseMove"
  | "MouseWheel"
  | "MouseDragStart"
  | "MouseDragOver"
  | "MouseDragDrop"
  | "KeyUp"
  | "KeyDown"
  | "KeyPress"
  | "TouchTap"
  | "TouchEnd"
  | "TouchMove"
  | "TouchStart"
  | "TouchDragStart"
  | "TouchDragOver"
  | "TouchDragDrop";

// tslint:disable-next-line:interface-over-type-literal
export type mouseButton = "NoButton" | "Left" | "Right" | "Center";

// tslint:disable-next-line:interface-over-type-literal
export type pointData<a> = [a, a];

// tslint:disable-next-line:interface-over-type-literal
export type phaseType = "Broadcast" | "Emit";

// tslint:disable-next-line:interface-over-type-literal
export type mouseDomEvent = {
  readonly which: number; 
  readonly detail: (null | undefined | number); 
  readonly movementX: (null | undefined | number); 
  readonly movementY: (null | undefined | number); 
  readonly mozMovementX: (null | undefined | number); 
  readonly mozMovementY: (null | undefined | number); 
  readonly webkitMovementX: (null | undefined | number); 
  readonly webkitMovementY: (null | undefined | number); 
  readonly wheelDelta: (null | undefined | number); 
  readonly pageX: number; 
  readonly pageY: number; 
  readonly preventDefault: () => void
};

// tslint:disable-next-line:interface-over-type-literal
export type keyboardDomEvent = {
  readonly keyCode: number; 
  readonly ctrlKey: boolean; 
  readonly altKey: boolean; 
  readonly shiftKey: boolean; 
  readonly metaKey: boolean; 
  readonly preventDefault: () => void
};

// tslint:disable-next-line:interface-over-type-literal
export type touchDataJsObj = {
  readonly clientX: number; 
  readonly clientY: number; 
  readonly pageX: number; 
  readonly pageY: number; 
  readonly identifier: number; 
  readonly screenX: number; 
  readonly screenY: number; 
  readonly radiusX: number; 
  readonly radiusY: number; 
  readonly rotationAngle: number; 
  readonly force: number
};

// tslint:disable-next-line:interface-over-type-literal
export type touchDomEvent = {
  readonly touches: touchDataJsObj[]; 
  readonly changedTouches: touchDataJsObj[]; 
  readonly targetTouches: touchDataJsObj[]; 
  readonly preventDefault: () => void
};

// tslint:disable-next-line:interface-over-type-literal
export type mouseEvent = {
  readonly name: domEventName; 
  readonly location: pointData<number>; 
  readonly locationInView: pointData<number>; 
  readonly button: mouseButton; 
  readonly wheel: number; 
  readonly movementDelta: pointData<number>; 
  readonly event: mouseDomEvent
};

// tslint:disable-next-line:interface-over-type-literal
export type keyboardEvent = {
  readonly name: domEventName; 
  readonly keyCode: number; 
  readonly ctrlKey: boolean; 
  readonly altKey: boolean; 
  readonly shiftKey: boolean; 
  readonly metaKey: boolean; 
  readonly key: string; 
  readonly event: keyboardDomEvent
};

// tslint:disable-next-line:interface-over-type-literal
export type touchData = {
  readonly clientX: number; 
  readonly clientY: number; 
  readonly pageX: number; 
  readonly pageY: number; 
  readonly identifier: number; 
  readonly screenX: number; 
  readonly screenY: number; 
  readonly radiusX: number; 
  readonly radiusY: number; 
  readonly rotationAngle: number; 
  readonly force: number
};

// tslint:disable-next-line:interface-over-type-literal
export type touchEvent = {
  readonly name: domEventName; 
  readonly location: pointData<number>; 
  readonly locationInView: pointData<number>; 
  readonly touchData: touchData; 
  readonly movementDelta: pointData<number>; 
  readonly event: touchDomEvent
};

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class userData { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type customEvent = {
  readonly name: string; 
  readonly isStopPropagation: boolean; 
  readonly phase?: phaseType; 
  readonly userData?: userData
};

// tslint:disable-next-line:interface-over-type-literal
export type pointDomEvent = { readonly preventDefault: () => void; readonly stopPropagation: () => void };

// tslint:disable-next-line:interface-over-type-literal
export type pointEvent = {
  readonly name: pointEventName; 
  readonly location: pointData<number>; 
  readonly locationInView: pointData<number>; 
  readonly button?: mouseButton; 
  readonly wheel?: number; 
  readonly movementDelta: pointData<number>; 
  readonly event: pointDomEvent
};
