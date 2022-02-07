'use strict';

var Curry = require("rescript/lib/js/curry.js");
var JsObjTool$WonderEditorCore = require("../JsObjTool.bs.js");
var Main$WonderComponentTransform = require("wonder-component-transform/lib/js/src/Main.bs.js");
var DefaultEventName$WonderEditorCore = require("../wonder-middlewares/DefaultEventName.bs.js");

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = api.eventManager;
  var trigger = match$1.trigger;
  var match$2 = Curry._1(match.useSelector, JsObjTool$WonderEditorCore.getObjValue(states, "registerComponent"));
  return Curry._6(match.drawButton, match$2.x, match$2.y, match$2.width, match$2.height, match$2.text, (function (e) {
                return Curry._2(trigger, DefaultEventName$WonderEditorCore.getRegisterComponentSubmitEventName(undefined), {
                            getData: Main$WonderComponentTransform.getData
                          });
              }));
}

exports.execFunc = execFunc;
/* No side effect */
