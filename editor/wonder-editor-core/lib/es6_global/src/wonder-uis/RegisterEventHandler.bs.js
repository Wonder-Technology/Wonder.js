

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Utils$WonderEditorCore from "../Utils.bs.js";
import * as JsObjTool$WonderEditorCore from "../JsObjTool.bs.js";
import * as DefaultEventName$WonderEditorCore from "../wonder-middlewares/DefaultEventName.bs.js";

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = api.eventManager;
  var trigger = match$1.trigger;
  var match$2 = Curry._1(match.useSelector, JsObjTool$WonderEditorCore.getObjValue(states, "registerEventHandler"));
  return Curry._6(match.drawButton, match$2.x, match$2.y, match$2.width, match$2.height, match$2.text, (function (e) {
                return Curry._2(trigger, DefaultEventName$WonderEditorCore.getRegisterEventHandlerSubmitEventName(undefined), {
                            eventName: "wd_event_handler_test1",
                            handlerFunc: Curry._1(Utils$WonderEditorCore.serialize("\n          !function(e,t){\"object\"==typeof exports&&\"object\"==typeof module?module.exports=t():\"function\"==typeof define&&define.amd?define(\"EventHandlerTest1\",[],t):\"object\"==typeof exports?exports.EventHandlerTest1=t():e.EventHandlerTest1=t()}(self,(function(){return(()=>{\"use strict\";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})}},t={};function o(e,t){console.log(t)}return e.r(t),e.d(t,{handler:()=>o}),t})()}));\n          ", "EventHandlerTest1", "handler"), Utils$WonderEditorCore.buildAPI(undefined))
                          });
              }));
}

export {
  execFunc ,
  
}
/* No side effect */
