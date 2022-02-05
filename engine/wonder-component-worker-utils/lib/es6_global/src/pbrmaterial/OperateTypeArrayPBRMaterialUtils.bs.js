

import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as BufferPBRMaterialUtils$WonderComponentWorkerUtils from "./BufferPBRMaterialUtils.bs.js";

function getDiffuseColor(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat3Tuple(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getDiffuseColorIndex(index), typeArr);
}

function getSpecular(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat1(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getSpecularIndex(index), typeArr);
}

function getSpecularColor(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat3Tuple(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getSpecularColorIndex(index), typeArr);
}

function getRoughness(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat1(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getRoughnessIndex(index), typeArr);
}

function getMetalness(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat1(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getMetalnessIndex(index), typeArr);
}

function getTransmission(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat1(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getTransmissionIndex(index), typeArr);
}

function getIOR(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat1(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getIORIndex(index), typeArr);
}

export {
  getDiffuseColor ,
  getSpecular ,
  getSpecularColor ,
  getRoughness ,
  getMetalness ,
  getTransmission ,
  getIOR ,
  
}
/* No side effect */
