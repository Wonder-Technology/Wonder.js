'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

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

exports._convertStringToFloat = _convertStringToFloat;
exports.truncateFloatValue = truncateFloatValue;
exports.truncateArray = truncateArray;
/* _convertStringToFloat Not a pure module */
