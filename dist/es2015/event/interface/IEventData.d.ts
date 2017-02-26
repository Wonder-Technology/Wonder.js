export interface IEventData {
    returnValue: boolean;
    preventDefault: () => void;
}
export interface IKeyboardEventData extends IEventData {
    ctrlKey: number;
    altKey: number;
    shiftKey: number;
    metaKey: number;
    keyCode: number;
}
export interface IMouseEventData extends IEventData {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    button: number;
    detail?: number;
    wheelDelta?: number;
    movementX?: number;
    webkitMovementX?: number;
    mozMovementX?: number;
    movementY?: number;
    webkitMovementY?: number;
    mozMovementY?: number;
    target: HTMLElement;
    currentTarget: HTMLElement;
}
export interface ITouchEventData extends IEventData {
    touches: Array<ITouchData>;
    changedTouches: Array<ITouchData>;
    targetTouches: Array<ITouchData>;
    target: HTMLElement;
    currentTarget: HTMLElement | null;
}
export interface ITouchData {
    clientX: number;
    clientY: number;
    identifier: number;
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
    radiusX: number;
    radiusY: number;
    rotationAngle: number;
    force: number;
    target: HTMLElement;
}
export interface IPointEventData extends IEventData {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    button?: number;
    detail?: number;
    wheelDelta?: number;
    movementX?: number;
    webkitMovementX?: number;
    mozMovementX?: number;
    movementY?: number;
    webkitMovementY?: number;
    mozMovementY?: number;
    target: HTMLElement;
    currentTarget: HTMLElement | null;
}
