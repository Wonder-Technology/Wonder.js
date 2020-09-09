'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

function create(value) {
  return /* Indices */{
          _0: value
        };
}

function value(indices) {
  return indices._0;
}

function map(f, indices) {
  return Curry._1(f, indices._0);
}

function length(indices) {
  return indices._0.length;
}

exports.create = create;
exports.value = value;
exports.map = map;
exports.length = length;
/* No side effect */
