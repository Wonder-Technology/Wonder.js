

import * as Matrix3$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Matrix3.bs.js";
import * as Matrix4$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as Vector3$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Vector3.bs.js";
import * as Quaternion$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Quaternion.bs.js";
import * as ConfigUtils$WonderComponentTransform from "../config/ConfigUtils.bs.js";
import * as HierachyTransformUtils$WonderComponentTransform from "./HierachyTransformUtils.bs.js";
import * as ModelMatrixTransformUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/transform/ModelMatrixTransformUtils.bs.js";
import * as OperateTypeArrayTransformUtils$WonderComponentTransform from "../utils/OperateTypeArrayTransformUtils.bs.js";

function getLocalPosition(localPositions, transform) {
  return OperateTypeArrayTransformUtils$WonderComponentTransform.getLocalPositionTuple(transform, localPositions);
}

function setLocalPosition(state, transform, localPosition) {
  OperateTypeArrayTransformUtils$WonderComponentTransform.setLocalPosition(transform, localPosition, state.localPositions);
  return HierachyTransformUtils$WonderComponentTransform.markHierachyDirty(state, transform);
}

function setPosition(state, transform, parent, position) {
  return setLocalPosition(state, transform, Vector3$WonderCommonlib.transformMat4Tuple(position, Matrix4$WonderCommonlib.invert(ConfigUtils$WonderComponentTransform.getFloat32Array1(state), ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, parent))));
}

function getLocalRotation(localRotations, transform) {
  return OperateTypeArrayTransformUtils$WonderComponentTransform.getLocalRotationTuple(transform, localRotations);
}

function setLocalRotation(state, transform, localRotation) {
  OperateTypeArrayTransformUtils$WonderComponentTransform.setLocalRotation(transform, localRotation, state.localRotations);
  return HierachyTransformUtils$WonderComponentTransform.markHierachyDirty(state, transform);
}

function getLocalScale(localScales, transform) {
  return OperateTypeArrayTransformUtils$WonderComponentTransform.getLocalScaleTuple(transform, localScales);
}

function setLocalScale(state, transform, localScale) {
  OperateTypeArrayTransformUtils$WonderComponentTransform.setLocalScale(transform, localScale, state.localScales);
  return HierachyTransformUtils$WonderComponentTransform.markHierachyDirty(state, transform);
}

function setScale(state, transform, parent, scale) {
  return setLocalScale(state, transform, Vector3$WonderCommonlib.transformMat4Tuple(scale, Matrix4$WonderCommonlib.invert(ConfigUtils$WonderComponentTransform.getFloat32Array1(state), ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, parent))));
}

function getLocalEulerAngles(localRotations, transform) {
  return Quaternion$WonderCommonlib.getEulerAngles(OperateTypeArrayTransformUtils$WonderComponentTransform.getLocalRotationTuple(transform, localRotations));
}

function setLocalEulerAngles(state, transform, localEulerAngles) {
  return setLocalRotation(state, transform, Quaternion$WonderCommonlib.setFromEulerAngles(localEulerAngles));
}

function getNormalMatrix(state, transform) {
  return Matrix3$WonderCommonlib.transposeSelf(Matrix4$WonderCommonlib.invertTo3x3(ConfigUtils$WonderComponentTransform.getFloat9Array1(state), ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, transform)));
}

export {
  getLocalPosition ,
  setLocalPosition ,
  setPosition ,
  getLocalRotation ,
  setLocalRotation ,
  getLocalScale ,
  setLocalScale ,
  setScale ,
  getLocalEulerAngles ,
  setLocalEulerAngles ,
  getNormalMatrix ,
  
}
/* No side effect */
