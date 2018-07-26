'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../TestTool.js");
var GameObjectTool$Wonderjs = require("../gameObject/GameObjectTool.js");
var DirtyTransformService$Wonderjs = require("../../../../src/service/record/main/transform/DirtyTransformService.js");
var BufferTransformService$Wonderjs = require("../../../../src/service/record/main/transform/BufferTransformService.js");
var RecordTransformMainService$Wonderjs = require("../../../../src/service/state/main/transform/RecordTransformMainService.js");
var UpdateTransformMainService$Wonderjs = require("../../../../src/service/state/main/transform/UpdateTransformMainService.js");
var DisposeTransformMainService$Wonderjs = require("../../../../src/service/state/main/transform/DisposeTransformMainService.js");
var ModelMatrixTransformService$Wonderjs = require("../../../../src/service/record/main/transform/ModelMatrixTransformService.js");
var CreateTypeArrayTransformService$Wonderjs = require("../../../../src/service/record/all/transform/CreateTypeArrayTransformService.js");
var OperateTypeArrayTransformService$Wonderjs = require("../../../../src/service/record/main/transform/OperateTypeArrayTransformService.js");

var getRecord = RecordTransformMainService$Wonderjs.getRecord;

function getDefaultPosition() {
  return /* tuple */[
          0,
          0,
          0
        ];
}

function getDefaultRotation() {
  return /* tuple */[
          0,
          0,
          0,
          1
        ];
}

function getDefaultScale() {
  return /* tuple */[
          1,
          1,
          1
        ];
}

function isTransform(transform) {
  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* >= */2], Wonder_jest.Expect[/* expect */0](transform), 0);
}

function getLocalToWorldMatrixTypeArray(transform, state) {
  var match = RecordTransformMainService$Wonderjs.getRecord(state);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  return ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap);
}

function getLocalToWorldMatrixTypeArrayByVisitTypeArray(transform, state) {
  var match = RecordTransformMainService$Wonderjs.getRecord(state);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  return OperateTypeArrayTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices);
}

function update(transform, state) {
  UpdateTransformMainService$Wonderjs.update(transform, state[/* globalTempRecord */35], RecordTransformMainService$Wonderjs.getRecord(state));
  return state;
}

function updateAndGetLocalToWorldMatrixTypeArray(transform, state) {
  return UpdateTransformMainService$Wonderjs.updateAndGetLocalToWorldMatrixTypeArray(transform, state[/* globalTempRecord */35], RecordTransformMainService$Wonderjs.getRecord(state));
}

function getDefaultLocalToWorldMatrix(state) {
  return RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalToWorldMatrix */11];
}

function getDefaultLocalToWorldMatrixTypeArray(state) {
  return new Float32Array(RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalToWorldMatrix */11]);
}

function getDefaultLocalPosition(state) {
  return RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalPosition */12];
}

function getDefaultLocalRotation(state) {
  return RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalRotation */13];
}

function getDefaultLocalScale(state) {
  return RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalScale */14];
}

function getDefaultLocalPositionTuple(state) {
  return RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalPosition */12];
}

function getDefaultLocalRotationTuple(state) {
  return RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalRotation */13];
}

function getDefaultLocalScaleTuple(state) {
  return RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalScale */14];
}

function getLocalToWorldMatrix(transform, state) {
  return OperateTypeArrayTransformService$Wonderjs.getLocalToWorldMatrix(transform, RecordTransformMainService$Wonderjs.getRecord(state)[/* localToWorldMatrices */2]);
}

function setLocalToWorldMatrix(transform, data, state) {
  var match = RecordTransformMainService$Wonderjs.getRecord(state);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  OperateTypeArrayTransformService$Wonderjs.setLocalToWorldMatrix(transform, data, localToWorldMatrices);
  return state;
}

function updateAndGetNormalMatrixTypeArray(transform, state) {
  return UpdateTransformMainService$Wonderjs.updateAndGetNormalMatrixTypeArray(transform, state[/* globalTempRecord */35], RecordTransformMainService$Wonderjs.getRecord(state));
}

