

import * as UI$WonderEditorCore from "./UI.bs.js";
import * as AddMenuItem$WonderEditorCore from "./wonder-event-handlers/AddMenuItem.bs.js";
import * as EventManager$WonderEditorCore from "./EventManager.bs.js";
import * as TriggerTest1$WonderEditorCore from "./wonder-uis/TriggerTest1.bs.js";
import * as DefaultEventName$WonderEditorCore from "./DefaultEventName.bs.js";
import * as RegisterEventHandler$WonderEditorCore from "./wonder-uis/RegisterEventHandler.bs.js";
import * as RegisterEventHandlerSubmit$WonderEditorCore from "./wonder-event-handlers/RegisterEventHandlerSubmit.bs.js";
import * as ShowAllRegisteredEventHandlers$WonderEditorCore from "./wonder-uis/ShowAllRegisteredEventHandlers.bs.js";

function _initMiddlewares(param) {
  EventManager$WonderEditorCore.init(undefined);
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
  EventManager$WonderEditorCore.onCustomEvent(DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), (function (param) {
          return AddMenuItem$WonderEditorCore.handler(partial_arg, param);
        }));
  var partial_arg_ui$1 = UI$WonderEditorCore.buildAPI(undefined);
  var partial_arg_eventManager$1 = EventManager$WonderEditorCore.buildAPI(undefined);
  var partial_arg$1 = {
    ui: partial_arg_ui$1,
    eventManager: partial_arg_eventManager$1
  };
  EventManager$WonderEditorCore.onCustomEvent(DefaultEventName$WonderEditorCore.getRegisterEventHandlerSubmitEventName(undefined), (function (param) {
          return RegisterEventHandlerSubmit$WonderEditorCore.handler(partial_arg$1, param);
        }));
  EventManager$WonderEditorCore.trigger(DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
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
  EventManager$WonderEditorCore.trigger(DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "showAllRegisteredEventHandlers",
        func: ShowAllRegisteredEventHandlers$WonderEditorCore.execFunc,
        stateValue: {
          eventHandlerArr: []
        }
      });
  return EventManager$WonderEditorCore.trigger(DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
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
  EventManager$WonderEditorCore.init(undefined);
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
