'use strict';

var CreateBSDFMaterialDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/bsdf_material/CreateBSDFMaterialDoService.bs.js");
var OperateBSDFMaterialDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/bsdf_material/OperateBSDFMaterialDoService.bs.js");
var GameObjectBSDFMaterialDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/bsdf_material/GameObjectBSDFMaterialDoService.bs.js");

function create(param) {
  return CreateBSDFMaterialDoService$Wonderjs.create(undefined);
}

var getGameObjects = GameObjectBSDFMaterialDoService$Wonderjs.getGameObjects;

var getDiffuseColor = OperateBSDFMaterialDoService$Wonderjs.getDiffuseColor;

var setDiffuseColor = OperateBSDFMaterialDoService$Wonderjs.setDiffuseColor;

var getSpecular = OperateBSDFMaterialDoService$Wonderjs.getSpecular;

var setSpecular = OperateBSDFMaterialDoService$Wonderjs.setSpecular;

var getSpecularColor = OperateBSDFMaterialDoService$Wonderjs.getSpecularColor;

var setSpecularColor = OperateBSDFMaterialDoService$Wonderjs.setSpecularColor;

var getRoughness = OperateBSDFMaterialDoService$Wonderjs.getRoughness;

var setRoughness = OperateBSDFMaterialDoService$Wonderjs.setRoughness;

var getMetalness = OperateBSDFMaterialDoService$Wonderjs.getMetalness;

var setMetalness = OperateBSDFMaterialDoService$Wonderjs.setMetalness;

var getTransmission = OperateBSDFMaterialDoService$Wonderjs.getTransmission;

var setTransmission = OperateBSDFMaterialDoService$Wonderjs.setTransmission;

var getIOR = OperateBSDFMaterialDoService$Wonderjs.getIOR;

var setIOR = OperateBSDFMaterialDoService$Wonderjs.setIOR;

var getDiffuseMapImageId = OperateBSDFMaterialDoService$Wonderjs.getDiffuseMapImageId;

var setDiffuseMapImageId = OperateBSDFMaterialDoService$Wonderjs.setDiffuseMapImageId;

var getChannelRoughnessMetallicMapImageId = OperateBSDFMaterialDoService$Wonderjs.getChannelRoughnessMetallicMapImageId;

var setChannelRoughnessMetallicMapImageId = OperateBSDFMaterialDoService$Wonderjs.setChannelRoughnessMetallicMapImageId;

var getEmissionMapImageId = OperateBSDFMaterialDoService$Wonderjs.getEmissionMapImageId;

var setEmissionMapImageId = OperateBSDFMaterialDoService$Wonderjs.setEmissionMapImageId;

var getNormalMapImageId = OperateBSDFMaterialDoService$Wonderjs.getNormalMapImageId;

var setNormalMapImageId = OperateBSDFMaterialDoService$Wonderjs.setNormalMapImageId;

var getTransmissionMapImageId = OperateBSDFMaterialDoService$Wonderjs.getTransmissionMapImageId;

var setTransmissionMapImageId = OperateBSDFMaterialDoService$Wonderjs.setTransmissionMapImageId;

var getSpecularMapImageId = OperateBSDFMaterialDoService$Wonderjs.getSpecularMapImageId;

var setSpecularMapImageId = OperateBSDFMaterialDoService$Wonderjs.setSpecularMapImageId;

exports.create = create;
exports.getGameObjects = getGameObjects;
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
