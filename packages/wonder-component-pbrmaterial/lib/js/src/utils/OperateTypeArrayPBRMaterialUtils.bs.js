'use strict';

var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var BufferPBRMaterialUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/pbrmaterial/BufferPBRMaterialUtils.bs.js");

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

exports.setDiffuseColor = setDiffuseColor;
exports.setSpecular = setSpecular;
exports.setSpecularColor = setSpecularColor;
exports.setRoughness = setRoughness;
exports.setMetalness = setMetalness;
exports.setTransmission = setTransmission;
exports.setIOR = setIOR;
/* No side effect */
