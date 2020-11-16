'use strict';

var Color3VO$Wonderjs = require("./Color3VO.bs.js");

function create(value) {
  return /* EmissionColor */{
          _0: value
        };
}

function value(color) {
  return color._0;
}

function getPrimitiveValue(color) {
  return Color3VO$Wonderjs.value(color._0);
}

exports.create = create;
exports.value = value;
exports.getPrimitiveValue = getPrimitiveValue;
/* No side effect */
