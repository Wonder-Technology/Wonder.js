'use strict';

var Color4VO$Wonderjs = require("./Color4VO.bs.js");

function create(value) {
  return /* Diffuse */{
          _0: value
        };
}

function value(color) {
  return color._0;
}

function getPrimitiveValue(color) {
  return Color4VO$Wonderjs.value(color._0);
}

exports.create = create;
exports.value = value;
exports.getPrimitiveValue = getPrimitiveValue;
/* No side effect */
