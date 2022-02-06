'use strict';

var UI$WonderEditorCore = require("./UI.bs.js");
var Utils$WonderEditorCore = require("./Utils.bs.js");
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
  var partial_arg = Utils$WonderEditorCore.buildAPI(undefined);
  EventManager$WonderEditorCore.onCustomEvent(DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), (function (param) {
          return AddMenuItem$WonderEditorCore.handler(partial_arg, param);
        }));
  var partial_arg$1 = Utils$WonderEditorCore.buildAPI(undefined);
  EventManager$WonderEditorCore.onCustomEvent(DefaultEventName$WonderEditorCore.getRegisterEventHandlerSubmitEventName(undefined), (function (param) {
          return RegisterEventHandlerSubmit$WonderEditorCore.handler(partial_arg$1, param);
        }));
  var partial_arg$2 = Utils$WonderEditorCore.buildAPI(undefined);
  EventManager$WonderEditorCore.trigger(DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "registerEventHandler",
        func: (function (param) {
            return RegisterEventHandler$WonderEditorCore.execFunc(partial_arg$2, param);
          }),
        stateValue: {
          x: 0,
          y: 140,
          width: 20,
          height: 10,
          text: "submit"
        }
      });
  var partial_arg$3 = Utils$WonderEditorCore.buildAPI(undefined);
  EventManager$WonderEditorCore.trigger(DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "showAllRegisteredEventHandlers",
        func: (function (param) {
            return ShowAllRegisteredEventHandlers$WonderEditorCore.execFunc(partial_arg$3, param);
          }),
        stateValue: {
          eventHandlerArr: []
        }
      });
  var partial_arg$4 = Utils$WonderEditorCore.buildAPI(undefined);
  return EventManager$WonderEditorCore.trigger(DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
              id: "triggerTest1",
              func: (function (param) {
                  return TriggerTest1$WonderEditorCore.execFunc(partial_arg$4, param);
                }),
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

var _render = (function(renderUIFunc) {
renderUIFunc()

requestAnimationFrame(
  () =>{
_render(renderUIFunc)
  }
)
});

_render(UI$WonderEditorCore.render);

exports._initMiddlewares = _initMiddlewares;
exports._initEngine = _initEngine;
exports._initEditor = _initEditor;
exports.init = init;
exports._render = _render;
/*  Not a pure module */
