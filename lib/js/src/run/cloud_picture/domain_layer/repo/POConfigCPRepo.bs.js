'use strict';

var CPRepo$Wonderjs = require("./CPRepo.bs.js");
var POConfigCPRepoDp$Wonderjs = require("../../infrastructure_layer/dependency/repo/POConfigCPRepoDp.bs.js");

function getTransformCount(param) {
  return POConfigCPRepoDp$Wonderjs.getTransformCount(undefined);
}

function setTransformCount(transformCount) {
  var init = CPRepo$Wonderjs.getPOConfig(undefined);
  return CPRepo$Wonderjs.setPOConfig({
              transformCount: transformCount,
              geometryPointCount: init.geometryPointCount,
              geometryCount: init.geometryCount,
              pbrMaterialCount: init.pbrMaterialCount,
              directionLightCount: init.directionLightCount
            });
}

function getPBRMaterialCount(param) {
  return POConfigCPRepoDp$Wonderjs.getPBRMaterialCount(undefined);
}

function setPBRMaterialCount(pbrMaterialCount) {
  var init = CPRepo$Wonderjs.getPOConfig(undefined);
  return CPRepo$Wonderjs.setPOConfig({
              transformCount: init.transformCount,
              geometryPointCount: init.geometryPointCount,
              geometryCount: init.geometryCount,
              pbrMaterialCount: pbrMaterialCount,
              directionLightCount: init.directionLightCount
            });
}

function getGeometryPointCount(param) {
  return POConfigCPRepoDp$Wonderjs.getGeometryPointCount(undefined);
}

function setGeometryPointCount(geometryPointCount) {
  var init = CPRepo$Wonderjs.getPOConfig(undefined);
  return CPRepo$Wonderjs.setPOConfig({
              transformCount: init.transformCount,
              geometryPointCount: geometryPointCount,
              geometryCount: init.geometryCount,
              pbrMaterialCount: init.pbrMaterialCount,
              directionLightCount: init.directionLightCount
            });
}

function getGeometryCount(param) {
  return POConfigCPRepoDp$Wonderjs.getGeometryCount(undefined);
}

function setGeometryCount(geometryCount) {
  var init = CPRepo$Wonderjs.getPOConfig(undefined);
  return CPRepo$Wonderjs.setPOConfig({
              transformCount: init.transformCount,
              geometryPointCount: init.geometryPointCount,
              geometryCount: geometryCount,
              pbrMaterialCount: init.pbrMaterialCount,
              directionLightCount: init.directionLightCount
            });
}

function getDirectionLightCount(param) {
  return POConfigCPRepoDp$Wonderjs.getDirectionLightCount(undefined);
}

function setDirectionLightCount(directionLightCount) {
  var init = CPRepo$Wonderjs.getPOConfig(undefined);
  return CPRepo$Wonderjs.setPOConfig({
              transformCount: init.transformCount,
              geometryPointCount: init.geometryPointCount,
              geometryCount: init.geometryCount,
              pbrMaterialCount: init.pbrMaterialCount,
              directionLightCount: directionLightCount
            });
}

exports.getTransformCount = getTransformCount;
exports.setTransformCount = setTransformCount;
exports.getPBRMaterialCount = getPBRMaterialCount;
exports.setPBRMaterialCount = setPBRMaterialCount;
exports.getGeometryPointCount = getGeometryPointCount;
exports.setGeometryPointCount = setGeometryPointCount;
exports.getGeometryCount = getGeometryCount;
exports.setGeometryCount = setGeometryCount;
exports.getDirectionLightCount = getDirectionLightCount;
exports.setDirectionLightCount = setDirectionLightCount;
/* CPRepo-Wonderjs Not a pure module */
