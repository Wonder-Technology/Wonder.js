

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferTransformService$Wonderjs from "./BufferTransformService.js";

function getLocalToWorldMatrixTypeArray(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat16TypeArray(BufferTransformService$Wonderjs.getLocalToWorldMatrixIndex(index), typeArr);
}

function getLocalToWorldMatrix(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat16(BufferTransformService$Wonderjs.getLocalToWorldMatrixIndex(index), typeArr);
}

function setLocalToWorldMatrix(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat16(BufferTransformService$Wonderjs.getLocalToWorldMatrixIndex(index), data, typeArr);
}

function getLocalPositionTuple(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3Tuple(BufferTransformService$Wonderjs.getLocalPositionIndex(index), typeArr);
}

function getLocalPositionTypeArray(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3TypeArray(BufferTransformService$Wonderjs.getLocalPositionIndex(index), typeArr);
}

function setLocalPosition(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3(BufferTransformService$Wonderjs.getLocalPositionIndex(index), data, typeArr);
}

function setLocalPositionByTuple(index, dataTuple, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3ByTuple(BufferTransformService$Wonderjs.getLocalPositionIndex(index), dataTuple, typeArr);
}

function getLocalRotationTuple(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat4Tuple(BufferTransformService$Wonderjs.getLocalRotationIndex(index), typeArr);
}

function getLocalRotationTypeArray(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat4TypeArray(BufferTransformService$Wonderjs.getLocalRotationIndex(index), typeArr);
}

function setLocalRotation(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat4(BufferTransformService$Wonderjs.getLocalRotationIndex(index), data, typeArr);
}

function setLocalRotationByTuple(index, dataTuple, typeArr) {
  return TypeArrayService$Wonderjs.setFloat4ByTuple(BufferTransformService$Wonderjs.getLocalRotationIndex(index), dataTuple, typeArr);
}

function getLocalScaleTuple(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3Tuple(BufferTransformService$Wonderjs.getLocalScaleIndex(index), typeArr);
}

function getLocalScaleTypeArray(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3TypeArray(BufferTransformService$Wonderjs.getLocalScaleIndex(index), typeArr);
}

function setLocalScale(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3(BufferTransformService$Wonderjs.getLocalScaleIndex(index), data, typeArr);
}

function setLocalScaleByTuple(index, dataTuple, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3ByTuple(BufferTransformService$Wonderjs.getLocalScaleIndex(index), dataTuple, typeArr);
}

export {
  getLocalToWorldMatrixTypeArray ,
  getLocalToWorldMatrix ,
  setLocalToWorldMatrix ,
  getLocalPositionTuple ,
  getLocalPositionTypeArray ,
  setLocalPosition ,
  setLocalPositionByTuple ,
  getLocalRotationTuple ,
  getLocalRotationTypeArray ,
  setLocalRotation ,
  setLocalRotationByTuple ,
  getLocalScaleTuple ,
  getLocalScaleTypeArray ,
  setLocalScale ,
  setLocalScaleByTuple ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
