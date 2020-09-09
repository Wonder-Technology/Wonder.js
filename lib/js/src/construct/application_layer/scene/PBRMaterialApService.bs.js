'use strict';

var CreatePBRMaterialDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/pbr_material/CreatePBRMaterialDoService.bs.js");
var OperatePBRMaterialDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/pbr_material/OperatePBRMaterialDoService.bs.js");
var GameObjectPBRMaterialDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/pbr_material/GameObjectPBRMaterialDoService.bs.js");

function create(param) {
  return CreatePBRMaterialDoService$Wonderjs.create(undefined);
}

var getGameObjects = GameObjectPBRMaterialDoService$Wonderjs.getGameObjects;

var getDiffuseColor = OperatePBRMaterialDoService$Wonderjs.getDiffuseColor;

var setDiffuseColor = OperatePBRMaterialDoService$Wonderjs.setDiffuseColor;

var getSpecular = OperatePBRMaterialDoService$Wonderjs.getSpecular;

var setSpecular = OperatePBRMaterialDoService$Wonderjs.setSpecular;

var getRoughness = OperatePBRMaterialDoService$Wonderjs.getRoughness;

var setRoughness = OperatePBRMaterialDoService$Wonderjs.setRoughness;

var getMetalness = OperatePBRMaterialDoService$Wonderjs.getMetalness;

var setMetalness = OperatePBRMaterialDoService$Wonderjs.setMetalness;

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
