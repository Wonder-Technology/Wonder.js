'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var IORVO$Wonderjs = require("../../value_object/IORVO.bs.js");
var Color3VO$Wonderjs = require("../../value_object/Color3VO.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DiffuseVO$Wonderjs = require("../../value_object/DiffuseVO.bs.js");
var ImageIdVO$Wonderjs = require("../../../../asset/image/value_object/ImageIdVO.bs.js");
var SpecularVO$Wonderjs = require("../../value_object/SpecularVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var MetalnessVO$Wonderjs = require("../../value_object/MetalnessVO.bs.js");
var RoughnessVO$Wonderjs = require("../../value_object/RoughnessVO.bs.js");
var TransmissionVO$Wonderjs = require("../../value_object/TransmissionVO.bs.js");
var SpecularColorVO$Wonderjs = require("../../value_object/SpecularColorVO.bs.js");
var BSDFMaterialEntity$Wonderjs = require("../../entity/BSDFMaterialEntity.bs.js");

function getDiffuseColor(material) {
  return DiffuseVO$Wonderjs.create(Color3VO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getDiffuseColor, BSDFMaterialEntity$Wonderjs.value(material))));
}

function setDiffuseColor(material, color) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setDiffuseColor, BSDFMaterialEntity$Wonderjs.value(material), DiffuseVO$Wonderjs.getPrimitiveValue(color));
}

function getSpecular(material) {
  return SpecularVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getSpecular, BSDFMaterialEntity$Wonderjs.value(material)));
}

function setSpecular(material, specular) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setSpecular, BSDFMaterialEntity$Wonderjs.value(material), SpecularVO$Wonderjs.value(specular));
}

function getSpecularColor(material) {
  return SpecularColorVO$Wonderjs.create(Color3VO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getSpecularColor, BSDFMaterialEntity$Wonderjs.value(material))));
}

function setSpecularColor(material, color) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setSpecularColor, BSDFMaterialEntity$Wonderjs.value(material), SpecularColorVO$Wonderjs.getPrimitiveValue(color));
}

function getRoughness(material) {
  return RoughnessVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getRoughness, BSDFMaterialEntity$Wonderjs.value(material)));
}

function setRoughness(material, roughness) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setRoughness, BSDFMaterialEntity$Wonderjs.value(material), RoughnessVO$Wonderjs.value(roughness));
}

function getMetalness(material) {
  return MetalnessVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getMetalness, BSDFMaterialEntity$Wonderjs.value(material)));
}

function setMetalness(material, metalness) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setMetalness, BSDFMaterialEntity$Wonderjs.value(material), MetalnessVO$Wonderjs.value(metalness));
}

function getTransmission(material) {
  return TransmissionVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getTransmission, BSDFMaterialEntity$Wonderjs.value(material)));
}

function setTransmission(material, transmission) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setTransmission, BSDFMaterialEntity$Wonderjs.value(material), TransmissionVO$Wonderjs.value(transmission));
}

function getIOR(material) {
  return IORVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getIOR, BSDFMaterialEntity$Wonderjs.value(material)));
}

function setIOR(material, ior) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setIOR, BSDFMaterialEntity$Wonderjs.value(material), IORVO$Wonderjs.value(ior));
}

function getDiffuseMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getDiffuseMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function setDiffuseMapImageId(material, id) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setDiffuseMapImageId, BSDFMaterialEntity$Wonderjs.value(material), ImageIdVO$Wonderjs.value(id));
}

function getChannelRoughnessMetallicMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getChannelRoughnessMetallicMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function setChannelRoughnessMetallicMapImageId(material, id) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setChannelRoughnessMetallicMapImageId, BSDFMaterialEntity$Wonderjs.value(material), ImageIdVO$Wonderjs.value(id));
}

function getEmissionMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getEmissionMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function setEmissionMapImageId(material, id) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setEmissionMapImageId, BSDFMaterialEntity$Wonderjs.value(material), ImageIdVO$Wonderjs.value(id));
}

function getNormalMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getNormalMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function setNormalMapImageId(material, id) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setNormalMapImageId, BSDFMaterialEntity$Wonderjs.value(material), ImageIdVO$Wonderjs.value(id));
}

function getTransmissionMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getTransmissionMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function setTransmissionMapImageId(material, id) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setTransmissionMapImageId, BSDFMaterialEntity$Wonderjs.value(material), ImageIdVO$Wonderjs.value(id));
}

function getSpecularMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getSpecularMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function setSpecularMapImageId(material, id) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).setSpecularMapImageId, BSDFMaterialEntity$Wonderjs.value(material), ImageIdVO$Wonderjs.value(id));
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
exports.getDiffuseMapImageId = getDiffuseMapImageId;
exports.setDiffuseMapImageId = setDiffuseMapImageId;
exports.getChannelRoughnessMetallicMapImageId = getChannelRoughnessMetallicMapImageId;
exports.setChannelRoughnessMetallicMapImageId = setChannelRoughnessMetallicMapImageId;
exports.getEmissionMapImageId = getEmissionMapImageId;
exports.setEmissionMapImageId = setEmissionMapImageId;
exports.getNormalMapImageId = getNormalMapImageId;
exports.setNormalMapImageId = setNormalMapImageId;
exports.getTransmissionMapImageId = getTransmissionMapImageId;
exports.setTransmissionMapImageId = setTransmissionMapImageId;
exports.getSpecularMapImageId = getSpecularMapImageId;
exports.setSpecularMapImageId = setSpecularMapImageId;
/* No side effect */
