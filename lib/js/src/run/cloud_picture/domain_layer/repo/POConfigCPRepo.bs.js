'use strict';

var CPRepo$Wonderjs = require("./CPRepo.bs.js");
var POConfigCPRepoDp$Wonderjs = require("../../infrastructure_layer/dependency/repo/POConfigCPRepoDp.bs.js");

function getTransformCount(param) {
  return POConfigCPRepoDp$Wonderjs.getTransformCount(undefined);
}

function setTransformCount(transformCount) {
  return CPRepo$Wonderjs.setPOConfig({
              transformCount: transformCount
            });
}

exports.getTransformCount = getTransformCount;
exports.setTransformCount = setTransformCount;
/* CPRepo-Wonderjs Not a pure module */
