'use strict';

var CPRepo$Wonderjs = require("../../../../data/container/CPRepo.bs.js");
var ListMapRepoUtils$Wonderjs = require("../../utils/ListMapRepoUtils.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");
var OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs = require("./utils/OperateTypeArrayPBRMaterialCPRepoUtils.bs.js");

function getMaxIndex(param) {
  return CPRepo$Wonderjs.getExnPBRMaterial(undefined).maxIndex;
}

function setMaxIndex(maxIndex) {
  var init = CPRepo$Wonderjs.getExnPBRMaterial(undefined);
  return CPRepo$Wonderjs.setPBRMaterial({
              maxIndex: maxIndex,
              buffer: init.buffer,
              diffuseColors: init.diffuseColors,
              speculars: init.speculars,
              roughnesses: init.roughnesses,
              metalnesses: init.metalnesses,
              defaultDiffuseColor: init.defaultDiffuseColor,
              defaultSpecular: init.defaultSpecular,
              defaultRoughness: init.defaultRoughness,
              defaultMetalness: init.defaultMetalness,
              gameObjectsMap: init.gameObjectsMap,
              diffuseMapImageIdMap: init.diffuseMapImageIdMap,
              channelRoughnessMetallicMapImageIdMap: init.channelRoughnessMetallicMapImageIdMap,
              emissionMapImageIdMap: init.emissionMapImageIdMap,
              normalMapImageIdMap: init.normalMapImageIdMap
            });
}

function getGameObjects(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnPBRMaterial(undefined).gameObjectsMap, material);
}

function addGameObject(material, gameObject) {
  var materialPO = CPRepo$Wonderjs.getExnPBRMaterial(undefined);
  return CPRepo$Wonderjs.setPBRMaterial({
              maxIndex: materialPO.maxIndex,
              buffer: materialPO.buffer,
              diffuseColors: materialPO.diffuseColors,
              speculars: materialPO.speculars,
              roughnesses: materialPO.roughnesses,
              metalnesses: materialPO.metalnesses,
              defaultDiffuseColor: materialPO.defaultDiffuseColor,
              defaultSpecular: materialPO.defaultSpecular,
              defaultRoughness: materialPO.defaultRoughness,
              defaultMetalness: materialPO.defaultMetalness,
              gameObjectsMap: ListMapRepoUtils$Wonderjs.addValue(materialPO.gameObjectsMap, material, gameObject),
              diffuseMapImageIdMap: materialPO.diffuseMapImageIdMap,
              channelRoughnessMetallicMapImageIdMap: materialPO.channelRoughnessMetallicMapImageIdMap,
              emissionMapImageIdMap: materialPO.emissionMapImageIdMap,
              normalMapImageIdMap: materialPO.normalMapImageIdMap
            });
}

function getDiffuseColor(material) {
  return OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.getDiffuseColor(material, CPRepo$Wonderjs.getExnPBRMaterial(undefined).diffuseColors);
}

function setDiffuseColor(material, diffuse) {
  return OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.setDiffuseColor(material, diffuse, CPRepo$Wonderjs.getExnPBRMaterial(undefined).diffuseColors);
}

function getSpecular(material) {
  return OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.getSpecular(material, CPRepo$Wonderjs.getExnPBRMaterial(undefined).speculars);
}

function setSpecular(material, specular) {
  return OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.setSpecular(material, specular, CPRepo$Wonderjs.getExnPBRMaterial(undefined).speculars);
}

function getRoughness(material) {
  return OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.getRoughness(material, CPRepo$Wonderjs.getExnPBRMaterial(undefined).roughnesses);
}

function setRoughness(material, roughness) {
  return OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.setRoughness(material, roughness, CPRepo$Wonderjs.getExnPBRMaterial(undefined).roughnesses);
}

function getMetalness(material) {
  return OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.getMetalness(material, CPRepo$Wonderjs.getExnPBRMaterial(undefined).metalnesses);
}

function setMetalness(material, metalness) {
  return OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.setMetalness(material, metalness, CPRepo$Wonderjs.getExnPBRMaterial(undefined).metalnesses);
}

function getDiffuseMapImageId(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnPBRMaterial(undefined).diffuseMapImageIdMap, material);
}

function setDiffuseMapImageId(material, id) {
  var materialPO = CPRepo$Wonderjs.getExnPBRMaterial(undefined);
  return CPRepo$Wonderjs.setPBRMaterial({
              maxIndex: materialPO.maxIndex,
              buffer: materialPO.buffer,
              diffuseColors: materialPO.diffuseColors,
              speculars: materialPO.speculars,
              roughnesses: materialPO.roughnesses,
              metalnesses: materialPO.metalnesses,
              defaultDiffuseColor: materialPO.defaultDiffuseColor,
              defaultSpecular: materialPO.defaultSpecular,
              defaultRoughness: materialPO.defaultRoughness,
              defaultMetalness: materialPO.defaultMetalness,
              gameObjectsMap: materialPO.gameObjectsMap,
              diffuseMapImageIdMap: ImmutableSparseMap$Wonderjs.set(materialPO.diffuseMapImageIdMap, material, id),
              channelRoughnessMetallicMapImageIdMap: materialPO.channelRoughnessMetallicMapImageIdMap,
              emissionMapImageIdMap: materialPO.emissionMapImageIdMap,
              normalMapImageIdMap: materialPO.normalMapImageIdMap
            });
}

