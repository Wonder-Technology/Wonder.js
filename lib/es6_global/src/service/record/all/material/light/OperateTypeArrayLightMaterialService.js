

import * as TypeArrayService$Wonderjs from "../../../../primitive/buffer/TypeArrayService.js";
import * as BufferLightMaterialService$Wonderjs from "./BufferLightMaterialService.js";
import * as OperateTypeArrayMaterialService$Wonderjs from "../OperateTypeArrayMaterialService.js";

function getDiffuseColor(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3(BufferLightMaterialService$Wonderjs.getDiffuseColorIndex(index), typeArr);
}

function setDiffuseColor(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3(BufferLightMaterialService$Wonderjs.getDiffuseColorIndex(index), data, typeArr);
}

function getSpecularColor(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3(BufferLightMaterialService$Wonderjs.getSpecularColorIndex(index), typeArr);
}

function setSpecularColor(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3(BufferLightMaterialService$Wonderjs.getSpecularColorIndex(index), data, typeArr);
}

function getShininess(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat1(BufferLightMaterialService$Wonderjs.getShininessIndex(index), typeArr);
}

function setShininess(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat1(BufferLightMaterialService$Wonderjs.getShininessIndex(index), data, typeArr);
}

var setTextureIndex = OperateTypeArrayMaterialService$Wonderjs.setTextureIndex;

function getDiffuseMapUnit(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferLightMaterialService$Wonderjs.getDiffuseMapUnitIndex(index), typeArr);
}

function setDiffuseMapUnit(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferLightMaterialService$Wonderjs.getDiffuseMapUnitIndex(index), data, typeArr);
}

function getSpecularMapUnit(index, typeArr) {
  return TypeArrayService$Wonderjs.getUint8_1(BufferLightMaterialService$Wonderjs.getSpecularMapUnitIndex(index), typeArr);
}

function setSpecularMapUnit(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setUint8_1(BufferLightMaterialService$Wonderjs.getSpecularMapUnitIndex(index), data, typeArr);
}

var getTextureIndex = OperateTypeArrayMaterialService$Wonderjs.getTextureIndex;

export {
  getDiffuseColor ,
  setDiffuseColor ,
  getSpecularColor ,
  setSpecularColor ,
  getShininess ,
  setShininess ,
  getTextureIndex ,
  setTextureIndex ,
  getDiffuseMapUnit ,
  setDiffuseMapUnit ,
  getSpecularMapUnit ,
  setSpecularMapUnit ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
