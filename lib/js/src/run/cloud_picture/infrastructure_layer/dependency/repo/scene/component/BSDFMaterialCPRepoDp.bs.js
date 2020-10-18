'use strict';

var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var CPRepo$Wonderjs = require("../../../../data/container/CPRepo.bs.js");
var ListMapRepoUtils$Wonderjs = require("../../utils/ListMapRepoUtils.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");
var OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs = require("./utils/OperateTypeArrayBSDFMaterialCPRepoUtils.bs.js");

function getMaxIndex(param) {
  return CPRepo$Wonderjs.getExnBSDFMaterial(undefined).maxIndex;
}

function setMaxIndex(maxIndex) {
  var newrecord = Caml_obj.caml_obj_dup(CPRepo$Wonderjs.getExnBSDFMaterial(undefined));
  return CPRepo$Wonderjs.setBSDFMaterial((newrecord.maxIndex = maxIndex, newrecord));
}

function getGameObjects(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnBSDFMaterial(undefined).gameObjectsMap, material);
}

function addGameObject(material, gameObject) {
  var materialPO = CPRepo$Wonderjs.getExnBSDFMaterial(undefined);
  var newrecord = Caml_obj.caml_obj_dup(materialPO);
  return CPRepo$Wonderjs.setBSDFMaterial((newrecord.gameObjectsMap = ListMapRepoUtils$Wonderjs.addValue(materialPO.gameObjectsMap, material, gameObject), newrecord));
}

function getDiffuseColor(material) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.getDiffuseColor(material, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).diffuseColors);
}

function setDiffuseColor(material, color) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setDiffuseColor(material, color, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).diffuseColors);
}

function getSpecular(material) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.getSpecular(material, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).speculars);
}

function setSpecular(material, specular) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setSpecular(material, specular, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).speculars);
}

function getSpecularColor(material) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.getSpecularColor(material, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).specularColors);
}

function setSpecularColor(material, color) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setSpecularColor(material, color, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).specularColors);
}

function getRoughness(material) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.getRoughness(material, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).roughnesses);
}

function setRoughness(material, roughness) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setRoughness(material, roughness, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).roughnesses);
}

function getMetalness(material) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.getMetalness(material, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).metalnesses);
}

function setMetalness(material, metalness) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setMetalness(material, metalness, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).metalnesses);
}

function getTransmission(material) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.getTransmission(material, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).transmissions);
}

function setTransmission(material, transmission) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setTransmission(material, transmission, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).transmissions);
}

function getIOR(material) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.getIOR(material, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).iors);
}

function setIOR(material, ior) {
  return OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setIOR(material, ior, CPRepo$Wonderjs.getExnBSDFMaterial(undefined).iors);
}

function getDiffuseMapImageId(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnBSDFMaterial(undefined).diffuseMapImageIdMap, material);
}

function setDiffuseMapImageId(material, id) {
  var materialPO = CPRepo$Wonderjs.getExnBSDFMaterial(undefined);
  var newrecord = Caml_obj.caml_obj_dup(materialPO);
  return CPRepo$Wonderjs.setBSDFMaterial((newrecord.diffuseMapImageIdMap = ImmutableSparseMap$Wonderjs.set(materialPO.diffuseMapImageIdMap, material, id), newrecord));
}

function getChannelRoughnessMetallicMapImageId(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnBSDFMaterial(undefined).channelRoughnessMetallicMapImageIdMap, material);
}

function setChannelRoughnessMetallicMapImageId(material, id) {
  var materialPO = CPRepo$Wonderjs.getExnBSDFMaterial(undefined);
  var newrecord = Caml_obj.caml_obj_dup(materialPO);
  return CPRepo$Wonderjs.setBSDFMaterial((newrecord.channelRoughnessMetallicMapImageIdMap = ImmutableSparseMap$Wonderjs.set(materialPO.channelRoughnessMetallicMapImageIdMap, material, id), newrecord));
}

function getEmissionMapImageId(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnBSDFMaterial(undefined).emissionMapImageIdMap, material);
}

function setEmissionMapImageId(material, id) {
  var materialPO = CPRepo$Wonderjs.getExnBSDFMaterial(undefined);
  var newrecord = Caml_obj.caml_obj_dup(materialPO);
  return CPRepo$Wonderjs.setBSDFMaterial((newrecord.emissionMapImageIdMap = ImmutableSparseMap$Wonderjs.set(materialPO.emissionMapImageIdMap, material, id), newrecord));
}

function getNormalMapImageId(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnBSDFMaterial(undefined).normalMapImageIdMap, material);
}

function setNormalMapImageId(material, id) {
  var materialPO = CPRepo$Wonderjs.getExnBSDFMaterial(undefined);
  var newrecord = Caml_obj.caml_obj_dup(materialPO);
  return CPRepo$Wonderjs.setBSDFMaterial((newrecord.normalMapImageIdMap = ImmutableSparseMap$Wonderjs.set(materialPO.normalMapImageIdMap, material, id), newrecord));
}

function getTransmissionMapImageId(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnBSDFMaterial(undefined).transmissionMapImageIdMap, material);
}

function setTransmissionMapImageId(material, id) {
  var materialPO = CPRepo$Wonderjs.getExnBSDFMaterial(undefined);
  var newrecord = Caml_obj.caml_obj_dup(materialPO);
  return CPRepo$Wonderjs.setBSDFMaterial((newrecord.transmissionMapImageIdMap = ImmutableSparseMap$Wonderjs.set(materialPO.transmissionMapImageIdMap, material, id), newrecord));
}

function getSpecularMapImageId(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnBSDFMaterial(undefined).specularMapImageIdMap, material);
}

function setSpecularMapImageId(material, id) {
  var materialPO = CPRepo$Wonderjs.getExnBSDFMaterial(undefined);
  var newrecord = Caml_obj.caml_obj_dup(materialPO);
  return CPRepo$Wonderjs.setBSDFMaterial((newrecord.specularMapImageIdMap = ImmutableSparseMap$Wonderjs.set(materialPO.specularMapImageIdMap, material, id), newrecord));
}

exports.getMaxIndex = getMaxIndex;
exports.setMaxIndex = setMaxIndex;
exports.getGameObjects = getGameObjects;
exports.addGameObject = addGameObject;
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
/* CPRepo-Wonderjs Not a pure module */
