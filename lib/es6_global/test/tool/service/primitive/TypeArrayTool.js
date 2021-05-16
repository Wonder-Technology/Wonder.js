

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";

var _convertStringToFloat = (
    function(str){
        return Number(str)
    }
    );

function truncateFloatValue(count, value) {
  var res = value.toFixed(count);
  return Curry._1(_convertStringToFloat, String(Number(res)));
}

function truncateArray(arr) {
  return arr.map((function (item) {
                return truncateFloatValue(5, item);
              }));
}

export {
  _convertStringToFloat ,
  truncateFloatValue ,
  truncateArray ,
  
}
/* _convertStringToFloat Not a pure module */
