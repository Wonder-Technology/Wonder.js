open POType

let setLastXY = (lastX, lastY) =>
  ContainerManager.getPO()
  ->HandleMouseEventDoService.setLastXY(lastX, lastY)
  ->ContainerManager.setPO

let getIsDrag = () => ContainerManager.getPO()->HandleMouseEventDoService.getIsDrag

let setIsDrag = isDrag =>
  ContainerManager.getPO()->HandleMouseEventDoService.setIsDrag(isDrag)->ContainerManager.setPO

let buildMouseEvent = (
  ~pageX=10,
  ~pageY=20,
  ~which=0,
  ~movementX=1,
  ~movementY=2,
  ~detail=Js.Nullable.undefined,
  ~wheelDelta=Js.Nullable.undefined,
  ~preventDefaultFunc=() => (),
  ~stopPropagationFunc=() => (),
  (),
) =>
  {
    "pageX": pageX,
    "pageY": pageY,
    "which": which,
    "movementX": movementX,
    "movementY": movementY,
    "detail": detail,
    "wheelDelta": wheelDelta,
    "preventDefault": preventDefaultFunc,
    "stopPropagation": stopPropagationFunc,
  }

let setPointerLocked = %raw(`
function(){
 document.pointerLockElement = {};
 }
  `)

let setNotPointerLocked = %raw(`
function(){
 document.pointerLockElement = undefined;
 }
  `)

let prepareWithPO = (
  ~sandbox,
  ~po,
  ~offsetLeft=1,
  ~offsetTop=2,
  ~offsetParent=Js.Nullable.undefined,
  ~setBrowserFunc=BrowserDetectTool.setChrome,
  (),
) => {
  let canvasDom = EventTool.buildFakeCanvas((offsetLeft, offsetTop, offsetParent))

  po
  ->BodyDoService.setBody(BodyTool.getBody())
  ->CanvasDoService.setCanvas(canvasDom->Obj.magic)
  ->setBrowserFunc
  ->InitEventDoService.initEvent
}

let prepare = (
  ~sandbox,
  ~offsetLeft=1,
  ~offsetTop=2,
  ~offsetParent=Js.Nullable.undefined,
  ~setBrowserFunc=BrowserDetectTool.setChrome,
  (),
) =>
  prepareWithPO(
    ~sandbox,
    ~offsetLeft,
    ~offsetTop,
    ~offsetParent,
    ~setBrowserFunc,
    ~po=ContainerManager.getPO(),
    (),
  )->ContainerManager.setPO

let prepareForPointerLock = (sandbox, po) => {
  open Sinon

  let canvas = CanvasDoService.getCanvas(po)->WonderCommonlib.OptionSt.unsafeGet->Obj.magic
  let requestPointerLockStub = createEmptyStubWithJsObjSandbox(sandbox)
  canvas["requestPointerLock"] = requestPointerLockStub

  (po, requestPointerLockStub)
}
