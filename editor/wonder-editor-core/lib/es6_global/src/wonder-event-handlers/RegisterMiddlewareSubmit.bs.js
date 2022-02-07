

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as MiddlewareManager$WonderEditorCore from "../MiddlewareManager.bs.js";

function handler(api, e) {
  var middlewareName = e.middlewareName;
  MiddlewareManager$WonderEditorCore.register(middlewareName, Curry._1(e.getData, undefined));
  var middlewareTest1 = MiddlewareManager$WonderEditorCore.unsafeGet(middlewareName);
  return Curry._1(middlewareTest1.func1, "middlewareTest1");
}

export {
  handler ,
  
}
/* No side effect */
