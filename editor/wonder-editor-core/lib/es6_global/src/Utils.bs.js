

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as MiddlewareManager$WonderEditorCore from "./MiddlewareManager.bs.js";

function buildAPI(param) {
  var eventManager = MiddlewareManager$WonderEditorCore.unsafeGet("EventManager");
  var ui = MiddlewareManager$WonderEditorCore.unsafeGet("UI");
  return {
          ui: Curry._1(ui.buildAPI, undefined),
          eventManager: Curry._1(eventManager.buildAPI, undefined)
        };
}

export {
  buildAPI ,
  
}
/* No side effect */
