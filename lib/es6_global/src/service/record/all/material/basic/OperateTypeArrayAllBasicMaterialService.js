

import * as TypeArrayService$Wonderjs from "../../../../primitive/buffer/TypeArrayService.js";
import * as BufferAllBasicMaterialService$Wonderjs from "./BufferAllBasicMaterialService.js";

function getColor(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3(BufferAllBasicMaterialService$Wonderjs.getColorIndex(index), typeArr);
}

function setColor(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3(BufferAllBasicMaterialService$Wonderjs.getColorIndex(index), data, typeArr);
}

function _isDepthTest(isDepthTest) {
  return isDepthTest === 0;
}

function getIsDepthTest(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferAllBasicMaterialService$Wonderjs.getIsDepthTestIndex(index), typeArr) === 0;
}

function convertIsDepthTestToVal(isDepthTest) {
  if (isDepthTest) {
    return 0;
  } else {
    return 1;
  }
}

function setIsDepthTest(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferAllBasicMaterialService$Wonderjs.getIsDepthTestIndex(index), data, typeArr);
}

function getAlpha(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat1(BufferAllBasicMaterialService$Wonderjs.getAlphaIndex(index), typeArr);
}

function setAlpha(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat1(BufferAllBasicMaterialService$Wonderjs.getAlphaIndex(index), data, typeArr);
}

export {
  getColor ,
  setColor ,
  _isDepthTest ,
  getIsDepthTest ,
  convertIsDepthTestToVal ,
  setIsDepthTest ,
  getAlpha ,
  setAlpha ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
