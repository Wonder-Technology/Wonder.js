'use strict';

var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var BufferPBRMaterialUtils$WonderComponentWorkerUtils = require("./BufferPBRMaterialUtils.bs.js");

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

exports.getDiffuseColor = getDiffuseColor;
exports.getSpecular = getSpecular;
exports.getSpecularColor = getSpecularColor;
exports.getRoughness = getRoughness;
exports.getMetalness = getMetalness;
exports.getTransmission = getTransmission;
exports.getIOR = getIOR;
/* No side effect */
