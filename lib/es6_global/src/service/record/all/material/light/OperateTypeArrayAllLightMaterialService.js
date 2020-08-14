

import * as TypeArrayService$Wonderjs from "../../../../primitive/buffer/TypeArrayService.js";
import * as BufferAllLightMaterialService$Wonderjs from "./BufferAllLightMaterialService.js";
import * as OperateTypeArrayAllMaterialService$Wonderjs from "../OperateTypeArrayAllMaterialService.js";

function getDiffuseColor(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3(BufferAllLightMaterialService$Wonderjs.getDiffuseColorIndex(index), typeArr);
}

function setDiffuseColor(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3(BufferAllLightMaterialService$Wonderjs.getDiffuseColorIndex(index), data, typeArr);
}

function getSpecularColor(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3(BufferAllLightMaterialService$Wonderjs.getSpecularColorIndex(index), typeArr);
}

function setSpecularColor(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3(BufferAllLightMaterialService$Wonderjs.getSpecularColorIndex(index), data, typeArr);
}

function getShininess(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat1(BufferAllLightMaterialService$Wonderjs.getShininessIndex(index), typeArr);
}

function setShininess(index, data, typeArr) {
  return TypeArrayService$Wonderjs.setFloat1(BufferAllLightMaterialService$Wonderjs.getShininessIndex(index), data, typeArr);
}

var setTextureIndex = OperateTypeArrayAllMaterialService$Wonderjs.setTextureIndex;

var getTextureIndex = OperateTypeArrayAllMaterialService$Wonderjs.getTextureIndex;

export {
  getDiffuseColor ,
  setDiffuseColor ,
  getSpecularColor ,
  setSpecularColor ,
  getShininess ,
  setShininess ,
  getTextureIndex ,
  setTextureIndex ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
