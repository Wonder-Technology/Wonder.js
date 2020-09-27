'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Color3VO$Wonderjs = require("../../value_object/Color3VO.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DiffuseVO$Wonderjs = require("../../value_object/DiffuseVO.bs.js");
var ImageIdVO$Wonderjs = require("../../../../asset/image/value_object/ImageIdVO.bs.js");
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

function getDiffuseMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).getDiffuseMapImageId, PBRMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function setDiffuseMapImageId(material, id) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).setDiffuseMapImageId, PBRMaterialEntity$Wonderjs.value(material), ImageIdVO$Wonderjs.value(id));
}

function getChannelRoughnessMetallicMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).getChannelRoughnessMetallicMapImageId, PBRMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function setChannelRoughnessMetallicMapImageId(material, id) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).setChannelRoughnessMetallicMapImageId, PBRMaterialEntity$Wonderjs.value(material), ImageIdVO$Wonderjs.value(id));
}

function getEmissionMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).getEmissionMapImageId, PBRMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function setEmissionMapImageId(material, id) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).setEmissionMapImageId, PBRMaterialEntity$Wonderjs.value(material), ImageIdVO$Wonderjs.value(id));
}

function getNormalMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).getNormalMapImageId, PBRMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function setNormalMapImageId(material, id) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).setNormalMapImageId, PBRMaterialEntity$Wonderjs.value(material), ImageIdVO$Wonderjs.value(id));
}

exports.getDiffuseColor = getDiffuseColor;
exports.setDiffuseColor = setDiffuseColor;
exports.getSpecular = getSpecular;
exports.setSpecular = setSpecular;
exports.getRoughness = getRoughness;
exports.setRoughness = setRoughness;
exports.getMetalness = getMetalness;
exports.setMetalness = setMetalness;
exports.getDiffuseMapImageId = getDiffuseMapImageId;
exports.setDiffuseMapImageId = setDiffuseMapImageId;
exports.getChannelRoughnessMetallicMapImageId = getChannelRoughnessMetallicMapImageId;
exports.setChannelRoughnessMetallicMapImageId = setChannelRoughnessMetallicMapImageId;
exports.getEmissionMapImageId = getEmissionMapImageId;
exports.setEmissionMapImageId = setEmissionMapImageId;
exports.getNormalMapImageId = getNormalMapImageId;
exports.setNormalMapImageId = setNormalMapImageId;
/* No side effect */
