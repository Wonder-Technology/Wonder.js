

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as UI$WonderEditorCore from "./UI.bs.js";
import * as Utils$WonderEditorCore from "./Utils.bs.js";
import * as AddMenuItem$WonderEditorCore from "./wonder-event-handlers/AddMenuItem.bs.js";
import * as EventManager$WonderEditorCore from "./EventManager.bs.js";
import * as TriggerTest1$WonderEditorCore from "./wonder-uis/TriggerTest1.bs.js";
import * as DefaultEventName$WonderEditorCore from "./DefaultEventName.bs.js";
import * as MiddlewareManager$WonderEditorCore from "./MiddlewareManager.bs.js";
import * as RegisterMiddleware$WonderEditorCore from "./wonder-uis/RegisterMiddleware.bs.js";
import * as RegisterEventHandler$WonderEditorCore from "./wonder-uis/RegisterEventHandler.bs.js";
import * as RegisterMiddlewareSubmit$WonderEditorCore from "./wonder-event-handlers/RegisterMiddlewareSubmit.bs.js";
import * as RegisterEventHandlerSubmit$WonderEditorCore from "./wonder-event-handlers/RegisterEventHandlerSubmit.bs.js";
import * as ShowAllRegisteredEventHandlers$WonderEditorCore from "./wonder-uis/ShowAllRegisteredEventHandlers.bs.js";

function _initMiddlewares(param) {
  MiddlewareManager$WonderEditorCore.init(undefined);
  MiddlewareManager$WonderEditorCore.register("EventManager", EventManager$WonderEditorCore.getData(undefined));
  MiddlewareManager$WonderEditorCore.register("UI", UI$WonderEditorCore.getData(undefined));
  var eventManager = MiddlewareManager$WonderEditorCore.unsafeGet("EventManager");
  Curry._1(eventManager.init, undefined);
  var ui = MiddlewareManager$WonderEditorCore.unsafeGet("UI");
  return Curry._1(ui.init, undefined);
}

function _initEngine(param) {
  return 1;
}

function _initEditor(param) {
  var eventManager = MiddlewareManager$WonderEditorCore.unsafeGet("EventManager");
  var partial_arg = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.onCustomEvent, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), (function (param) {
          return AddMenuItem$WonderEditorCore.handler(partial_arg, param);
        }));
  var partial_arg$1 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.onCustomEvent, DefaultEventName$WonderEditorCore.getRegisterEventHandlerSubmitEventName(undefined), (function (param) {
          return RegisterEventHandlerSubmit$WonderEditorCore.handler(partial_arg$1, param);
        }));
  var partial_arg$2 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.onCustomEvent, DefaultEventName$WonderEditorCore.getRegisterMiddlewareSubmitEventName(undefined), (function (param) {
          return RegisterMiddlewareSubmit$WonderEditorCore.handler(partial_arg$2, param);
        }));
  var partial_arg$3 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "registerEventHandler",
        func: (function (param) {
            return RegisterEventHandler$WonderEditorCore.execFunc(partial_arg$3, param);
          }),
        stateValue: {
          x: 0,
          y: 140,
          width: 20,
          height: 10,
          text: "submit"
        }
      });
  var partial_arg$4 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "showAllRegisteredEventHandlers",
        func: (function (param) {
            return ShowAllRegisteredEventHandlers$WonderEditorCore.execFunc(partial_arg$4, param);
          }),
        stateValue: {
          eventHandlerArr: []
        }
      });
  var partial_arg$5 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "triggerTest1",
        func: (function (param) {
            return TriggerTest1$WonderEditorCore.execFunc(partial_arg$5, param);
          }),
        stateValue: {
          x: 0,
          y: 240,
          width: 20,
          height: 10,
          text: "trigger_test1"
        }
      });
  var partial_arg$6 = Utils$WonderEditorCore.buildAPI(undefined);
  return Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
              id: "registerMiddleware",
              func: (function (param) {
                  return RegisterMiddleware$WonderEditorCore.execFunc(partial_arg$6, param);
                }),
              stateValue: {
                x: 200,
                y: 140,
                width: 20,
                height: 10,
                text: "registerMiddleware"
              }
            });
}

function init(param) {
  _initMiddlewares(undefined);
  return _initEditor(undefined);
}

init(undefined);

var _render = (function(renderUIFunc) {
renderUIFunc()

requestAnimationFrame(
  () =>{
_render(renderUIFunc)
  }
)
});

var ui = MiddlewareManager$WonderEditorCore.unsafeGet("UI");

_render(ui.render);

export {
  _initMiddlewares ,
  _initEngine ,
  _initEditor ,
  init ,
  _render ,
  ui ,
  
}
/*  Not a pure module */
