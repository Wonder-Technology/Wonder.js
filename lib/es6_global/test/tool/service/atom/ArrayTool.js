

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$Wonderjs from "../../../../src/service/atom/ArrayService.js";

var _isArraySame = (
   function(arr1, arr2) {
       return arr1 === arr2;
   }
    );

var isArraySame = Curry.__2(_isArraySame);

var range = ArrayService$Wonderjs.range;

export {
  _isArraySame ,
  isArraySame ,
  range ,
  
}
/* _isArraySame Not a pure module */
