type pointerLockElement = {. "requestPointerLock": (. unit) => unit};

type pointerLockDocument = {
  .
  "pointerLockElement": pointerLockElement,
  "exitPointerLock": (. unit) => unit,
};

external canvasToPointerLockElement :
  WonderWebgl.DomExtendType.htmlElement => pointerLockElement =
  "%identity";

external documentToPointerLockDocument :
  WonderWebgl.DomExtendType.document => pointerLockDocument =
  "%identity";