function getChannelRoughnessMetallicMapImageId(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnPBRMaterial(undefined).channelRoughnessMetallicMapImageIdMap, material);
}

function setChannelRoughnessMetallicMapImageId(material, id) {
  var materialPO = CPRepo$Wonderjs.getExnPBRMaterial(undefined);
  return CPRepo$Wonderjs.setPBRMaterial({
              maxIndex: materialPO.maxIndex,
              buffer: materialPO.buffer,
              diffuseColors: materialPO.diffuseColors,
              speculars: materialPO.speculars,
              roughnesses: materialPO.roughnesses,
              metalnesses: materialPO.metalnesses,
              defaultDiffuseColor: materialPO.defaultDiffuseColor,
              defaultSpecular: materialPO.defaultSpecular,
              defaultRoughness: materialPO.defaultRoughness,
              defaultMetalness: materialPO.defaultMetalness,
              gameObjectsMap: materialPO.gameObjectsMap,
              diffuseMapImageIdMap: materialPO.diffuseMapImageIdMap,
              channelRoughnessMetallicMapImageIdMap: ImmutableSparseMap$Wonderjs.set(materialPO.channelRoughnessMetallicMapImageIdMap, material, id),
              emissionMapImageIdMap: materialPO.emissionMapImageIdMap,
              normalMapImageIdMap: materialPO.normalMapImageIdMap
            });
}

function getEmissionMapImageId(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnPBRMaterial(undefined).emissionMapImageIdMap, material);
}

function setEmissionMapImageId(material, id) {
  var materialPO = CPRepo$Wonderjs.getExnPBRMaterial(undefined);
  return CPRepo$Wonderjs.setPBRMaterial({
              maxIndex: materialPO.maxIndex,
              buffer: materialPO.buffer,
              diffuseColors: materialPO.diffuseColors,
              speculars: materialPO.speculars,
              roughnesses: materialPO.roughnesses,
              metalnesses: materialPO.metalnesses,
              defaultDiffuseColor: materialPO.defaultDiffuseColor,
              defaultSpecular: materialPO.defaultSpecular,
              defaultRoughness: materialPO.defaultRoughness,
              defaultMetalness: materialPO.defaultMetalness,
              gameObjectsMap: materialPO.gameObjectsMap,
              diffuseMapImageIdMap: materialPO.diffuseMapImageIdMap,
              channelRoughnessMetallicMapImageIdMap: materialPO.channelRoughnessMetallicMapImageIdMap,
              emissionMapImageIdMap: ImmutableSparseMap$Wonderjs.set(materialPO.emissionMapImageIdMap, material, id),
              normalMapImageIdMap: materialPO.normalMapImageIdMap
            });
}

function getNormalMapImageId(material) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnPBRMaterial(undefined).normalMapImageIdMap, material);
}

function setNormalMapImageId(material, id) {
  var materialPO = CPRepo$Wonderjs.getExnPBRMaterial(undefined);
  return CPRepo$Wonderjs.setPBRMaterial({
              maxIndex: materialPO.maxIndex,
              buffer: materialPO.buffer,
              diffuseColors: materialPO.diffuseColors,
              speculars: materialPO.speculars,
              roughnesses: materialPO.roughnesses,
              metalnesses: materialPO.metalnesses,
              defaultDiffuseColor: materialPO.defaultDiffuseColor,
              defaultSpecular: materialPO.defaultSpecular,
              defaultRoughness: materialPO.defaultRoughness,
              defaultMetalness: materialPO.defaultMetalness,
              gameObjectsMap: materialPO.gameObjectsMap,
              diffuseMapImageIdMap: materialPO.diffuseMapImageIdMap,
              channelRoughnessMetallicMapImageIdMap: materialPO.channelRoughnessMetallicMapImageIdMap,
              emissionMapImageIdMap: materialPO.emissionMapImageIdMap,
              normalMapImageIdMap: ImmutableSparseMap$Wonderjs.set(materialPO.normalMapImageIdMap, material, id)
            });
}

exports.getMaxIndex = getMaxIndex;
exports.setMaxIndex = setMaxIndex;
exports.getGameObjects = getGameObjects;
exports.addGameObject = addGameObject;
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
/* CPRepo-Wonderjs Not a pure module */
