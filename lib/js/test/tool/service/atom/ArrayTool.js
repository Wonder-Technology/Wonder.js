'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

var _isArraySame = (
   function(arr1, arr2) {
       return arr1 === arr2;
   }
    );

var isArraySame = Curry.__2(_isArraySame);

exports._isArraySame = _isArraySame;
exports.isArraySame = isArraySame;
/* _isArraySame Not a pure module */
