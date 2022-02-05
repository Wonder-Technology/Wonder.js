'use strict';

var Most = require("most");
var Curry = require("rescript/lib/js/curry.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var BodyDoService$WonderMiddlewareEventmanager = require("../dom/BodyDoService.bs.js");
var BrowserDoService$WonderMiddlewareEventmanager = require("../browser/BrowserDoService.bs.js");
var ContainerManager$WonderMiddlewareEventmanager = require("../../data/ContainerManager.bs.js");
var NameEventDoService$WonderMiddlewareEventmanager = require("../event/NameEventDoService.bs.js");
var ManageEventDoService$WonderMiddlewareEventmanager = require("../event/ManageEventDoService.bs.js");
var HandleDomEventDoService$WonderMiddlewareEventmanager = require("../event/handle/HandleDomEventDoService.bs.js");
var HandleMouseEventDoService$WonderMiddlewareEventmanager = require("../event/handle/HandleMouseEventDoService.bs.js");
var HandleTouchEventDoService$WonderMiddlewareEventmanager = require("../event/handle/HandleTouchEventDoService.bs.js");
var CreateCustomEventDoService$WonderMiddlewareEventmanager = require("../event/event/CreateCustomEventDoService.bs.js");
var HandleKeyboardEventDoService$WonderMiddlewareEventmanager = require("../event/handle/HandleKeyboardEventDoService.bs.js");
var HandlePointDomEventDoService$WonderMiddlewareEventmanager = require("../event/handle/HandlePointDomEventDoService.bs.js");

var _getBody = BodyDoService$WonderMiddlewareEventmanager.getBodyExn;

function setBody(body, po) {
  return {
          eventRecord: po.eventRecord,
          canvas: po.canvas,
          body: Caml_option.some(body),
          browser: po.browser
        };
}

function _fromPointDomEvent(eventName, po) {
  return Most.fromEvent(eventName, BodyDoService$WonderMiddlewareEventmanager.getBodyExn(po), false);
}

function _fromMobilePointDomEvent(eventName, po) {
  return Most.fromEvent(eventName, BodyDoService$WonderMiddlewareEventmanager.getBodyExn(po), {
              passive: false
            });
}

function _fromTouchMoveDomEventAndPreventnDefault(po) {
  var __x = _fromMobilePointDomEvent("touchmove", po);
  return Most.tap(HandlePointDomEventDoService$WonderMiddlewareEventmanager.preventDefault, __x);
}

function _fromKeyboardDomEvent(eventName, po) {
  return Most.fromEvent(eventName, BodyDoService$WonderMiddlewareEventmanager.getBodyExn(po), false);
}

function _convertMouseEventToPointEvent(eventName, param) {
  return {
          name: eventName,
          location: param.location,
          locationInView: param.locationInView,
          button: param.button,
          wheel: param.wheel,
          movementDelta: param.movementDelta,
          event: param.event
        };
}

function _bindDomEventToTriggerPointEvent(param, param$1, po) {
  var convertDomEventToPointEventFunc = param$1[1];
  var pointEventName = param[2];
  var customEventName = param[1];
  return Curry._4(param$1[0], param[0], (function (mouseEvent, po) {
                return ManageEventDoService$WonderMiddlewareEventmanager.triggerCustomGlobalEvent(CreateCustomEventDoService$WonderMiddlewareEventmanager.create(customEventName, Caml_option.some(Curry._2(convertDomEventToPointEventFunc, pointEventName, mouseEvent))), po)[0];
              }), po, undefined);
}

function _bindMouseEventToTriggerPointEvent(po, mouseEventName, customEventName, pointEventName) {
  return _bindDomEventToTriggerPointEvent([
              mouseEventName,
              customEventName,
              pointEventName
            ], [
              (function (param) {
                  var func = function (param$1, param$2, param$3, param$4) {
                    return ManageEventDoService$WonderMiddlewareEventmanager.onMouseEvent(param, param$1, param$2, param$3, param$4);
                  };
                  return function (param) {
                    var func$1 = Curry._1(func, param);
                    return function (param) {
                      return Curry._2(func$1, param, 0);
                    };
                  };
                }),
              _convertMouseEventToPointEvent
            ], po);
}

function _convertTouchEventToPointEvent(eventName, param) {
  return {
          name: eventName,
          location: param.location,
          locationInView: param.locationInView,
          button: undefined,
          wheel: undefined,
          movementDelta: param.movementDelta,
          event: param.event
        };
}

function _bindTouchEventToTriggerPointEvent(po, touchEventName, customEventName, pointEventName) {
  return _bindDomEventToTriggerPointEvent([
              touchEventName,
              customEventName,
              pointEventName
            ], [
              (function (param) {
                  var func = function (param$1, param$2, param$3, param$4) {
                    return ManageEventDoService$WonderMiddlewareEventmanager.onTouchEvent(param, param$1, param$2, param$3, param$4);
                  };
                  return function (param) {
                    var func$1 = Curry._1(func, param);
                    return function (param) {
                      return Curry._2(func$1, param, 0);
                    };
                  };
                }),
              _convertTouchEventToPointEvent
            ], po);
}

function bindDomEventToTriggerPointEvent(po) {
  var match = BrowserDoService$WonderMiddlewareEventmanager.getBrowser(po);
  if (match < 2) {
    return _bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(_bindMouseEventToTriggerPointEvent(po, /* Click */1, NameEventDoService$WonderMiddlewareEventmanager.getPointTapEventName(undefined), /* PointTap */0), /* MouseUp */3, NameEventDoService$WonderMiddlewareEventmanager.getPointUpEventName(undefined), /* PointUp */2), /* MouseDown */2, NameEventDoService$WonderMiddlewareEventmanager.getPointDownEventName(undefined), /* PointDown */1), /* MouseWheel */5, NameEventDoService$WonderMiddlewareEventmanager.getPointScaleEventName(undefined), /* PointScale */4), /* MouseMove */4, NameEventDoService$WonderMiddlewareEventmanager.getPointMoveEventName(undefined), /* PointMove */3), /* MouseDragStart */6, NameEventDoService$WonderMiddlewareEventmanager.getPointDragStartEventName(undefined), /* PointDragStart */5), /* MouseDragOver */7, NameEventDoService$WonderMiddlewareEventmanager.getPointDragOverEventName(undefined), /* PointDragOver */6), /* MouseDragDrop */8, NameEventDoService$WonderMiddlewareEventmanager.getPointDragDropEventName(undefined), /* PointDragDrop */7);
  }
  if (match >= 4) {
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "InitEventDoService.res",
            96,
            2
          ],
          Error: new Error()
        };
  }
  return _bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(_bindTouchEventToTriggerPointEvent(po, /* TouchTap */12, NameEventDoService$WonderMiddlewareEventmanager.getPointTapEventName(undefined), /* PointTap */0), /* TouchEnd */13, NameEventDoService$WonderMiddlewareEventmanager.getPointUpEventName(undefined), /* PointUp */2), /* TouchStart */15, NameEventDoService$WonderMiddlewareEventmanager.getPointDownEventName(undefined), /* PointDown */1), /* TouchMove */14, NameEventDoService$WonderMiddlewareEventmanager.getPointMoveEventName(undefined), /* PointMove */3), /* TouchDragStart */16, NameEventDoService$WonderMiddlewareEventmanager.getPointDragStartEventName(undefined), /* PointDragStart */5), /* TouchDragOver */17, NameEventDoService$WonderMiddlewareEventmanager.getPointDragOverEventName(undefined), /* PointDragOver */6), /* TouchDragDrop */18, NameEventDoService$WonderMiddlewareEventmanager.getPointDragDropEventName(undefined), /* PointDragDrop */7);
}

