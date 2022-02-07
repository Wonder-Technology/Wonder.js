

import * as Most from "most";
import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as UI$WonderEditorCore from "./UI.bs.js";
import * as Main$WonderEngineCore from "../../../../../node_modules/wonder-engine-core/lib/es6_global/src/Main.bs.js";
import * as Utils$WonderEditorCore from "./Utils.bs.js";
import * as RootMain$WonderEditorCore from "./wonder-work-plugins/root/RootMain.bs.js";
import * as RegisterUI$WonderEditorCore from "./wonder-uis/RegisterUI.bs.js";
import * as AddMenuItem$WonderEditorCore from "./wonder-event-handlers/AddMenuItem.bs.js";
import * as EventManager$WonderEditorCore from "./EventManager.bs.js";
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
  Main$WonderEngineCore.prepare(undefined);
  Main$WonderEngineCore.registerWorkPlugin(RootMain$WonderEditorCore.getData(undefined), undefined, undefined);
  Main$WonderEngineCore.init(undefined);
  return Most.drain(Main$WonderEngineCore.runPipeline("init"));
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
          text: "registerEventHandler"
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
        id: "registerUI",
        func: (function (param) {
            return RegisterUI$WonderEditorCore.execFunc(partial_arg$5, param);
          }),
        stateValue: {
          x: 0,
          y: 240,
          width: 60,
          height: 20,
          text: "registerUI"
        }
      });
  var partial_arg$6 = Utils$WonderEditorCore.buildAPI(undefined);
  return Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
              id: "registerMiddleware",
              func: (function (param) {
                  return RegisterMiddleware$WonderEditorCore.execFunc(partial_arg$6, param);
                }),
              stateValue: {
                x: 300,
                y: 140,
                width: 20,
                height: 10,
                text: "registerMiddleware"
              }
            });
}

function init(param) {
  _initMiddlewares(undefined);
  _initEditor(undefined);
  return _initEngine(undefined);
}

var _render = (function(renderUIFunc) {
renderUIFunc()

requestAnimationFrame(
  () =>{
_render(renderUIFunc)
  }
)
});

var __x = init(undefined);

__x.then(function (param) {
      var ui = MiddlewareManager$WonderEditorCore.unsafeGet("UI");
      return _render(ui.render);
    });

export {
  _initMiddlewares ,
  _initEngine ,
  _initEditor ,
  init ,
  _render ,
  
}
/* __x Not a pure module */
