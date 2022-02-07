

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as JsObjTool$WonderEditorCore from "../JsObjTool.bs.js";
import * as Test1Main$WonderEditorCore from "../wonder-work-plugins/test1/Test1Main.bs.js";
import * as DefaultEventName$WonderEditorCore from "../DefaultEventName.bs.js";

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = api.eventManager;
  var trigger = match$1.trigger;
  var match$2 = Curry._1(match.useSelector, JsObjTool$WonderEditorCore.getObjValue(states, "registerWorkPlugin"));
  return Curry._6(match.drawButton, match$2.x, match$2.y, match$2.width, match$2.height, match$2.text, (function (e) {
                return Curry._2(trigger, DefaultEventName$WonderEditorCore.getRegisterWorkPluginSubmitEventName(undefined), {
                            getData: Test1Main$WonderEditorCore.getData
                          });
              }));
}

export {
  execFunc ,
  
}
/* Test1Main-WonderEditorCore Not a pure module */
