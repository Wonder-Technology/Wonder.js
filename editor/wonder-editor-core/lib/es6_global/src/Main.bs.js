

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as UI$WonderEditorCore from "./UI.bs.js";
import * as AddMenuItem$WonderEditorCore from "./wonder-event-handlers/AddMenuItem.bs.js";
import * as EventManager$WonderEditorCore from "./EventManager.bs.js";
import * as TriggerTest1$WonderEditorCore from "./wonder-uis/TriggerTest1.bs.js";
import * as RegisterEventHandler$WonderEditorCore from "./wonder-uis/RegisterEventHandler.bs.js";
import * as RegisterEventHandlerSubmit$WonderEditorCore from "./wonder-event-handlers/RegisterEventHandlerSubmit.bs.js";
import * as ShowAllRegisteredEventHandlers$WonderEditorCore from "./wonder-uis/ShowAllRegisteredEventHandlers.bs.js";

function _initMiddlewares(param) {
  return UI$WonderEditorCore.init(undefined);
}

function _initEngine(param) {
  return 1;
}

function _initEditor(param) {
  var partial_arg_ui = UI$WonderEditorCore.buildAPI(undefined);
  var partial_arg_eventManager = EventManager$WonderEditorCore.buildAPI(undefined);
  var partial_arg = {
    ui: partial_arg_ui,
    eventManager: partial_arg_eventManager
  };
  Curry._1(EventManager$WonderEditorCore.onCustomEvent(/* AddMenuItem */0), (function (param) {
          return AddMenuItem$WonderEditorCore.handler(partial_arg, param);
        }));
  var partial_arg_ui$1 = UI$WonderEditorCore.buildAPI(undefined);
  var partial_arg_eventManager$1 = EventManager$WonderEditorCore.buildAPI(undefined);
  var partial_arg$1 = {
    ui: partial_arg_ui$1,
    eventManager: partial_arg_eventManager$1
  };
  Curry._1(EventManager$WonderEditorCore.onCustomEvent(/* RegisterEventHandler_Submit */1), (function (param) {
          return RegisterEventHandlerSubmit$WonderEditorCore.handler(partial_arg$1, param);
        }));
  UI$WonderEditorCore.markNotRender(undefined);
  Curry._1(EventManager$WonderEditorCore.trigger(/* AddMenuItem */0), {
        id: "registerEventHandler",
        func: RegisterEventHandler$WonderEditorCore.execFunc,
        stateValue: {
          x: 0,
          y: 140,
          width: 20,
          height: 10,
          text: "submit"
        }
      });
  Curry._1(EventManager$WonderEditorCore.trigger(/* AddMenuItem */0), {
        id: "showAllEventHandlers",
        func: ShowAllRegisteredEventHandlers$WonderEditorCore.execFunc,
        stateValue: {
          eventHandlerArr: []
        }
      });
  return Curry._1(EventManager$WonderEditorCore.trigger(/* AddMenuItem */0), {
              id: "triggerTest1",
              func: TriggerTest1$WonderEditorCore.execFunc,
              stateValue: {
                x: 0,
                y: 240,
                width: 20,
                height: 10,
                text: "trigger_test1"
              }
            });
}

function init(param) {
  UI$WonderEditorCore.init(undefined);
  return _initEditor(undefined);
}

init(undefined);

UI$WonderEditorCore.render(undefined);

export {
  _initMiddlewares ,
  _initEngine ,
  _initEditor ,
  init ,
  
}
/*  Not a pure module */
