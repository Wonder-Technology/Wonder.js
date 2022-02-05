'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Test1$WonderEditorCore = require("../wonder-event-handlers/Test1.bs.js");
var JsObjTool$WonderEditorCore = require("../JsObjTool.bs.js");
var DefaultEventName$WonderEditorCore = require("../DefaultEventName.bs.js");

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = api.eventManager;
  var trigger = match$1.trigger;
  var match$2 = Curry._1(match.useSelector, JsObjTool$WonderEditorCore.getObjValue(states, "registerEventHandler"));
  return Curry._5(match.drawButton, match$2.x, match$2.y, match$2.width, match$2.height, (function (e) {
                return Curry._2(trigger, DefaultEventName$WonderEditorCore.getRegisterEventHandlerSubmitEventName(undefined), {
                            eventName: "wd_event_handler_test1",
                            handlerFunc: Test1$WonderEditorCore.handler
                          });
              }));
}

exports.execFunc = execFunc;
/* No side effect */
