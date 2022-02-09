'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Utils$WonderEditorCore = require("../Utils.bs.js");
var JsObjTool$WonderEditorCore = require("../JsObjTool.bs.js");
var DefaultEventName$WonderEditorCore = require("../wonder-middlewares/DefaultEventName.bs.js");

function execFunc(states, api) {
  var middlewareState = states.middlewareState;
  var match = api.middlewareManager;
  var unsafeGetState = match.unsafeGetState;
  var unsafeGetData = match.unsafeGetData;
  var match$1 = Curry._2(unsafeGetData, middlewareState, "EventManager");
  var trigger = match$1.trigger;
  var eventManagerState = Curry._2(unsafeGetState, middlewareState, "EventManager");
  var match$2 = Curry._2(unsafeGetData, middlewareState, "UI");
  var uiState = Curry._2(unsafeGetState, middlewareState, "UI");
  var match$3 = Curry._1(match$2.useSelector, JsObjTool$WonderEditorCore.getObjValue(uiState.stateMap, "registerEventHandler"));
  var states$1 = {
    middlewareState: middlewareState
  };
  Curry._7(match$2.drawButton, states$1, match$3.x, match$3.y, match$3.width, match$3.height, match$3.text, (function (states, e) {
          return Curry._4(trigger, states, eventManagerState, DefaultEventName$WonderEditorCore.getRegisterEventHandlerSubmitEventName(undefined), {
                      eventName: "wd_event_handler_test1",
                      handlerFunc: Utils$WonderEditorCore.serialize("\n!function(e,t){\"object\"==typeof exports&&\"object\"==typeof module?module.exports=t():\"function\"==typeof define&&define.amd?define(\"EventHandlerTest1\",[],t):\"object\"==typeof exports?exports.EventHandlerTest1=t():e.EventHandlerTest1=t()}(self,(function(){return(()=>{\"use strict\";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})}},t={};function o(e,t,o){return console.log(o),e}return e.r(t),e.d(t,{handler:()=>o}),t})()}));\n          ", "EventHandlerTest1", "handler")
                    });
        }));
  return {
          middlewareState: middlewareState
        };
}

exports.execFunc = execFunc;
/* No side effect */
