'use strict';

var DirectorCPApService$Wonderjs = require("../../application_layer/DirectorCPApService.bs.js");

function prepare(pictureSize, sampleCount, transformCountOpt, geometryPointCountOpt, geometryCountOpt, bsdfMaterialCountOpt, directionLightCountOpt, param) {
  var transformCount = transformCountOpt !== undefined ? transformCountOpt : 10000;
  var geometryPointCount = geometryPointCountOpt !== undefined ? geometryPointCountOpt : 10000;
  var geometryCount = geometryCountOpt !== undefined ? geometryCountOpt : 10000;
  var bsdfMaterialCount = bsdfMaterialCountOpt !== undefined ? bsdfMaterialCountOpt : 2000000;
  var directionLightCount = directionLightCountOpt !== undefined ? directionLightCountOpt : 1;
  return DirectorCPApService$Wonderjs.prepare(pictureSize, sampleCount, transformCount, geometryPointCount, geometryCount, bsdfMaterialCount, directionLightCount);
}

function init(param) {
  return DirectorCPApService$Wonderjs.init(undefined);
}

function update(param) {
  return DirectorCPApService$Wonderjs.update(undefined);
}

function render(param) {
  return DirectorCPApService$Wonderjs.render(undefined);
}

exports.prepare = prepare;
exports.init = init;
exports.update = update;
exports.render = render;
/* DirectorCPApService-Wonderjs Not a pure module */
