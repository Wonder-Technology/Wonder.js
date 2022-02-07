'use strict';

var Most = require("most");
var Curry = require("rescript/lib/js/curry.js");
var UI$WonderEditorCore = require("./UI.bs.js");
var Main$WonderEngineCore = require("wonder-engine-core/lib/js/src/Main.bs.js");
var Utils$WonderEditorCore = require("./Utils.bs.js");
var RootMain$WonderEditorCore = require("./wonder-work-plugins/root/RootMain.bs.js");
var RegisterUI$WonderEditorCore = require("./wonder-uis/RegisterUI.bs.js");
var AddMenuItem$WonderEditorCore = require("./wonder-event-handlers/AddMenuItem.bs.js");
var EventManager$WonderEditorCore = require("./EventManager.bs.js");
var DefaultEventName$WonderEditorCore = require("./DefaultEventName.bs.js");
var Main$WonderGameobjectDataoriented = require("wonder-gameobject-dataoriented/lib/js/src/Main.bs.js");
var MiddlewareManager$WonderEditorCore = require("./MiddlewareManager.bs.js");
var RegisterComponent$WonderEditorCore = require("./wonder-uis/RegisterComponent.bs.js");
var RegisterMiddleware$WonderEditorCore = require("./wonder-uis/RegisterMiddleware.bs.js");
var RegisterWorkPlugin$WonderEditorCore = require("./wonder-uis/RegisterWorkPlugin.bs.js");
var RegisterEventHandler$WonderEditorCore = require("./wonder-uis/RegisterEventHandler.bs.js");
var RegisterComponentSubmit$WonderEditorCore = require("./wonder-event-handlers/RegisterComponentSubmit.bs.js");
var RegisterMiddlewareSubmit$WonderEditorCore = require("./wonder-event-handlers/RegisterMiddlewareSubmit.bs.js");
var RegisterWorkPluginSubmit$WonderEditorCore = require("./wonder-event-handlers/RegisterWorkPluginSubmit.bs.js");
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
  Main$WonderEngineCore.prepare(undefined);
  Main$WonderEngineCore.registerWorkPlugin(RootMain$WonderEditorCore.getData(undefined), undefined, undefined);
  Main$WonderEngineCore.setGameObjectData(Main$WonderGameobjectDataoriented.getData(undefined));
  Main$WonderEngineCore.createAndSetGameObjectState(undefined);
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
  Curry._2(eventManager.onCustomEvent, DefaultEventName$WonderEditorCore.getRegisterWorkPluginSubmitEventName(undefined), (function (param) {
          return RegisterWorkPluginSubmit$WonderEditorCore.handler(partial_arg$3, param);
        }));
  var partial_arg$4 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.onCustomEvent, DefaultEventName$WonderEditorCore.getRegisterComponentSubmitEventName(undefined), (function (param) {
          return RegisterComponentSubmit$WonderEditorCore.handler(partial_arg$4, param);
        }));
  var partial_arg$5 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "registerEventHandler",
        func: (function (param) {
            return RegisterEventHandler$WonderEditorCore.execFunc(partial_arg$5, param);
          }),
        stateValue: {
          x: 0,
          y: 140,
          width: 20,
          height: 10,
          text: "registerEventHandler"
        }
      });
  var partial_arg$6 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "showAllRegisteredEventHandlers",
        func: (function (param) {
            return ShowAllRegisteredEventHandlers$WonderEditorCore.execFunc(partial_arg$6, param);
          }),
        stateValue: {
          eventHandlerArr: []
        }
      });
  var partial_arg$7 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "registerUI",
        func: (function (param) {
            return RegisterUI$WonderEditorCore.execFunc(partial_arg$7, param);
          }),
        stateValue: {
          x: 0,
          y: 240,
          width: 60,
          height: 20,
          text: "registerUI"
        }
      });
  var partial_arg$8 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "registerMiddleware",
        func: (function (param) {
            return RegisterMiddleware$WonderEditorCore.execFunc(partial_arg$8, param);
          }),
        stateValue: {
          x: 300,
          y: 140,
          width: 20,
          height: 10,
          text: "registerMiddleware"
        }
      });
  var partial_arg$9 = Utils$WonderEditorCore.buildAPI(undefined);
  Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
        id: "registerWorkPlugin",
        func: (function (param) {
            return RegisterWorkPlugin$WonderEditorCore.execFunc(partial_arg$9, param);
          }),
        stateValue: {
          x: 600,
          y: 140,
          width: 20,
          height: 10,
          text: "registerWorkPlugin"
        }
      });
  var partial_arg$10 = Utils$WonderEditorCore.buildAPI(undefined);
  return Curry._2(eventManager.trigger, DefaultEventName$WonderEditorCore.getAddMenuItemEventName(undefined), {
              id: "registerComponent",
              func: (function (param) {
                  return RegisterComponent$WonderEditorCore.execFunc(partial_arg$10, param);
                }),
              stateValue: {
                x: 0,
                y: 10,
                width: 20,
                height: 10,
                text: "registerComponent"
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

exports._initMiddlewares = _initMiddlewares;
exports._initEngine = _initEngine;
exports._initEditor = _initEditor;
exports.init = init;
exports._render = _render;
/* __x Not a pure module */
