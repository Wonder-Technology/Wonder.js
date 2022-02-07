'use strict';

var Curry = require("rescript/lib/js/curry.js");
var JsObjTool$WonderEditorCore = require("../JsObjTool.bs.js");
var MiddlewareTest1$WonderEditorCore = require("../wonder-middlewares/MiddlewareTest1.bs.js");
var DefaultEventName$WonderEditorCore = require("../DefaultEventName.bs.js");

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = api.eventManager;
  var trigger = match$1.trigger;
  var match$2 = Curry._1(match.useSelector, JsObjTool$WonderEditorCore.getObjValue(states, "registerMiddleware"));
  return Curry._6(match.drawButton, match$2.x, match$2.y, match$2.width, match$2.height, match$2.text, (function (e) {
                return Curry._2(trigger, DefaultEventName$WonderEditorCore.getRegisterMiddlewareSubmitEventName(undefined), {
                            middlewareName: "wd_middleware_test1",
                            getData: MiddlewareTest1$WonderEditorCore.getData
                          });
              }));
}

exports.execFunc = execFunc;
/* No side effect */
