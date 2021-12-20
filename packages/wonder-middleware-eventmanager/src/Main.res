let preparePO = () => {
  ContainerManager.setPO(CreatePO.create())
}

let onMouseEvent = ManageEventAPI.onMouseEvent

let onKeyboardEvent = ManageEventAPI.onKeyboardEvent

let onTouchEvent = ManageEventAPI.onTouchEvent

let offMouseEventByHandleFunc = ManageEventAPI.offMouseEventByHandleFunc

let offKeyboardEventByHandleFunc = ManageEventAPI.offKeyboardEventByHandleFunc

let offTouchEventByHandleFunc = ManageEventAPI.offTouchEventByHandleFunc

let onCustomGlobalEvent = ManageEventAPI.onCustomGlobalEvent

let offCustomGlobalEventByEventName = ManageEventAPI.offCustomGlobalEventByEventName

let offCustomGlobalEventByHandleFunc = ManageEventAPI.offCustomGlobalEventByHandleFunc

let stopPropagationCustomEvent = ManageEventAPI.stopPropagationCustomEvent

let triggerCustomGlobalEvent = ManageEventAPI.triggerCustomGlobalEvent

let createCustomEvent = ManageEventAPI.createCustomEvent

let getPointDownEventName = NameEventDoService.getPointDownEventName

let getPointUpEventName = NameEventDoService.getPointUpEventName

let getPointTapEventName = NameEventDoService.getPointTapEventName

let getPointMoveEventName = NameEventDoService.getPointMoveEventName

let getPointScaleEventName = NameEventDoService.getPointScaleEventName

let getPointDragStartEventName = NameEventDoService.getPointDragStartEventName

let getPointDragOverEventName = NameEventDoService.getPointDragOverEventName

let getPointDragDropEventName = NameEventDoService.getPointDragDropEventName

let initEvent = InitEventAPI.initEvent

let setCanvas = CanvasAPI.setCanvas

let getBody = BodyAPI.getBodyExn

let setBody = BodyAPI.setBody

let setBrowser = BrowserAPI.setBrowser

let getBrowserChromeType = () => BrowserType.Chrome

let getBrowserFirefoxType = () => BrowserType.Firefox

let getBrowserAndroidType = () => BrowserType.Android

let getBrowserIOSType = () => BrowserType.IOS

let getBrowserUnknownType = () => BrowserType.Unknown