function _preventContextMenuEvent($$event) {
  HandleDomEventDoService$WonderMiddlewareEventmanager.preventDefault($$event);
  
}

function _execMouseEventHandle(eventName, $$event) {
  var po = ContainerManager$WonderMiddlewareEventmanager.getPO(undefined);
  ContainerManager$WonderMiddlewareEventmanager.setPO(HandleMouseEventDoService$WonderMiddlewareEventmanager.execEventHandle(po, HandleMouseEventDoService$WonderMiddlewareEventmanager.convertMouseDomEventToMouseEvent(eventName, $$event, po)));
  
}

function _execMouseChangePositionEventHandle(mouseEventName, $$event, setPositionFunc) {
  var po = ContainerManager$WonderMiddlewareEventmanager.getPO(undefined);
  var mouseEvent = HandleMouseEventDoService$WonderMiddlewareEventmanager.convertMouseDomEventToMouseEvent(mouseEventName, $$event, po);
  ContainerManager$WonderMiddlewareEventmanager.setPO(Curry._2(setPositionFunc, HandleMouseEventDoService$WonderMiddlewareEventmanager.execEventHandle(po, mouseEvent), mouseEvent));
  
}

function _execMouseMoveEventHandle(mouseEventName, $$event) {
  return _execMouseChangePositionEventHandle(mouseEventName, $$event, HandleMouseEventDoService$WonderMiddlewareEventmanager.setLastXYWhenMouseMove);
}

