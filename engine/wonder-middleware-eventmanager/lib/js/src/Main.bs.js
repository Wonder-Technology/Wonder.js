'use strict';

var BodyAPI$WonderMiddlewareEventmanager = require("./api/BodyAPI.bs.js");
var CreatePO$WonderMiddlewareEventmanager = require("./data/CreatePO.bs.js");
var CanvasAPI$WonderMiddlewareEventmanager = require("./api/CanvasAPI.bs.js");
var BrowserAPI$WonderMiddlewareEventmanager = require("./api/BrowserAPI.bs.js");
var InitEventAPI$WonderMiddlewareEventmanager = require("./api/InitEventAPI.bs.js");
var ManageEventAPI$WonderMiddlewareEventmanager = require("./api/ManageEventAPI.bs.js");
var ContainerManager$WonderMiddlewareEventmanager = require("./data/ContainerManager.bs.js");
var NameEventDoService$WonderMiddlewareEventmanager = require("./service/event/NameEventDoService.bs.js");

function preparePO(param) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(CreatePO$WonderMiddlewareEventmanager.create(undefined));
}

function getBrowserChromeType(param) {
  return /* Chrome */0;
}

function getBrowserFirefoxType(param) {
  return /* Firefox */1;
}

function getBrowserAndroidType(param) {
  return /* Android */2;
}

function getBrowserIOSType(param) {
  return /* IOS */3;
}

function getBrowserUnknownType(param) {
  return /* Unknown */4;
}

var onMouseEvent = ManageEventAPI$WonderMiddlewareEventmanager.onMouseEvent;

var onKeyboardEvent = ManageEventAPI$WonderMiddlewareEventmanager.onKeyboardEvent;

var onTouchEvent = ManageEventAPI$WonderMiddlewareEventmanager.onTouchEvent;

var offMouseEventByHandleFunc = ManageEventAPI$WonderMiddlewareEventmanager.offMouseEventByHandleFunc;

var offKeyboardEventByHandleFunc = ManageEventAPI$WonderMiddlewareEventmanager.offKeyboardEventByHandleFunc;

var offTouchEventByHandleFunc = ManageEventAPI$WonderMiddlewareEventmanager.offTouchEventByHandleFunc;

var onCustomGlobalEvent = ManageEventAPI$WonderMiddlewareEventmanager.onCustomGlobalEvent;

var offCustomGlobalEventByEventName = ManageEventAPI$WonderMiddlewareEventmanager.offCustomGlobalEventByEventName;

var offCustomGlobalEventByHandleFunc = ManageEventAPI$WonderMiddlewareEventmanager.offCustomGlobalEventByHandleFunc;

var stopPropagationCustomEvent = ManageEventAPI$WonderMiddlewareEventmanager.stopPropagationCustomEvent;

var triggerCustomGlobalEvent = ManageEventAPI$WonderMiddlewareEventmanager.triggerCustomGlobalEvent;

var createCustomEvent = ManageEventAPI$WonderMiddlewareEventmanager.createCustomEvent;

var getPointDownEventName = NameEventDoService$WonderMiddlewareEventmanager.getPointDownEventName;

var getPointUpEventName = NameEventDoService$WonderMiddlewareEventmanager.getPointUpEventName;

var getPointTapEventName = NameEventDoService$WonderMiddlewareEventmanager.getPointTapEventName;

var getPointMoveEventName = NameEventDoService$WonderMiddlewareEventmanager.getPointMoveEventName;

var getPointScaleEventName = NameEventDoService$WonderMiddlewareEventmanager.getPointScaleEventName;

var getPointDragStartEventName = NameEventDoService$WonderMiddlewareEventmanager.getPointDragStartEventName;

var getPointDragOverEventName = NameEventDoService$WonderMiddlewareEventmanager.getPointDragOverEventName;

var getPointDragDropEventName = NameEventDoService$WonderMiddlewareEventmanager.getPointDragDropEventName;

var initEvent = InitEventAPI$WonderMiddlewareEventmanager.initEvent;

var setCanvas = CanvasAPI$WonderMiddlewareEventmanager.setCanvas;

var getBody = BodyAPI$WonderMiddlewareEventmanager.getBodyExn;

var setBody = BodyAPI$WonderMiddlewareEventmanager.setBody;

var setBrowser = BrowserAPI$WonderMiddlewareEventmanager.setBrowser;

exports.preparePO = preparePO;
exports.onMouseEvent = onMouseEvent;
exports.onKeyboardEvent = onKeyboardEvent;
exports.onTouchEvent = onTouchEvent;
exports.offMouseEventByHandleFunc = offMouseEventByHandleFunc;
exports.offKeyboardEventByHandleFunc = offKeyboardEventByHandleFunc;
exports.offTouchEventByHandleFunc = offTouchEventByHandleFunc;
exports.onCustomGlobalEvent = onCustomGlobalEvent;
exports.offCustomGlobalEventByEventName = offCustomGlobalEventByEventName;
exports.offCustomGlobalEventByHandleFunc = offCustomGlobalEventByHandleFunc;
exports.stopPropagationCustomEvent = stopPropagationCustomEvent;
exports.triggerCustomGlobalEvent = triggerCustomGlobalEvent;
exports.createCustomEvent = createCustomEvent;
exports.getPointDownEventName = getPointDownEventName;
exports.getPointUpEventName = getPointUpEventName;
exports.getPointTapEventName = getPointTapEventName;
exports.getPointMoveEventName = getPointMoveEventName;
exports.getPointScaleEventName = getPointScaleEventName;
exports.getPointDragStartEventName = getPointDragStartEventName;
exports.getPointDragOverEventName = getPointDragOverEventName;
exports.getPointDragDropEventName = getPointDragDropEventName;
exports.initEvent = initEvent;
exports.setCanvas = setCanvas;
exports.getBody = getBody;
exports.setBody = setBody;
exports.setBrowser = setBrowser;
exports.getBrowserChromeType = getBrowserChromeType;
exports.getBrowserFirefoxType = getBrowserFirefoxType;
exports.getBrowserAndroidType = getBrowserAndroidType;
exports.getBrowserIOSType = getBrowserIOSType;
exports.getBrowserUnknownType = getBrowserUnknownType;
/* BodyAPI-WonderMiddlewareEventmanager Not a pure module */
