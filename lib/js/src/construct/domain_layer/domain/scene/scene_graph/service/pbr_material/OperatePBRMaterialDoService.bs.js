'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Color3VO$Wonderjs = require("../../value_object/Color3VO.bs.js");
var DiffuseVO$Wonderjs = require("../../value_object/DiffuseVO.bs.js");
var SpecularVO$Wonderjs = require("../../value_object/SpecularVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var MetalnessVO$Wonderjs = require("../../value_object/MetalnessVO.bs.js");
var RoughnessVO$Wonderjs = require("../../value_object/RoughnessVO.bs.js");
var PBRMaterialEntity$Wonderjs = require("../../entity/PBRMaterialEntity.bs.js");

function getDiffuseColor(material) {
  return DiffuseVO$Wonderjs.create(Color3VO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).getDiffuseColor, PBRMaterialEntity$Wonderjs.value(material))));
}

function setDiffuseColor(material, diffuse) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).setDiffuseColor, PBRMaterialEntity$Wonderjs.value(material), DiffuseVO$Wonderjs.getPrimitiveValue(diffuse));
}

function getSpecular(material) {
  return SpecularVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).getSpecular, PBRMaterialEntity$Wonderjs.value(material)));
}

function setSpecular(material, specular) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).setSpecular, PBRMaterialEntity$Wonderjs.value(material), SpecularVO$Wonderjs.value(specular));
}

function getRoughness(material) {
  return RoughnessVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).getRoughness, PBRMaterialEntity$Wonderjs.value(material)));
}

function setRoughness(material, roughness) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).setRoughness, PBRMaterialEntity$Wonderjs.value(material), RoughnessVO$Wonderjs.value(roughness));
}

function getMetalness(material) {
  return MetalnessVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).getMetalness, PBRMaterialEntity$Wonderjs.value(material)));
}

function setMetalness(material, metalness) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).setMetalness, PBRMaterialEntity$Wonderjs.value(material), MetalnessVO$Wonderjs.value(metalness));
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
