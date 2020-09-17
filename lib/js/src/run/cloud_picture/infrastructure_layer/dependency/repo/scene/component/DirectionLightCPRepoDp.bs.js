'use strict';

var CPRepo$Wonderjs = require("../../../../data/container/CPRepo.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");
var OperateTypeArrayDirectionLightCPRepoUtils$Wonderjs = require("./utils/OperateTypeArrayDirectionLightCPRepoUtils.bs.js");

function getMaxIndex(param) {
  return CPRepo$Wonderjs.getExnDirectionLight(undefined).maxIndex;
}

function setMaxIndex(maxIndex) {
  var init = CPRepo$Wonderjs.getExnDirectionLight(undefined);
  return CPRepo$Wonderjs.setDirectionLight({
              maxIndex: maxIndex,
              buffer: init.buffer,
              colors: init.colors,
              intensities: init.intensities,
              gameObjectMap: init.gameObjectMap
            });
}

function getGameObject(light) {
  return ImmutableSparseMap$Wonderjs.getNullable(CPRepo$Wonderjs.getExnDirectionLight(undefined).gameObjectMap, light);
}

function setGameObject(light, gameObject) {
  var lightPO = CPRepo$Wonderjs.getExnDirectionLight(undefined);
  return CPRepo$Wonderjs.setDirectionLight({
              maxIndex: lightPO.maxIndex,
              buffer: lightPO.buffer,
              colors: lightPO.colors,
              intensities: lightPO.intensities,
              gameObjectMap: ImmutableSparseMap$Wonderjs.set(lightPO.gameObjectMap, light, gameObject)
            });
}

function getColor(light) {
  return OperateTypeArrayDirectionLightCPRepoUtils$Wonderjs.getColor(light, CPRepo$Wonderjs.getExnDirectionLight(undefined).colors);
}

function setColor(light, color) {
  return OperateTypeArrayDirectionLightCPRepoUtils$Wonderjs.setColor(light, color, CPRepo$Wonderjs.getExnDirectionLight(undefined).colors);
}

function getIntensity(light) {
  return OperateTypeArrayDirectionLightCPRepoUtils$Wonderjs.getIntensity(light, CPRepo$Wonderjs.getExnDirectionLight(undefined).intensities);
}

function setIntensity(light, intensity) {
  return OperateTypeArrayDirectionLightCPRepoUtils$Wonderjs.setIntensity(light, intensity, CPRepo$Wonderjs.getExnDirectionLight(undefined).intensities);
}

exports.getMaxIndex = getMaxIndex;
exports.setMaxIndex = setMaxIndex;
exports.getGameObject = getGameObject;
exports.setGameObject = setGameObject;
exports.getColor = getColor;
exports.setColor = setColor;
exports.getIntensity = getIntensity;
exports.setIntensity = setIntensity;
/* CPRepo-Wonderjs Not a pure module */
