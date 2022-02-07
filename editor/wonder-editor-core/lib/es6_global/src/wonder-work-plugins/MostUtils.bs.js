

import * as Most from "most";
import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";

function callFunc(func) {
  var __x = Most.just(func);
  return Most.map((function (func) {
                return Curry._1(func, undefined);
              }), __x);
}

export {
  callFunc ,
  
}
/* most Not a pure module */