function _execMouseDragingEventHandle(mouseEventName, $$event) {
  return _execMouseChangePositionEventHandle(mouseEventName, $$event, HandleMouseEventDoService$WonderMiddlewareEventmanager.setLastXYByLocation);
}

function _execMouseDragStartEventHandle($$event) {
  var po = ContainerManager$WonderMiddlewareEventmanager.getPO(undefined);
  ContainerManager$WonderMiddlewareEventmanager.setPO(HandleMouseEventDoService$WonderMiddlewareEventmanager.setLastXY(HandleMouseEventDoService$WonderMiddlewareEventmanager.setIsDrag(HandleMouseEventDoService$WonderMiddlewareEventmanager.execEventHandle(po, HandleMouseEventDoService$WonderMiddlewareEventmanager.convertMouseDomEventToMouseEvent(/* MouseDragStart */6, $$event, po)), true), undefined, undefined));
  
}

function _execMouseDragDropEventHandle($$event) {
  var po = ContainerManager$WonderMiddlewareEventmanager.getPO(undefined);
  ContainerManager$WonderMiddlewareEventmanager.setPO(HandleMouseEventDoService$WonderMiddlewareEventmanager.setIsDrag(HandleMouseEventDoService$WonderMiddlewareEventmanager.execEventHandle(po, HandleMouseEventDoService$WonderMiddlewareEventmanager.convertMouseDomEventToMouseEvent(/* MouseDragDrop */8, $$event, po)), false));
  
}

function _execTouchEventHandle(touchEventName, $$event) {
  ContainerManager$WonderMiddlewareEventmanager.setPO(HandleTouchEventDoService$WonderMiddlewareEventmanager.execEventHandle(ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), touchEventName, $$event));
  
}

function _execTouchChangePositionEventHandle(touchEventName, $$event, setPositonFunc) {
  ContainerManager$WonderMiddlewareEventmanager.setPO(Curry._3(setPositonFunc, HandleTouchEventDoService$WonderMiddlewareEventmanager.execEventHandle(ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), touchEventName, $$event), touchEventName, $$event));
  
}

function _execTouchMoveEventHandle(touchEventName, $$event) {
  return _execTouchChangePositionEventHandle(touchEventName, $$event, HandleTouchEventDoService$WonderMiddlewareEventmanager.setLastXYWhenTouchMove);
}

function _execTouchDragingEventHandle(touchEventName, $$event) {
  return _execTouchChangePositionEventHandle(touchEventName, $$event, HandleTouchEventDoService$WonderMiddlewareEventmanager.setLastXYByLocation);
}

function _execTouchDragStartEventHandle($$event) {
  ContainerManager$WonderMiddlewareEventmanager.setPO(HandleTouchEventDoService$WonderMiddlewareEventmanager.setLastXY(HandleTouchEventDoService$WonderMiddlewareEventmanager.setIsDrag(HandleTouchEventDoService$WonderMiddlewareEventmanager.execEventHandle(ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), /* TouchDragStart */16, $$event), true), undefined, undefined));
  
}

