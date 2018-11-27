

import * as Most from "most";
import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ViewService$Wonderjs from "../../service/record/main/device/ViewService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as NameEventService$Wonderjs from "../../service/record/main/event/NameEventService.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as StateDataMainService$Wonderjs from "../../service/state/main/state/StateDataMainService.js";
import * as ManageEventMainService$Wonderjs from "../../service/state/main/event/ManageEventMainService.js";
import * as HandleDomEventMainService$Wonderjs from "../../service/state/main/event/handle/HandleDomEventMainService.js";
import * as HandleMouseEventMainService$Wonderjs from "../../service/state/main/event/handle/HandleMouseEventMainService.js";
import * as HandleTouchEventMainService$Wonderjs from "../../service/state/main/event/handle/HandleTouchEventMainService.js";
import * as CreateCustomEventMainService$Wonderjs from "../../service/state/main/event/event/CreateCustomEventMainService.js";
import * as HandleKeyboardEventMainService$Wonderjs from "../../service/state/main/event/handle/HandleKeyboardEventMainService.js";

function _getBody() {
  return document.body;
}

function _fromPointDomEvent(eventName, state) {
  return Most.fromEvent(eventName, ViewService$Wonderjs.unsafeGetCanvas(state[/* viewRecord */8]), false);
}

function _fromKeyboardDomEvent(eventName, _) {
  return Most.fromEvent(eventName, document.body, false);
}

function _convertMouseEventToPointEvent(eventName, param) {
  return /* record */[
          /* name */eventName,
          /* location */param[/* location */1],
          /* locationInView */param[/* locationInView */2],
          /* button */param[/* button */3],
          /* wheel */param[/* wheel */4],
          /* movementDelta */param[/* movementDelta */5],
          /* event */param[/* event */6]
        ];
}

function _bindDomEventToTriggerPointEvent(param, param$1, state) {
  var convertDomEventToPointEventFunc = param$1[1];
  var pointEventName = param[2];
  var customEventName = param[1];
  return Curry._4(param$1[0], param[0], (function (mouseEvent, state) {
                return ManageEventMainService$Wonderjs.triggerCustomGlobalEvent(CreateCustomEventMainService$Wonderjs.create(customEventName, Js_primitive.some(Curry._2(convertDomEventToPointEventFunc, pointEventName, mouseEvent))), state)[0];
              }), state, /* () */0);
}

function _bindMouseEventToTriggerPointEvent(mouseEventName, customEventName, pointEventName, state) {
  return _bindDomEventToTriggerPointEvent(/* tuple */[
              mouseEventName,
              customEventName,
              pointEventName
            ], /* tuple */[
              (function (param) {
                  var func = function (param$1, param$2, param$3, param$4) {
                    return ManageEventMainService$Wonderjs.onMouseEvent(param, param$1, param$2, param$3, param$4);
                  };
                  return (function (param) {
                      var func$1 = Curry._1(func, param);
                      return (function (param) {
                          return Curry._2(func$1, param, 0);
                        });
                    });
                }),
              _convertMouseEventToPointEvent
            ], state);
}

function _convertTouchEventToPointEvent(eventName, param) {
  return /* record */[
          /* name */eventName,
          /* location */param[/* location */1],
          /* locationInView */param[/* locationInView */2],
          /* button */undefined,
          /* wheel */undefined,
          /* movementDelta */param[/* movementDelta */4],
          /* event */param[/* event */5]
        ];
}

function _bindTouchEventToTriggerPointEvent(touchEventName, customEventName, pointEventName, state) {
  return _bindDomEventToTriggerPointEvent(/* tuple */[
              touchEventName,
              customEventName,
              pointEventName
            ], /* tuple */[
              (function (param) {
                  var func = function (param$1, param$2, param$3, param$4) {
                    return ManageEventMainService$Wonderjs.onTouchEvent(param, param$1, param$2, param$3, param$4);
                  };
                  return (function (param) {
                      var func$1 = Curry._1(func, param);
                      return (function (param) {
                          return Curry._2(func$1, param, 0);
                        });
                    });
                }),
              _convertTouchEventToPointEvent
            ], state);
}

