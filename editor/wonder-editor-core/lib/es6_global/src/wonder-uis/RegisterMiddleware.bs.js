

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Utils$WonderEditorCore from "../Utils.bs.js";
import * as JsObjTool$WonderEditorCore from "../JsObjTool.bs.js";
import * as DefaultEventName$WonderEditorCore from "../DefaultEventName.bs.js";

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = api.eventManager;
  var trigger = match$1.trigger;
  var match$2 = Curry._1(match.useSelector, JsObjTool$WonderEditorCore.getObjValue(states, "registerMiddleware"));
  return Curry._6(match.drawButton, match$2.x, match$2.y, match$2.width, match$2.height, match$2.text, (function (e) {
                return Curry._2(trigger, DefaultEventName$WonderEditorCore.getRegisterMiddlewareSubmitEventName(undefined), {
                            middlewareName: "wd_middleware_test1",
                            getData: Utils$WonderEditorCore.serialize("\n!function(e,t){\"object\"==typeof exports&&\"object\"==typeof module?module.exports=t():\"function\"==typeof define&&define.amd?define(\"MiddlewareTest1\",[],t):\"object\"==typeof exports?exports.MiddlewareTest1=t():e.MiddlewareTest1=t()}(self,(function(){return(()=>{\"use strict\";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})}},t={};function o(e){return{func1:function(e){console.log(e)}}}return e.r(t),e.d(t,{getData:()=>o}),t})()}));\n", "MiddlewareTest1", "getData")
                          });
              }));
}

export {
  execFunc ,
  
}
/* No side effect */
