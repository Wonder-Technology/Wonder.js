

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as JsObjTool$WonderEditorCore from "../JsObjTool.bs.js";

function execFunc(api, states) {
  var match = api.ui;
  var match$1 = Curry._1(match.useSelector, JsObjTool$WonderEditorCore.getObjValue(states, "showAllRegisteredEventHandlers"));
  console.log(match$1.eventHandlerArr);
  
}

export {
  execFunc ,
  
}
/* No side effect */
