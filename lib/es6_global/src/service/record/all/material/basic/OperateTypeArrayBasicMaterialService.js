

import * as TypeArrayService$Wonderjs from "../../../../primitive/buffer/TypeArrayService.js";
import * as BufferBasicMaterialService$Wonderjs from "./BufferBasicMaterialService.js";
import * as OperateTypeArrayMaterialService$Wonderjs from "../OperateTypeArrayMaterialService.js";

function getColor(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3(BufferBasicMaterialService$Wonderjs.getColorIndex(index), typeArr);
}

function setColor(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3(BufferBasicMaterialService$Wonderjs.getColorIndex(index), data, typeArr);
}

var setTextureIndex = OperateTypeArrayMaterialService$Wonderjs.setTextureIndex;

function getMapUnit(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferBasicMaterialService$Wonderjs.getMapUnitIndex(index), typeArr);
}

function setMapUnit(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferBasicMaterialService$Wonderjs.getMapUnitIndex(index), data, typeArr);
}

function _isDepthTest(isDepthTest) {
  return isDepthTest === 0;
}

function getIsDepthTest(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferBasicMaterialService$Wonderjs.getIsDepthTestIndex(index), typeArr) === 0;
}

function convertIsDepthTestToVal(isDepthTest) {
  if (isDepthTest) {
    return 0;
  } else {
    return 1;
  }
}

function setIsDepthTest(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferBasicMaterialService$Wonderjs.getIsDepthTestIndex(index), data, typeArr);
}

function getAlpha(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat1(BufferBasicMaterialService$Wonderjs.getAlphaIndex(index), typeArr);
}

function setAlpha(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat1(BufferBasicMaterialService$Wonderjs.getAlphaIndex(index), data, typeArr);
}

var getTextureIndex = OperateTypeArrayMaterialService$Wonderjs.getTextureIndex;

export {
  getColor ,
  setColor ,
  getTextureIndex ,
  setTextureIndex ,
  getMapUnit ,
  setMapUnit ,
  _isDepthTest ,
  getIsDepthTest ,
  convertIsDepthTestToVal ,
  setIsDepthTest ,
  getAlpha ,
  setAlpha ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
