'use strict';

var TypeArrayCPRepoUtils$Wonderjs = require("../../../../structure/utils/TypeArrayCPRepoUtils.bs.js");
var BufferPBRMaterialCPRepoUtils$Wonderjs = require("./BufferPBRMaterialCPRepoUtils.bs.js");

function getDiffuseColor(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat3Tuple(BufferPBRMaterialCPRepoUtils$Wonderjs.getDiffuseColorIndex(index), typeArr);
}

function setDiffuseColor(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat3(BufferPBRMaterialCPRepoUtils$Wonderjs.getDiffuseColorIndex(index), data, typeArr);
}

function getSpecular(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat1(BufferPBRMaterialCPRepoUtils$Wonderjs.getSpecularIndex(index), typeArr);
}

function setSpecular(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat1(BufferPBRMaterialCPRepoUtils$Wonderjs.getSpecularIndex(index), data, typeArr);
}

function getRoughness(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat1(BufferPBRMaterialCPRepoUtils$Wonderjs.getRoughnessIndex(index), typeArr);
}

function setRoughness(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat1(BufferPBRMaterialCPRepoUtils$Wonderjs.getRoughnessIndex(index), data, typeArr);
}

function getMetalness(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat1(BufferPBRMaterialCPRepoUtils$Wonderjs.getMetalnessIndex(index), typeArr);
}

function setMetalness(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat1(BufferPBRMaterialCPRepoUtils$Wonderjs.getMetalnessIndex(index), data, typeArr);
}

exports.getDiffuseColor = getDiffuseColor;
exports.setDiffuseColor = setDiffuseColor;
exports.getSpecular = getSpecular;
exports.setSpecular = setSpecular;
exports.getRoughness = getRoughness;
exports.setRoughness = setRoughness;
exports.getMetalness = getMetalness;
exports.setMetalness = setMetalness;
/* No side effect */
