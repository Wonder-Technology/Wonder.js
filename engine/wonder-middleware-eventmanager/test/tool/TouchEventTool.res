open POType

open EventType

let setLastXY = (lastX, lastY) =>
  ContainerManager.getPO()
  ->HandleTouchEventDoService.setLastXY(lastX, lastY)
  ->ContainerManager.setPO

let getIsDrag = () => ContainerManager.getPO()->HandleTouchEventDoService.getIsDrag

let setIsDrag = isDrag =>
  ContainerManager.getPO()->HandleTouchEventDoService.setIsDrag(isDrag)->ContainerManager.setPO

let buildTouchData = (~pageX=10, ~pageY=20, ()) =>
  {
    "clientX": 0,
    "clientY": 0,
    "pageX": pageX,
    "pageY": pageY,
    "identifier": 0,
    "screenX": 0,
    "screenY": 0,
    "radiusX": 0,
    "radiusY": 0,
    "rotationAngle": 0,
    "force": 0,
  }

let buildTouchEvent = (
  ~touches=[buildTouchData()],
  ~changedTouches=[buildTouchData()],
  ~targetTouches=[buildTouchData()],
  ~preventDefaultFunc=() => (),
  ~stopPropagationFunc=() => (),
  (),
) =>
  {
    "touches": touches,
    "changedTouches": changedTouches,
    "targetTouches": targetTouches,
    "preventDefault": preventDefaultFunc,
    "stopPropagation": stopPropagationFunc,
  }

let prepareWithPO = (
  ~sandbox,
  ~po,
  ~offsetLeft=1,
  ~offsetTop=2,
  ~offsetParent=Js.Nullable.undefined,
  ~setBrowserFunc=BrowserDetectTool.setAndroid,
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
  ~setBrowserFunc=BrowserDetectTool.setAndroid,
  (),
) => {
  prepareWithPO(
    ~sandbox,
    ~offsetLeft,
    ~offsetTop,
    ~offsetParent,
    ~setBrowserFunc,
    ~po=ContainerManager.getPO(),
    (),
  )->ContainerManager.setPO
}
