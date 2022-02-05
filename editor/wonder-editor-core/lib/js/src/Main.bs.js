'use strict';

var UI$WonderEditorCore = require("./UI.bs.js");
var AddMenuItem$WonderEditorCore = require("./wonder-event-handlers/AddMenuItem.bs.js");
var EventManager$WonderEditorCore = require("./EventManager.bs.js");
var TriggerTest1$WonderEditorCore = require("./wonder-uis/TriggerTest1.bs.js");
var DefaultEventName$WonderEditorCore = require("./DefaultEventName.bs.js");
var RegisterEventHandler$WonderEditorCore = require("./wonder-uis/RegisterEventHandler.bs.js");
var RegisterEventHandlerSubmit$WonderEditorCore = require("./wonder-event-handlers/RegisterEventHandlerSubmit.bs.js");
var ShowAllRegisteredEventHandlers$WonderEditorCore = require("./wonder-uis/ShowAllRegisteredEventHandlers.bs.js");

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

exports._initMiddlewares = _initMiddlewares;
exports._initEngine = _initEngine;
exports._initEditor = _initEditor;
exports.init = init;
/*  Not a pure module */
