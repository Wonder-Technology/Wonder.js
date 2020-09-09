'use strict';

var PBRMaterialApService$Wonderjs = require("../../../application_layer/scene/PBRMaterialApService.bs.js");

function create(param) {
  return PBRMaterialApService$Wonderjs.create(undefined);
}

var getGameObjects = PBRMaterialApService$Wonderjs.getGameObjects;

var getDiffuseColor = PBRMaterialApService$Wonderjs.getDiffuseColor;

var setDiffuseColor = PBRMaterialApService$Wonderjs.setDiffuseColor;

var getSpecular = PBRMaterialApService$Wonderjs.getSpecular;

var setSpecular = PBRMaterialApService$Wonderjs.setSpecular;

var getRoughness = PBRMaterialApService$Wonderjs.getRoughness;

var setRoughness = PBRMaterialApService$Wonderjs.setRoughness;

var getMetalness = PBRMaterialApService$Wonderjs.getMetalness;

var setMetalness = PBRMaterialApService$Wonderjs.setMetalness;

exports.create = create;
exports.getGameObjects = getGameObjects;
exports.getDiffuseColor = getDiffuseColor;
exports.setDiffuseColor = setDiffuseColor;
exports.getSpecular = getSpecular;
exports.setSpecular = setSpecular;
exports.getRoughness = getRoughness;
exports.setRoughness = setRoughness;
exports.getMetalness = getMetalness;
exports.setMetalness = setMetalness;
/* No side effect */
