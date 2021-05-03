

import * as Most from "most";
import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";

function testStream(testFunc, stream) {
  var valueRef = /* record */[/* contents */-1];
  return Most.forEach((function (value) {
                  valueRef[0] = value;
                  return /* () */0;
                }), stream).then((function (param) {
                return Curry._1(testFunc, valueRef[0]);
              }));
}

export {
  testStream ,
  
}
/* most Not a pure module */
