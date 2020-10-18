'use strict';

var TypeArrayCPRepoUtils$Wonderjs = require("./TypeArrayCPRepoUtils.bs.js");
var BufferBSDFMaterialCPRepoUtils$Wonderjs = require("../../../../../../domain_layer/repo/scene/component/bsdf_material/utils/BufferBSDFMaterialCPRepoUtils.bs.js");

function getDiffuseColor(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat3Tuple(BufferBSDFMaterialCPRepoUtils$Wonderjs.getDiffuseColorIndex(index), typeArr);
}

function setDiffuseColor(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat3(BufferBSDFMaterialCPRepoUtils$Wonderjs.getDiffuseColorIndex(index), data, typeArr);
}

function getSpecular(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat1(BufferBSDFMaterialCPRepoUtils$Wonderjs.getSpecularIndex(index), typeArr);
}

function setSpecular(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat1(BufferBSDFMaterialCPRepoUtils$Wonderjs.getSpecularIndex(index), data, typeArr);
}

function getSpecularColor(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat3Tuple(BufferBSDFMaterialCPRepoUtils$Wonderjs.getSpecularColorIndex(index), typeArr);
}

function setSpecularColor(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat3(BufferBSDFMaterialCPRepoUtils$Wonderjs.getSpecularColorIndex(index), data, typeArr);
}

function getRoughness(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat1(BufferBSDFMaterialCPRepoUtils$Wonderjs.getRoughnessIndex(index), typeArr);
}

function setRoughness(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat1(BufferBSDFMaterialCPRepoUtils$Wonderjs.getRoughnessIndex(index), data, typeArr);
}

function getMetalness(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat1(BufferBSDFMaterialCPRepoUtils$Wonderjs.getMetalnessIndex(index), typeArr);
}

function setMetalness(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat1(BufferBSDFMaterialCPRepoUtils$Wonderjs.getMetalnessIndex(index), data, typeArr);
}

function getTransmission(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat1(BufferBSDFMaterialCPRepoUtils$Wonderjs.getTransmissionIndex(index), typeArr);
}

function setTransmission(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat1(BufferBSDFMaterialCPRepoUtils$Wonderjs.getTransmissionIndex(index), data, typeArr);
}

function getIOR(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat1(BufferBSDFMaterialCPRepoUtils$Wonderjs.getIORIndex(index), typeArr);
}

function setIOR(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat1(BufferBSDFMaterialCPRepoUtils$Wonderjs.getIORIndex(index), data, typeArr);
}

exports.getDiffuseColor = getDiffuseColor;
exports.setDiffuseColor = setDiffuseColor;
exports.getSpecular = getSpecular;
exports.setSpecular = setSpecular;
exports.getSpecularColor = getSpecularColor;
exports.setSpecularColor = setSpecularColor;
exports.getRoughness = getRoughness;
exports.setRoughness = setRoughness;
exports.getMetalness = getMetalness;
exports.setMetalness = setMetalness;
exports.getTransmission = getTransmission;
exports.setTransmission = setTransmission;
exports.getIOR = getIOR;
exports.setIOR = setIOR;
/* No side effect */
