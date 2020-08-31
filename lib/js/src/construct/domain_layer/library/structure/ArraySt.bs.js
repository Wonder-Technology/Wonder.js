'use strict';

var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

function reduceOneParam(arr, func, param) {
  return Belt_Array.reduceU(arr, param, func);
}

function includes(arr, value) {
  return arr.includes(value);
}

function sliceFrom(arr, index) {
  return arr.slice(index);
}

exports.reduceOneParam = reduceOneParam;
exports.includes = includes;
exports.sliceFrom = sliceFrom;
/* No side effect */
