'use strict';

var CPRepo$Wonderjs = require("../../../domain_layer/repo/CPRepo.bs.js");

function getTransformCount(param) {
  return CPRepo$Wonderjs.getPOConfig(undefined).transformCount;
}

exports.getTransformCount = getTransformCount;
/* CPRepo-Wonderjs Not a pure module */
