'use strict';

var Caml_obj = require("bs-platform/lib/js/caml_obj.js");

function isUndefined(value) {
  return value === undefined;
}

var isNotEqual = Caml_obj.caml_notequal;

var isEqual = Caml_obj.caml_equal;

var isGreaterThan = Caml_obj.caml_greaterthan;

var isGreaterOrEqualThan = Caml_obj.caml_greaterequal;

function isFunction (func){
    return Object.prototype.toString.call(func).toLowerCase() === "[object function]";
    };

exports.isUndefined = isUndefined;
exports.isNotEqual = isNotEqual;
exports.isEqual = isEqual;
exports.isGreaterThan = isGreaterThan;
exports.isGreaterOrEqualThan = isGreaterOrEqualThan;
exports.isFunction = isFunction;
/* No side effect */
