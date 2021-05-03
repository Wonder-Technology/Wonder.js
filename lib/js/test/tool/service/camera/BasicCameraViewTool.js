'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var VMatrixService$Wonderjs = require("../../../../src/service/primitive/VMatrixService.js");
var RecordTransformMainService$Wonderjs = require("../../../../src/service/state/main/transform/RecordTransformMainService.js");
var UpdateTransformMainService$Wonderjs = require("../../../../src/service/state/main/transform/UpdateTransformMainService.js");
var ModelMatrixTransformService$Wonderjs = require("../../../../src/service/record/main/transform/ModelMatrixTransformService.js");

function isBasicCameraView(basicCameraView) {
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* >= */2], Wonder_jest.Expect[/* expect */0](basicCameraView), 0);
}

function getWorldToCameraMatrix(transform, state) {
  var match = RecordTransformMainService$Wonderjs.getRecord(state);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  return VMatrixService$Wonderjs.getWorldToCameraMatrix(ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap));
}

function getPosition(transform, state) {
  return UpdateTransformMainService$Wonderjs.updateAndGetPositionTuple(transform, state[/* globalTempRecord */37], RecordTransformMainService$Wonderjs.getRecord(state));
}

exports.isBasicCameraView = isBasicCameraView;
exports.getWorldToCameraMatrix = getWorldToCameraMatrix;
exports.getPosition = getPosition;
/* Wonder_jest Not a pure module */
