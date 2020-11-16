'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var IORVO$Wonderjs = require("../../value_object/IORVO.bs.js");
var Tuple2$Wonderjs = require("../../../../../library/structure/tuple/Tuple2.bs.js");
var WrapVO$Wonderjs = require("../../value_object/WrapVO.bs.js");
var Color3VO$Wonderjs = require("../../value_object/Color3VO.bs.js");
var Color4VO$Wonderjs = require("../../value_object/Color4VO.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DiffuseVO$Wonderjs = require("../../value_object/DiffuseVO.bs.js");
var ImageIdVO$Wonderjs = require("../../../../asset/image/value_object/ImageIdVO.bs.js");
var SpecularVO$Wonderjs = require("../../value_object/SpecularVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var MetalnessVO$Wonderjs = require("../../value_object/MetalnessVO.bs.js");
var RoughnessVO$Wonderjs = require("../../value_object/RoughnessVO.bs.js");
var AlphaCutoffVO$Wonderjs = require("../../value_object/AlphaCutoffVO.bs.js");
var TransmissionVO$Wonderjs = require("../../value_object/TransmissionVO.bs.js");
var EmissionColorVO$Wonderjs = require("../../value_object/EmissionColorVO.bs.js");
var SpecularColorVO$Wonderjs = require("../../value_object/SpecularColorVO.bs.js");
var BSDFMaterialEntity$Wonderjs = require("../../entity/BSDFMaterialEntity.bs.js");

function getDiffuseColor(material) {
  return DiffuseVO$Wonderjs.create(Color4VO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getDiffuseColor, BSDFMaterialEntity$Wonderjs.value(material))));
}

function getEmissionColor(material) {
  return EmissionColorVO$Wonderjs.create(Color3VO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getEmissionColor, BSDFMaterialEntity$Wonderjs.value(material))));
}

function getSpecular(material) {
  return SpecularVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getSpecular, BSDFMaterialEntity$Wonderjs.value(material)));
}

function getSpecularColor(material) {
  return SpecularColorVO$Wonderjs.create(Color3VO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getSpecularColor, BSDFMaterialEntity$Wonderjs.value(material))));
}

function getRoughness(material) {
  return RoughnessVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getRoughness, BSDFMaterialEntity$Wonderjs.value(material)));
}

function getMetalness(material) {
  return MetalnessVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getMetalness, BSDFMaterialEntity$Wonderjs.value(material)));
}

function getTransmission(material) {
  return TransmissionVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getTransmission, BSDFMaterialEntity$Wonderjs.value(material)));
}

function getIOR(material) {
  return IORVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getIOR, BSDFMaterialEntity$Wonderjs.value(material)));
}

function getDiffuseMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getDiffuseMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function getChannelRoughnessMetallicMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getChannelRoughnessMetallicMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function getEmissionMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getEmissionMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function getNormalMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getNormalMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function getTransmissionMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getTransmissionMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function getSpecularMapImageId(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getSpecularMapImageId, BSDFMaterialEntity$Wonderjs.value(material)), ImageIdVO$Wonderjs.create);
}

function getAlphaCutoff(material) {
  return AlphaCutoffVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getAlphaCutoff, BSDFMaterialEntity$Wonderjs.value(material)));
}

function isSame(material1, material2) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).isSame, BSDFMaterialEntity$Wonderjs.value(material1), BSDFMaterialEntity$Wonderjs.value(material2));
}

function getId(material) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getId, BSDFMaterialEntity$Wonderjs.value(material));
}

function getDiffuseMapImageWrapData(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getDiffuseMapImageWrapData, BSDFMaterialEntity$Wonderjs.value(material)), (function (param) {
                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.create, param);
              }));
}

function getChannelRoughnessMetallicMapImageWrapData(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getChannelRoughnessMetallicMapImageWrapData, BSDFMaterialEntity$Wonderjs.value(material)), (function (param) {
                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.create, param);
              }));
}

function getEmissionMapImageWrapData(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getEmissionMapImageWrapData, BSDFMaterialEntity$Wonderjs.value(material)), (function (param) {
                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.create, param);
              }));
}

function getNormalMapImageWrapData(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getNormalMapImageWrapData, BSDFMaterialEntity$Wonderjs.value(material)), (function (param) {
                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.create, param);
              }));
}

function getTransmissionMapImageWrapData(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getTransmissionMapImageWrapData, BSDFMaterialEntity$Wonderjs.value(material)), (function (param) {
                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.create, param);
              }));
}

function getSpecularMapImageWrapData(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getSpecularMapImageWrapData, BSDFMaterialEntity$Wonderjs.value(material)), (function (param) {
                return Tuple2$Wonderjs.map(WrapVO$Wonderjs.create, param);
              }));
}

function isDoubleSide(material) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).isDoubleSide, BSDFMaterialEntity$Wonderjs.value(material));
}

exports.getDiffuseColor = getDiffuseColor;
exports.getEmissionColor = getEmissionColor;
exports.getSpecular = getSpecular;
exports.getSpecularColor = getSpecularColor;
exports.getRoughness = getRoughness;
exports.getMetalness = getMetalness;
exports.getTransmission = getTransmission;
exports.getIOR = getIOR;
exports.getDiffuseMapImageId = getDiffuseMapImageId;
exports.getChannelRoughnessMetallicMapImageId = getChannelRoughnessMetallicMapImageId;
exports.getEmissionMapImageId = getEmissionMapImageId;
exports.getNormalMapImageId = getNormalMapImageId;
exports.getTransmissionMapImageId = getTransmissionMapImageId;
exports.getSpecularMapImageId = getSpecularMapImageId;
exports.getAlphaCutoff = getAlphaCutoff;
exports.isSame = isSame;
exports.getId = getId;
exports.getDiffuseMapImageWrapData = getDiffuseMapImageWrapData;
exports.getChannelRoughnessMetallicMapImageWrapData = getChannelRoughnessMetallicMapImageWrapData;
exports.getEmissionMapImageWrapData = getEmissionMapImageWrapData;
exports.getNormalMapImageWrapData = getNormalMapImageWrapData;
exports.getTransmissionMapImageWrapData = getTransmissionMapImageWrapData;
exports.getSpecularMapImageWrapData = getSpecularMapImageWrapData;
exports.isDoubleSide = isDoubleSide;
/* No side effect */
