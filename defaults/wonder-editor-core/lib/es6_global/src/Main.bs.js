

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as UI$WonderEditorCore from "./wonder-middlewares/UI.bs.js";
import * as EventManager$WonderEditorCore from "./wonder-middlewares/EventManager.bs.js";
import * as DefaultEventName$WonderEditorCore from "./wonder-middlewares/DefaultEventName.bs.js";
import * as MiddlewareManager$WonderEditorCore from "./wonder-middlewares/MiddlewareManager.bs.js";
import * as RegisterEventHandler$WonderEditorCore from "./wonder-uis/RegisterEventHandler.bs.js";
import * as RegisterEventHandlerSubmit$WonderEditorCore from "./wonder-event-handlers/RegisterEventHandlerSubmit.bs.js";

function _initMiddlewares(param) {
  var middlewareState = MiddlewareManager$WonderEditorCore.init(undefined);
  var middlewareState$1 = MiddlewareManager$WonderEditorCore.register(MiddlewareManager$WonderEditorCore.register(middlewareState, "EventManager", EventManager$WonderEditorCore.getData(undefined)), "UI", UI$WonderEditorCore.getData(undefined));
  var eventManager = MiddlewareManager$WonderEditorCore.unsafeGetData(middlewareState$1, "EventManager");
  var middlewareState$2 = MiddlewareManager$WonderEditorCore.setState(middlewareState$1, "EventManager", Curry._1(eventManager.init, undefined));
  var ui = MiddlewareManager$WonderEditorCore.unsafeGetData(middlewareState$2, "UI");
  return MiddlewareManager$WonderEditorCore.setState(middlewareState$2, "UI", Curry._1(ui.init, undefined));
}

function _initEditor(middlewareState) {
  var eventManager = MiddlewareManager$WonderEditorCore.unsafeGetData(middlewareState, "EventManager");
  var eventManagerState = MiddlewareManager$WonderEditorCore.unsafeGetState(middlewareState, "EventManager");
  var eventManagerState$1 = Curry._3(eventManager.onCustomEvent, eventManagerState, DefaultEventName$WonderEditorCore.getRegisterEventHandlerSubmitEventName(undefined), RegisterEventHandlerSubmit$WonderEditorCore.handler);
  var ui = MiddlewareManager$WonderEditorCore.unsafeGetData(middlewareState, "UI");
  var uiState = MiddlewareManager$WonderEditorCore.unsafeGetState(middlewareState, "UI");
  var uiState$1 = Curry._2(ui.register, uiState, {
        id: "registerEventHandler",
        func: RegisterEventHandler$WonderEditorCore.execFunc,
        stateValue: {
          x: 0,
          y: 140,
          width: 20,
          height: 10,
          text: "registerEventHandler"
        }
      });
  return MiddlewareManager$WonderEditorCore.setState(MiddlewareManager$WonderEditorCore.setState(middlewareState, "EventManager", eventManagerState$1), "UI", uiState$1);
}

function init(param) {
  return _initEditor(_initMiddlewares(undefined));
}

var _render = (function(states, renderUIFunc) {
states = renderUIFunc(states)

requestAnimationFrame(
  () =>{
_render(states, renderUIFunc)
  }
)
});

var middlewareState = _initEditor(_initMiddlewares(undefined));

var ui = MiddlewareManager$WonderEditorCore.unsafeGetData(middlewareState, "UI");

_render(middlewareState, ui.render);

var states = middlewareState;

export {
  _initMiddlewares ,
  _initEditor ,
  init ,
  _render ,
  middlewareState ,
  ui ,
  states ,
  
}
/* middlewareState Not a pure module */
