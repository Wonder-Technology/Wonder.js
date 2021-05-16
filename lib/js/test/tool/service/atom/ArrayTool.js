'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ArrayService$Wonderjs = require("../../../../src/service/atom/ArrayService.js");

var _isArraySame = (
   function(arr1, arr2) {
       return arr1 === arr2;
   }
    );

var isArraySame = Curry.__2(_isArraySame);

var range = ArrayService$Wonderjs.range;

exports._isArraySame = _isArraySame;
exports.isArraySame = isArraySame;
exports.range = range;
/* _isArraySame Not a pure module */
