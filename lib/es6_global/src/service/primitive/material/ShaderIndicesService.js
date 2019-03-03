

import * as TypeArrayService$Wonderjs from "../buffer/TypeArrayService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../buffer/DefaultTypeArrayValueService.js";

function getShaderIndicesSize(param) {
  return 1;
}

function getShaderIndicesLength(count) {
  return (count << 0);
}

function getShaderIndicesOffset(count) {
  return 0;
}

function getShaderIndexIndex(index) {
  return (index << 0);
}

function getShaderIndex(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint32_1((index << 0), typeArr);
}

function setShaderIndex(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint32_1((index << 0), data, typeArr);
}

function hasShaderIndex(materialIndex, shaderIndices) {
  return TypeArrayService$Wonderjs.getUint32_1((materialIndex << 0), shaderIndices) !== DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
}

export {
  getShaderIndicesSize ,
  getShaderIndicesLength ,
  getShaderIndicesOffset ,
  getShaderIndexIndex ,
  getShaderIndex ,
  setShaderIndex ,
  hasShaderIndex ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