function bindDomEventToTriggerPointEvent(state) {
  var browser = state[/* browserDetectRecord */39][/* browser */0];
  if (browser >= 2) {
    if (browser >= 4) {
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("bindDomEventToTriggerPointEvent", "unknown browser", "", "", "browser:" + (String(browser) + "")));
    } else {
      return _bindTouchEventToTriggerPointEvent(/* TouchDrag */14, NameEventService$Wonderjs.getPointDragEventName(/* () */0), /* PointDrag */5, _bindTouchEventToTriggerPointEvent(/* TouchMove */12, NameEventService$Wonderjs.getPointMoveEventName(/* () */0), /* PointMove */3, _bindTouchEventToTriggerPointEvent(/* TouchStart */13, NameEventService$Wonderjs.getPointDownEventName(/* () */0), /* PointDown */1, _bindTouchEventToTriggerPointEvent(/* TouchEnd */11, NameEventService$Wonderjs.getPointUpEventName(/* () */0), /* PointUp */2, _bindTouchEventToTriggerPointEvent(/* TouchTap */10, NameEventService$Wonderjs.getPointTapEventName(/* () */0), /* PointTap */0, state)))));
    }
  } else {
    return _bindMouseEventToTriggerPointEvent(/* MouseDrag */6, NameEventService$Wonderjs.getPointDragEventName(/* () */0), /* PointDrag */5, _bindMouseEventToTriggerPointEvent(/* MouseMove */4, NameEventService$Wonderjs.getPointMoveEventName(/* () */0), /* PointMove */3, _bindMouseEventToTriggerPointEvent(/* MouseWheel */5, NameEventService$Wonderjs.getPointScaleEventName(/* () */0), /* PointScale */4, _bindMouseEventToTriggerPointEvent(/* MouseDown */2, NameEventService$Wonderjs.getPointDownEventName(/* () */0), /* PointDown */1, _bindMouseEventToTriggerPointEvent(/* MouseUp */3, NameEventService$Wonderjs.getPointUpEventName(/* () */0), /* PointUp */2, _bindMouseEventToTriggerPointEvent(/* Click */1, NameEventService$Wonderjs.getPointTapEventName(/* () */0), /* PointTap */0, state))))));
  }
}

function _preventContextMenuEvent($$event) {
  HandleDomEventMainService$Wonderjs.preventDefault($$event);
  return /* () */0;
}

function _execMouseEventHandle(eventName, $$event) {
  var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleMouseEventMainService$Wonderjs.execEventHandle(HandleMouseEventMainService$Wonderjs.convertMouseDomEventToMouseEvent(eventName, $$event, state), state));
  return /* () */0;
}

function _execMouseMoveEventHandle(mouseEventName, $$event) {
  var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
  var mouseEvent = HandleMouseEventMainService$Wonderjs.convertMouseDomEventToMouseEvent(mouseEventName, $$event, state);
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleMouseEventMainService$Wonderjs.setLastXYWhenMouseMove(mouseEvent, HandleMouseEventMainService$Wonderjs.execEventHandle(mouseEvent, state)));
  return /* () */0;
}

function _execMouseDragingEventHandle(mouseEventName, $$event) {
  var state = StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
  var mouseEvent = HandleMouseEventMainService$Wonderjs.convertMouseDomEventToMouseEvent(mouseEventName, $$event, state);
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleMouseEventMainService$Wonderjs.setLastXYByLocation(mouseEvent, HandleMouseEventMainService$Wonderjs.execEventHandle(mouseEvent, state)));
  return /* () */0;
}

function _execMouseDragStartEventHandle() {
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleMouseEventMainService$Wonderjs.setLastXY(undefined, undefined, HandleMouseEventMainService$Wonderjs.setIsDrag(true, StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData))));
  return /* () */0;
}

function _execMouseDragEndEventHandle() {
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleMouseEventMainService$Wonderjs.setIsDrag(false, StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData)));
  return /* () */0;
}

function _execTouchEventHandle(touchEventName, $$event) {
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleTouchEventMainService$Wonderjs.execEventHandle(touchEventName, $$event, StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData)));
  return /* () */0;
}

function _execTouchMoveEventHandle(touchEventName, $$event) {
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleTouchEventMainService$Wonderjs.setLastXYWhenTouchMove(touchEventName, $$event, HandleTouchEventMainService$Wonderjs.execEventHandle(touchEventName, $$event, StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData))));
  return /* () */0;
}

function _execTouchDragingEventHandle(touchEventName, $$event) {
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleTouchEventMainService$Wonderjs.setLastXYByLocation(touchEventName, $$event, HandleTouchEventMainService$Wonderjs.execEventHandle(touchEventName, $$event, StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData))));
  return /* () */0;
}

function _execTouchDragStartEventHandle() {
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleTouchEventMainService$Wonderjs.setLastXY(undefined, undefined, HandleTouchEventMainService$Wonderjs.setIsDrag(true, StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData))));
  return /* () */0;
}

function _execTouchDragEndEventHandle() {
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleTouchEventMainService$Wonderjs.setIsDrag(false, StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData)));
  return /* () */0;
}

function _execKeyboardEventHandle(keyboardEventName, $$event) {
  StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, HandleKeyboardEventMainService$Wonderjs.execEventHandle(keyboardEventName, $$event, StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData)));
  return /* () */0;
}

