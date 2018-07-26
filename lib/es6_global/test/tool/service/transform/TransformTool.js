

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../TestTool.js";
import * as GameObjectTool$Wonderjs from "../gameObject/GameObjectTool.js";
import * as DirtyTransformService$Wonderjs from "../../../../src/service/record/main/transform/DirtyTransformService.js";
import * as BufferTransformService$Wonderjs from "../../../../src/service/record/main/transform/BufferTransformService.js";
import * as RecordTransformMainService$Wonderjs from "../../../../src/service/state/main/transform/RecordTransformMainService.js";
import * as UpdateTransformMainService$Wonderjs from "../../../../src/service/state/main/transform/UpdateTransformMainService.js";
import * as DisposeTransformMainService$Wonderjs from "../../../../src/service/state/main/transform/DisposeTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../src/service/record/main/transform/ModelMatrixTransformService.js";
import * as CreateTypeArrayTransformService$Wonderjs from "../../../../src/service/record/all/transform/CreateTypeArrayTransformService.js";
import * as OperateTypeArrayTransformService$Wonderjs from "../../../../src/service/record/main/transform/OperateTypeArrayTransformService.js";

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

export {
  getRecord ,
  getDefaultPosition ,
  getDefaultRotation ,
  getDefaultScale ,
  isTransform ,
  getLocalToWorldMatrixTypeArray ,
  getLocalToWorldMatrixTypeArrayByVisitTypeArray ,
  update ,
  updateAndGetLocalToWorldMatrixTypeArray ,
  getDefaultLocalToWorldMatrix ,
  getDefaultLocalToWorldMatrixTypeArray ,
  getDefaultLocalPosition ,
  getDefaultLocalRotation ,
  getDefaultLocalScale ,
  getDefaultLocalPositionTuple ,
  getDefaultLocalRotationTuple ,
  getDefaultLocalScaleTuple ,
  getLocalToWorldMatrix ,
  setLocalToWorldMatrix ,
  updateAndGetNormalMatrixTypeArray ,
  dispose ,
  isDisposed ,
  isDirty ,
  getTransformLocalPositionTypeArray ,
  getTransformPositionTypeArray ,
  changeTupleToTypeArray ,
  createBuffer ,
  createTypeArrays ,
  setAllTypeArrDataToDefault ,
  
}
/* Wonder_jest Not a pure module */
