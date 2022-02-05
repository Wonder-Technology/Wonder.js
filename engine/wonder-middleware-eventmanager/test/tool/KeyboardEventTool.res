open POType

let buildKeyboardEvent = (
  ~ctrlKey=false,
  ~altKey=false,
  ~shiftKey=false,
  ~metaKey=false,
  ~keyCode=8,
  (),
) =>
  {
    "ctrlKey": ctrlKey,
    "altKey": altKey,
    "shiftKey": shiftKey,
    "metaKey": metaKey,
    "keyCode": keyCode,
  }

let prepare = (~sandbox, ~setBrowserFunc=BrowserDetectTool.setChrome, ()) => {
  let canvasDom = EventTool.buildFakeCanvas((0, 0, Js.Nullable.null))

  ContainerManager.getPO()
  ->BodyDoService.setBody(BodyTool.getBody())
  ->CanvasDoService.setCanvas(canvasDom->Obj.magic)
  ->setBrowserFunc
  ->InitEventDoService.initEvent
  -> ContainerManager.setPO
}