function _fromPCDomEventArr(state) {
  return /* array */[
          Most.tap((function ($$event) {
                  HandleDomEventMainService$Wonderjs.preventDefault($$event);
                  return /* () */0;
                }), Most.fromEvent("contextmenu", document.body, false)),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* Click */1, $$event);
                }), _fromPointDomEvent("click", state)),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseDown */2, $$event);
                }), _fromPointDomEvent("mousedown", state)),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseUp */3, $$event);
                }), _fromPointDomEvent("mouseup", state)),
          Most.tap((function ($$event) {
                  return _execMouseMoveEventHandle(/* MouseMove */4, $$event);
                }), _fromPointDomEvent("mousemove", state)),
          Most.tap((function ($$event) {
                  return _execMouseEventHandle(/* MouseWheel */5, $$event);
                }), _fromPointDomEvent("mousewheel", state)),
          Most.tap((function ($$event) {
                  return _execMouseDragingEventHandle(/* MouseDrag */6, $$event);
                }), Most.flatMap((function () {
                      return Most.until(Most.tap((function () {
                                        return _execMouseDragEndEventHandle(/* () */0);
                                      }), _fromPointDomEvent("mouseup", state)), _fromPointDomEvent("mousemove", state));
                    }), Most.tap((function () {
                          return _execMouseDragStartEventHandle(/* () */0);
                        }), _fromPointDomEvent("mousedown", state)))),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyUp */7, $$event);
                }), _fromKeyboardDomEvent("keyup", state)),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyDown */8, $$event);
                }), _fromKeyboardDomEvent("keydown", state)),
          Most.tap((function ($$event) {
                  return _execKeyboardEventHandle(/* KeyPress */9, $$event);
                }), _fromKeyboardDomEvent("keypress", state))
        ];
}

function _fromMobileDomEventArr(state) {
  return /* array */[
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchTap */10, $$event);
                }), Most.since(_fromPointDomEvent("touchstart", state), _fromPointDomEvent("touchend", state))),
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchEnd */11, $$event);
                }), _fromPointDomEvent("touchend", state)),
          Most.tap((function ($$event) {
                  return _execTouchEventHandle(/* TouchStart */13, $$event);
                }), _fromPointDomEvent("touchstart", state)),
          Most.tap((function ($$event) {
                  return _execTouchMoveEventHandle(/* TouchMove */12, $$event);
                }), _fromPointDomEvent("touchmove", state)),
          Most.tap((function ($$event) {
                  return _execTouchDragingEventHandle(/* TouchDrag */14, $$event);
                }), Most.flatMap((function () {
                      return Most.until(Most.tap((function () {
                                        return _execTouchDragEndEventHandle(/* () */0);
                                      }), _fromPointDomEvent("touchend", state)), _fromPointDomEvent("touchmove", state));
                    }), Most.tap((function () {
                          return _execTouchDragStartEventHandle(/* () */0);
                        }), _fromPointDomEvent("touchstart", state))))
        ];
}

function fromDomEvent(state) {
  var browser = state[/* browserDetectRecord */39][/* browser */0];
  return Most.mergeArray(browser >= 2 ? (
                browser >= 4 ? Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("fromDomEvent", "unknown browser", "", "", "browser:" + (String(browser) + ""))) : _fromMobileDomEventArr(state)
              ) : _fromPCDomEventArr(state));
}

function handleDomEventStreamError(e) {
  var message = e.message;
  var stack = e.stack;
  var partial_arg = "message:" + (String(message) + ("\nstack:" + (String(stack) + "")));
  var partial_arg$1 = "from dom event stream error";
  return Log$WonderLog.debug((function (param) {
                return Log$WonderLog.buildDebugMessage(partial_arg$1, partial_arg, param);
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
}

function initEvent(state) {
  var domEventStreamSubscription = fromDomEvent(state).subscribe({
        next: (function () {
            return /* () */0;
          }),
        error: handleDomEventStreamError,
        complete: (function () {
            return /* () */0;
          })
      });
  return bindDomEventToTriggerPointEvent(ManageEventMainService$Wonderjs.setDomEventStreamSubscription(domEventStreamSubscription, state));
}

export {
  _getBody ,
  _fromPointDomEvent ,
  _fromKeyboardDomEvent ,
  _convertMouseEventToPointEvent ,
  _bindDomEventToTriggerPointEvent ,
  _bindMouseEventToTriggerPointEvent ,
  _convertTouchEventToPointEvent ,
  _bindTouchEventToTriggerPointEvent ,
  bindDomEventToTriggerPointEvent ,
  _preventContextMenuEvent ,
  _execMouseEventHandle ,
  _execMouseMoveEventHandle ,
  _execMouseDragingEventHandle ,
  _execMouseDragStartEventHandle ,
  _execMouseDragEndEventHandle ,
  _execTouchEventHandle ,
  _execTouchMoveEventHandle ,
  _execTouchDragingEventHandle ,
  _execTouchDragStartEventHandle ,
  _execTouchDragEndEventHandle ,
  _execKeyboardEventHandle ,
  _fromPCDomEventArr ,
  _fromMobileDomEventArr ,
  fromDomEvent ,
  handleDomEventStreamError ,
  initEvent ,
  
}
/* most Not a pure module */
