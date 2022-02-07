

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as JsObjTool$WonderDemoUiTriggertest1 from "./JsObjTool.bs.js";

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = api.eventManager;
  var trigger = match$1.trigger;
  var match$2 = JsObjTool$WonderDemoUiTriggertest1.getObjValue(states, "triggerTest1");
  return Curry._6(match.drawButton, match$2.x, match$2.y, match$2.width, match$2.height, match$2.text, (function (e) {
                return Curry._2(trigger, "wd_event_handler_test1", {
                            data1: "aaaabbbb"
                          });
              }));
}

function getStateValue(param) {
  return {
          x: 300,
          y: 240,
          width: 20,
          height: 10,
          text: "trigger_test1"
        };
}

export {
  execFunc ,
  getStateValue ,
  
}
/* No side effect */
