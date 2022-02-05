

import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as BufferPBRMaterialUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/pbrmaterial/BufferPBRMaterialUtils.bs.js";

function setDiffuseColor(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat3(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getDiffuseColorIndex(index), data, typeArr);
}

function setSpecular(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat1(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getSpecularIndex(index), data, typeArr);
}

function setSpecularColor(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat3(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getSpecularColorIndex(index), data, typeArr);
}

function setRoughness(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat1(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getRoughnessIndex(index), data, typeArr);
}

function setMetalness(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat1(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getMetalnessIndex(index), data, typeArr);
}

function setTransmission(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat1(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getTransmissionIndex(index), data, typeArr);
}

function setIOR(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat1(BufferPBRMaterialUtils$WonderComponentWorkerUtils.getIORIndex(index), data, typeArr);
}

export {
  setDiffuseColor ,
  setSpecular ,
  setSpecularColor ,
  setRoughness ,
  setMetalness ,
  setTransmission ,
  setIOR ,
  
}
/* No side effect */