function _execTouchDragDropEventHandle($$event) {
  ContainerManager$WonderMiddlewareEventmanager.setPO(HandleTouchEventDoService$WonderMiddlewareEventmanager.setIsDrag(HandleTouchEventDoService$WonderMiddlewareEventmanager.execEventHandle(ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), /* TouchDragDrop */18, $$event), false));
  
}

function _execKeyboardEventHandle(keyboardEventName, $$event) {
  ContainerManager$WonderMiddlewareEventmanager.setPO(HandleKeyboardEventDoService$WonderMiddlewareEventmanager.execEventHandle(ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), keyboardEventName, $$event));
  
}

function _fromPCDomEventArr(po) {
  var __x = Most.fromEvent("contextmenu", BodyDoService$WonderMiddlewareEventmanager.getBodyExn(po), false);
  var __x$1 = _fromPointDomEvent("click", po);
  var __x$2 = _fromPointDomEvent("mousedown", po);
  var __x$3 = _fromPointDomEvent("mouseup", po);
  var __x$4 = _fromPointDomEvent("mousemove", po);
  var __x$5 = _fromPointDomEvent("mousewheel", po);
  var __x$6 = _fromPointDomEvent("mousedown", po);
  var __x$7 = Most.tap(_execMouseDragStartEventHandle, __x$6);
  var __x$8 = Most.flatMap((function ($$event) {
          var __x = Most.skip(2, _fromPointDomEvent("mousemove", po));
          var __x$1 = _fromPointDomEvent("mouseup", po);
          return Most.until(Most.tap(_execMouseDragDropEventHandle, __x$1), __x);
        }), __x$7);
  var __x$9 = _fromKeyboardDomEvent("keyup", po);
  var __x$10 = _fromKeyboardDomEvent("keydown", po);
  var __x$11 = _fromKeyboardDomEvent("keypress", po);
  return [
          Most.tap((function ($$event) {
                  HandleDomEventDoService$WonderMiddlewareEventmanager.preventDefault($$event);
                  
                }), __x),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* Click */1, $$event);
                }), __x$1),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseDown */2, $$event);
                }), __x$2),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseUp */3, $$event);
                }), __x$3),
          Most.tap((function ($$event) {
                  return _execMouseChangePositionEventHandle(/* MouseMove */4, $$event, HandleMouseEventDoService$WonderMiddlewareEventmanager.setLastXYWhenMouseMove);
                }), __x$4),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseWheel */5, $$event);
                }), __x$5),
          Most.tap((function ($$event) {
                  return _execMouseChangePositionEventHandle(/* MouseDragOver */7, $$event, HandleMouseEventDoService$WonderMiddlewareEventmanager.setLastXYByLocation);
                }), __x$8),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyUp */9, $$event);
                }), __x$9),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyDown */10, $$event);
                }), __x$10),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyPress */11, $$event);
                }), __x$11)
        ];
}

function _fromMobileDomEventArr(po) {
  var __x = _fromMobilePointDomEvent("touchend", po);
  var __x$1 = Most.since(_fromMobilePointDomEvent("touchstart", po), __x);
  var __x$2 = _fromMobilePointDomEvent("touchend", po);
  var __x$3 = _fromMobilePointDomEvent("touchstart", po);
  var __x$4 = _fromTouchMoveDomEventAndPreventnDefault(po);
  var __x$5 = _fromMobilePointDomEvent("touchstart", po);
  var __x$6 = Most.tap(_execTouchDragStartEventHandle, __x$5);
  var __x$7 = Most.flatMap((function ($$event) {
          var __x = _fromTouchMoveDomEventAndPreventnDefault(po);
          var __x$1 = _fromMobilePointDomEvent("touchend", po);
          return Most.until(Most.tap(_execTouchDragDropEventHandle, __x$1), __x);
        }), __x$6);
  return [
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchTap */12, $$event);
                }), __x$1),
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchEnd */13, $$event);
                }), __x$2),
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchStart */15, $$event);
                }), __x$3),
          Most.tap((function ($$event) {
                  return _execTouchChangePositionEventHandle(/* TouchMove */14, $$event, HandleTouchEventDoService$WonderMiddlewareEventmanager.setLastXYWhenTouchMove);
                }), __x$4),
          Most.tap((function ($$event) {
                  return _execTouchChangePositionEventHandle(/* TouchDragOver */17, $$event, HandleTouchEventDoService$WonderMiddlewareEventmanager.setLastXYByLocation);
                }), __x$7)
        ];
}

