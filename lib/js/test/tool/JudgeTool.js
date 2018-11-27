'use strict';

var Caml_obj = require("bs-platform/lib/js/caml_obj.js");

function isUndefined(value) {
  return value === undefined;
}

var isNotEqual = Caml_obj.caml_notequal;

exports.isUndefined = isUndefined;
exports.isNotEqual = isNotEqual;
/* No side effect */
