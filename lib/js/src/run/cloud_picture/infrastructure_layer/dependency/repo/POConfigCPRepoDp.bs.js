'use strict';

var CPRepo$Wonderjs = require("../../../domain_layer/repo/CPRepo.bs.js");

function getTransformCount(param) {
  return CPRepo$Wonderjs.getPOConfig(undefined).transformCount;
}

function getPBRMaterialCount(param) {
  return CPRepo$Wonderjs.getPOConfig(undefined).pbrMaterialCount;
}

function getGeometryPointCount(param) {
  return CPRepo$Wonderjs.getPOConfig(undefined).geometryPointCount;
}

function getGeometryCount(param) {
  return CPRepo$Wonderjs.getPOConfig(undefined).geometryCount;
}

function getDirectionLightCount(param) {
  return CPRepo$Wonderjs.getPOConfig(undefined).directionLightCount;
}

exports.getTransformCount = getTransformCount;
exports.getPBRMaterialCount = getPBRMaterialCount;
exports.getGeometryPointCount = getGeometryPointCount;
exports.getGeometryCount = getGeometryCount;
exports.getDirectionLightCount = getDirectionLightCount;
/* CPRepo-Wonderjs Not a pure module */
