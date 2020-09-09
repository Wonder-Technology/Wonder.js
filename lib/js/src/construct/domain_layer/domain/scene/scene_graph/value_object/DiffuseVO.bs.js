'use strict';

var Color3VO$Wonderjs = require("./Color3VO.bs.js");

function create(value) {
  return /* Diffuse */{
          _0: value
        };
}

function value(diffuse) {
  return diffuse._0;
}

function getPrimitiveValue(diffuse) {
  return Color3VO$Wonderjs.value(diffuse._0);
}

exports.create = create;
exports.value = value;
exports.getPrimitiveValue = getPrimitiveValue;
/* No side effect */
