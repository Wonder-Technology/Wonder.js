

import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as BufferTransformUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/transform/BufferTransformUtils.bs.js";

function setLocalToWorldMatrix(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat16(BufferTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrixIndex(index), data, typeArr);
}

function getLocalPositionTuple(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat3Tuple(BufferTransformUtils$WonderComponentWorkerUtils.getLocalPositionIndex(index), typeArr);
}

function setLocalPosition(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat3(BufferTransformUtils$WonderComponentWorkerUtils.getLocalPositionIndex(index), data, typeArr);
}

function getLocalRotationTuple(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat4Tuple(BufferTransformUtils$WonderComponentWorkerUtils.getLocalRotationIndex(index), typeArr);
}

function setLocalRotation(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat4(BufferTransformUtils$WonderComponentWorkerUtils.getLocalRotationIndex(index), data, typeArr);
}

function getLocalScaleTuple(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat3Tuple(BufferTransformUtils$WonderComponentWorkerUtils.getLocalScaleIndex(index), typeArr);
}

function setLocalScale(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat3(BufferTransformUtils$WonderComponentWorkerUtils.getLocalScaleIndex(index), data, typeArr);
}

export {
  setLocalToWorldMatrix ,
  getLocalPositionTuple ,
  setLocalPosition ,
  getLocalRotationTuple ,
  setLocalRotation ,
  getLocalScaleTuple ,
  setLocalScale ,
  
}
/* No side effect */
