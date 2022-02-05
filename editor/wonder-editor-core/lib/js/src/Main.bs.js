'use strict';

var Curry = require("rescript/lib/js/curry.js");
var UI$WonderEditorCore = require("./UI.bs.js");
var AddMenuItem$WonderEditorCore = require("./wonder-event-handlers/AddMenuItem.bs.js");
var EventManager$WonderEditorCore = require("./EventManager.bs.js");
var TriggerTest1$WonderEditorCore = require("./wonder-uis/TriggerTest1.bs.js");
var RegisterEventHandler$WonderEditorCore = require("./wonder-uis/RegisterEventHandler.bs.js");
var RegisterEventHandlerSubmit$WonderEditorCore = require("./wonder-event-handlers/RegisterEventHandlerSubmit.bs.js");
var ShowAllRegisteredEventHandlers$WonderEditorCore = require("./wonder-uis/ShowAllRegisteredEventHandlers.bs.js");

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

exports._initMiddlewares = _initMiddlewares;
exports._initEngine = _initEngine;
exports._initEditor = _initEditor;
exports.init = init;
/*  Not a pure module */
