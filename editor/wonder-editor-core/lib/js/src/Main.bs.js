'use strict';

var Curry = require("rescript/lib/js/curry.js");
var UI$WonderEditorCore = require("./UI.bs.js");
var Utils$WonderEditorCore = require("./Utils.bs.js");
var RegisterUI$WonderEditorCore = require("./wonder-uis/RegisterUI.bs.js");
var AddMenuItem$WonderEditorCore = require("./wonder-event-handlers/AddMenuItem.bs.js");
var EventManager$WonderEditorCore = require("./EventManager.bs.js");
var DefaultEventName$WonderEditorCore = require("./DefaultEventName.bs.js");
var MiddlewareManager$WonderEditorCore = require("./MiddlewareManager.bs.js");
var RegisterMiddleware$WonderEditorCore = require("./wonder-uis/RegisterMiddleware.bs.js");
var RegisterEventHandler$WonderEditorCore = require("./wonder-uis/RegisterEventHandler.bs.js");
var RegisterMiddlewareSubmit$WonderEditorCore = require("./wonder-event-handlers/RegisterMiddlewareSubmit.bs.js");
var RegisterEventHandlerSubmit$WonderEditorCore = require("./wonder-event-handlers/RegisterEventHandlerSubmit.bs.js");
var ShowAllRegisteredEventHandlers$WonderEditorCore = require("./wonder-uis/ShowAllRegisteredEventHandlers.bs.js");

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

exports._initMiddlewares = _initMiddlewares;
exports._initEngine = _initEngine;
exports._initEditor = _initEditor;
exports.init = init;
exports._render = _render;
exports.ui = ui;
/*  Not a pure module */
