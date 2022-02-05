'use strict';

var Curry = require("rescript/lib/js/curry.js");
var JsObjTool$WonderEditorCore = require("../JsObjTool.bs.js");

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = Curry._1(match.useSelector, JsObjTool$WonderEditorCore.getObjValue(states, "showAllRegisteredEventHandlers"));
  console.log(match$1.eventHandlerArr);
  
}

exports.execFunc = execFunc;
/* No side effect */