function dispose(transform, state) {
  TestTool$Wonderjs.closeContractCheck(/* () */0);
  var state$1 = GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(0, transform, false, state);
  TestTool$Wonderjs.openContractCheck(/* () */0);
  return state$1;
}

function isDisposed(transform, state) {
  return !DisposeTransformMainService$Wonderjs.isAlive(transform, RecordTransformMainService$Wonderjs.getRecord(state));
}

function isDirty(transform, state) {
  return DirtyTransformService$Wonderjs.isDirty(transform, RecordTransformMainService$Wonderjs.getRecord(state));
}

function getTransformLocalPositionTypeArray(transform, state) {
  return OperateTypeArrayTransformService$Wonderjs.getLocalPositionTypeArray(transform, RecordTransformMainService$Wonderjs.getRecord(state)[/* localPositions */3]);
}

function getTransformPositionTypeArray(transform, state) {
  return UpdateTransformMainService$Wonderjs.updateAndGetPositionTuple(transform, state[/* globalTempRecord */35], RecordTransformMainService$Wonderjs.getRecord(state));
}

function changeTupleToTypeArray(param) {
  return new Float32Array(/* array */[
              param[0],
              param[1],
              param[2]
            ]);
}

function setAllTypeArrDataToDefault(count, state, param) {
  var match = RecordTransformMainService$Wonderjs._setAllTypeArrDataToDefault(count, /* tuple */[
        RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalToWorldMatrix */11],
        RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalPosition */12],
        RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalRotation */13],
        RecordTransformMainService$Wonderjs.getRecord(state)[/* defaultLocalScale */14]
      ], /* tuple */[
        1,
        param[0],
        param[1],
        param[2],
        param[3]
      ]);
  var match$1 = match[1];
  return /* tuple */[
          match$1[0],
          match$1[1],
          match$1[2],
          match$1[3]
        ];
}

var createBuffer = BufferTransformService$Wonderjs.createBuffer;

var createTypeArrays = CreateTypeArrayTransformService$Wonderjs.createTypeArrays;

exports.getRecord = getRecord;
exports.getDefaultPosition = getDefaultPosition;
exports.getDefaultRotation = getDefaultRotation;
exports.getDefaultScale = getDefaultScale;
exports.isTransform = isTransform;
exports.getLocalToWorldMatrixTypeArray = getLocalToWorldMatrixTypeArray;
exports.getLocalToWorldMatrixTypeArrayByVisitTypeArray = getLocalToWorldMatrixTypeArrayByVisitTypeArray;
exports.update = update;
exports.updateAndGetLocalToWorldMatrixTypeArray = updateAndGetLocalToWorldMatrixTypeArray;
exports.getDefaultLocalToWorldMatrix = getDefaultLocalToWorldMatrix;
exports.getDefaultLocalToWorldMatrixTypeArray = getDefaultLocalToWorldMatrixTypeArray;
exports.getDefaultLocalPosition = getDefaultLocalPosition;
exports.getDefaultLocalRotation = getDefaultLocalRotation;
exports.getDefaultLocalScale = getDefaultLocalScale;
exports.getDefaultLocalPositionTuple = getDefaultLocalPositionTuple;
exports.getDefaultLocalRotationTuple = getDefaultLocalRotationTuple;
exports.getDefaultLocalScaleTuple = getDefaultLocalScaleTuple;
exports.getLocalToWorldMatrix = getLocalToWorldMatrix;
exports.setLocalToWorldMatrix = setLocalToWorldMatrix;
exports.updateAndGetNormalMatrixTypeArray = updateAndGetNormalMatrixTypeArray;
exports.dispose = dispose;
exports.isDisposed = isDisposed;
exports.isDirty = isDirty;
exports.getTransformLocalPositionTypeArray = getTransformLocalPositionTypeArray;
exports.getTransformPositionTypeArray = getTransformPositionTypeArray;
exports.changeTupleToTypeArray = changeTupleToTypeArray;
exports.createBuffer = createBuffer;
exports.createTypeArrays = createTypeArrays;
exports.setAllTypeArrDataToDefault = setAllTypeArrDataToDefault;
/* Wonder_jest Not a pure module */