function fromDomEvent(po) {
  var match = BrowserDoService$WonderMiddlewareEventmanager.getBrowser(po);
  var tmp;
  if (match >= 2) {
    if (match >= 4) {
      throw {
            RE_EXN_ID: "Match_failure",
            _1: [
              "InitEventDoService.res",
              419,
              4
            ],
            Error: new Error()
          };
    }
    tmp = _fromMobileDomEventArr(po);
  } else {
    tmp = _fromPCDomEventArr(po);
  }
  return Most.mergeArray(tmp);
}

var handleDomEventStreamError = Log$WonderCommonlib.logForDebug;

function initEvent(po) {
  var __x = fromDomEvent(po);
  var domEventStreamSubscription = __x.subscribe({
        next: (function (param) {
            
          }),
        error: Log$WonderCommonlib.logForDebug,
        complete: (function (param) {
            
          })
      });
  return bindDomEventToTriggerPointEvent(ManageEventDoService$WonderMiddlewareEventmanager.setDomEventStreamSubscription(po, domEventStreamSubscription));
}

exports._getBody = _getBody;
exports.setBody = setBody;
exports._fromPointDomEvent = _fromPointDomEvent;
exports._fromMobilePointDomEvent = _fromMobilePointDomEvent;
exports._fromTouchMoveDomEventAndPreventnDefault = _fromTouchMoveDomEventAndPreventnDefault;
exports._fromKeyboardDomEvent = _fromKeyboardDomEvent;
exports._convertMouseEventToPointEvent = _convertMouseEventToPointEvent;
exports._bindDomEventToTriggerPointEvent = _bindDomEventToTriggerPointEvent;
exports._bindMouseEventToTriggerPointEvent = _bindMouseEventToTriggerPointEvent;
exports._convertTouchEventToPointEvent = _convertTouchEventToPointEvent;
exports._bindTouchEventToTriggerPointEvent = _bindTouchEventToTriggerPointEvent;
exports.bindDomEventToTriggerPointEvent = bindDomEventToTriggerPointEvent;
exports._preventContextMenuEvent = _preventContextMenuEvent;
exports._execMouseEventHandle = _execMouseEventHandle;
exports._execMouseChangePositionEventHandle = _execMouseChangePositionEventHandle;
exports._execMouseMoveEventHandle = _execMouseMoveEventHandle;
exports._execMouseDragingEventHandle = _execMouseDragingEventHandle;
exports._execMouseDragStartEventHandle = _execMouseDragStartEventHandle;
exports._execMouseDragDropEventHandle = _execMouseDragDropEventHandle;
exports._execTouchEventHandle = _execTouchEventHandle;
exports._execTouchChangePositionEventHandle = _execTouchChangePositionEventHandle;
exports._execTouchMoveEventHandle = _execTouchMoveEventHandle;
exports._execTouchDragingEventHandle = _execTouchDragingEventHandle;
exports._execTouchDragStartEventHandle = _execTouchDragStartEventHandle;
exports._execTouchDragDropEventHandle = _execTouchDragDropEventHandle;
exports._execKeyboardEventHandle = _execKeyboardEventHandle;
exports._fromPCDomEventArr = _fromPCDomEventArr;
exports._fromMobileDomEventArr = _fromMobileDomEventArr;
exports.fromDomEvent = fromDomEvent;
exports.handleDomEventStreamError = handleDomEventStreamError;
exports.initEvent = initEvent;
/* most Not a pure module */
