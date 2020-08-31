'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

function map(param, func) {
  return [
          Curry._1(func, param[0]),
          Curry._1(func, param[1]),
          Curry._1(func, param[2])
        ];
}

exports.map = map;
/* No side effect */
