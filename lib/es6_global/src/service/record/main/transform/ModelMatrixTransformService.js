

import * as Matrix3Service$Wonderjs from "../../../atom/Matrix3Service.js";
import * as Matrix4Service$Wonderjs from "../../../atom/Matrix4Service.js";
import * as Vector3Service$Wonderjs from "../../../atom/Vector3Service.js";
import * as QuaternionService$Wonderjs from "../../../atom/QuaternionService.js";
import * as AllGlobalTempService$Wonderjs from "../../all/globalTemp/AllGlobalTempService.js";
import * as MutableSparseMapService$Wonderjs from "../../../atom/MutableSparseMapService.js";
import * as HierachyTransformService$Wonderjs from "./HierachyTransformService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as OperateTypeArrayTransformService$Wonderjs from "./OperateTypeArrayTransformService.js";

function getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap) {
  var match = MutableSparseMapService$Wonderjs.fastGet(transform, localToWorldMatrixCacheMap);
  if (match[0]) {
    return match[1];
  } else {
    var matrix = OperateTypeArrayTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices);
    MutableSparseMapService$WonderCommonlib.set(transform, matrix, localToWorldMatrixCacheMap);
    return matrix;
  }
}

function _getNormalMatrixTypeArray(transform, localToWorldMatrices, param, getLocalToWorldMatrixTypeArrayFunc) {
  return Matrix3Service$Wonderjs.transposeSelf(Matrix4Service$Wonderjs.invertTo3x3(getLocalToWorldMatrixTypeArrayFunc(transform, localToWorldMatrices, param[0]), param[1]));
}

function getNormalMatrixTypeArray(transform, localToWorldMatrices, param, globalTempRecord) {
  var normalMatrixCacheMap = param[1];
  var match = MutableSparseMapService$Wonderjs.fastGet(transform, normalMatrixCacheMap);
  if (match[0]) {
    return match[1];
  } else {
    var match$1 = AllGlobalTempService$Wonderjs.popUnUsedFloat9Array(globalTempRecord);
    var matrix = _getNormalMatrixTypeArray(transform, localToWorldMatrices, /* tuple */[
          param[0],
          match$1[1] ? match$1[2] : Matrix3Service$Wonderjs.createIdentityMatrix3(/* () */0)
        ], getLocalToWorldMatrixTypeArray);
    MutableSparseMapService$WonderCommonlib.set(transform, matrix, normalMatrixCacheMap);
    return matrix;
  }
}

var getLocalPositionTuple = OperateTypeArrayTransformService$Wonderjs.getLocalPositionTuple;

function setLocalPositionByTuple(transform, dataTuple, record) {
  var localPositions = record[/* localPositions */3];
  OperateTypeArrayTransformService$Wonderjs.setLocalPositionByTuple(transform, dataTuple, localPositions);
  return HierachyTransformService$Wonderjs.markHierachyDirty(transform, record);
}

function setPositionByTuple(transform, parent, position, param) {
  var record = param[1];
  var localToWorldMatrixCacheMap = record[/* localToWorldMatrixCacheMap */19];
  var localToWorldMatrix = getLocalToWorldMatrixTypeArray(parent, record[/* localToWorldMatrices */2], localToWorldMatrixCacheMap);
  return setLocalPositionByTuple(transform, Vector3Service$Wonderjs.transformMat4Tuple(position, Matrix4Service$Wonderjs.invert(localToWorldMatrix, AllGlobalTempService$Wonderjs.getFloat32Array1(param[0]))), record);
}

var getLocalRotationTuple = OperateTypeArrayTransformService$Wonderjs.getLocalRotationTuple;

function setLocalRotationByTuple(transform, dataTuple, record) {
  var localRotations = record[/* localRotations */4];
  OperateTypeArrayTransformService$Wonderjs.setLocalRotationByTuple(transform, dataTuple, localRotations);
  return HierachyTransformService$Wonderjs.markHierachyDirty(transform, record);
}

function getLocalEulerAnglesTuple(transform, localRotations) {
  return QuaternionService$Wonderjs.getEulerAngles(OperateTypeArrayTransformService$Wonderjs.getLocalRotationTuple(transform, localRotations));
}

function setLocalEulerAnglesByTuple(transform, eulerAngles, record) {
  var localRotations = record[/* localRotations */4];
  OperateTypeArrayTransformService$Wonderjs.setLocalRotationByTuple(transform, QuaternionService$Wonderjs.setFromEulerAngles(eulerAngles), localRotations);
  return HierachyTransformService$Wonderjs.markHierachyDirty(transform, record);
}

var getLocalScaleTuple = OperateTypeArrayTransformService$Wonderjs.getLocalScaleTuple;

function setLocalScaleByTuple(transform, dataTuple, record) {
  var localScales = record[/* localScales */5];
  OperateTypeArrayTransformService$Wonderjs.setLocalScaleByTuple(transform, dataTuple, localScales);
  return HierachyTransformService$Wonderjs.markHierachyDirty(transform, record);
}

function setScaleByTuple(transform, parent, position, param) {
  var record = param[1];
  var localToWorldMatrixCacheMap = record[/* localToWorldMatrixCacheMap */19];
  var localToWorldMatrix = getLocalToWorldMatrixTypeArray(parent, record[/* localToWorldMatrices */2], localToWorldMatrixCacheMap);
  return setLocalScaleByTuple(transform, Vector3Service$Wonderjs.transformMat4Tuple(position, Matrix4Service$Wonderjs.invert(localToWorldMatrix, AllGlobalTempService$Wonderjs.getFloat32Array1(param[0]))), record);
}

export {
  getLocalToWorldMatrixTypeArray ,
  _getNormalMatrixTypeArray ,
  getNormalMatrixTypeArray ,
  getLocalPositionTuple ,
  setLocalPositionByTuple ,
  setPositionByTuple ,
  getLocalRotationTuple ,
  setLocalRotationByTuple ,
  getLocalEulerAnglesTuple ,
  setLocalEulerAnglesByTuple ,
  getLocalScaleTuple ,
  setLocalScaleByTuple ,
  setScaleByTuple ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
