

import * as TypeArrayService$Wonderjs from "../buffer/TypeArrayService.js";
import * as BufferSourceInstanceService$Wonderjs from "../../record/main/instance/sourceInstance/BufferSourceInstanceService.js";

function getStatic(param) {
  return 1;
}

function getNotStatic(param) {
  return 0;
}

function getDefault(param) {
  return 1;
}

function markModelMatrixStatic(sourceInstance, isTransformStatics) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferSourceInstanceService$Wonderjs.getIsTransformStaticsIndex(sourceInstance), 1, isTransformStatics);
}

function markModelMatrixNotStatic(sourceInstance, isTransformStatics) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferSourceInstanceService$Wonderjs.getIsTransformStaticsIndex(sourceInstance), 0, isTransformStatics);
}

function setModelMatrixIsStatic(sourceInstance, isStatic, isTransformStatics) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferSourceInstanceService$Wonderjs.getIsTransformStaticsIndex(sourceInstance), isStatic, isTransformStatics);
}

function markModelMatrixIsStatic(sourceInstance, isStatic, isTransformStatics) {
  if (isStatic) {
    return markModelMatrixStatic(sourceInstance, isTransformStatics);
  } else {
    return markModelMatrixNotStatic(sourceInstance, isTransformStatics);
  }
}

function isTransformStatic(sourceInstance, isTransformStatics) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferSourceInstanceService$Wonderjs.getIsTransformStaticsIndex(sourceInstance), isTransformStatics) === 1;
}

export {
  getStatic ,
  getNotStatic ,
  getDefault ,
  markModelMatrixStatic ,
  markModelMatrixNotStatic ,
  setModelMatrixIsStatic ,
  markModelMatrixIsStatic ,
  isTransformStatic ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
