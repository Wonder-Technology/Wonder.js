'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");
var TransformEntity$Wonderjs = require("../../entity/TransformEntity.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var PBRMaterialEntity$Wonderjs = require("../../entity/PBRMaterialEntity.bs.js");
var DirectionLightEntity$Wonderjs = require("../../entity/DirectionLightEntity.bs.js");
var BasicCameraViewEntity$Wonderjs = require("../../entity/BasicCameraViewEntity.bs.js");
var PerspectiveCameraProjectionEntity$Wonderjs = require("../../entity/PerspectiveCameraProjectionEntity.bs.js");

function getTransform(gameObject) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getTransform, GameObjectEntity$Wonderjs.value(gameObject))), TransformEntity$Wonderjs.create);
}

function getPBRMaterial(gameObject) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getPBRMaterial, GameObjectEntity$Wonderjs.value(gameObject))), PBRMaterialEntity$Wonderjs.create);
}

function getGeometry(gameObject) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getGeometry, GameObjectEntity$Wonderjs.value(gameObject))), GeometryEntity$Wonderjs.create);
}

function getDirectionLight(gameObject) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getDirectionLight, GameObjectEntity$Wonderjs.value(gameObject))), DirectionLightEntity$Wonderjs.create);
}

function getBasicCameraView(gameObject) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getBasicCameraView, GameObjectEntity$Wonderjs.value(gameObject))), BasicCameraViewEntity$Wonderjs.create);
}

function getPerspectiveCameraProjection(gameObject) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getPerspectiveCameraProjection, GameObjectEntity$Wonderjs.value(gameObject))), PerspectiveCameraProjectionEntity$Wonderjs.create);
}

exports.getTransform = getTransform;
exports.getPBRMaterial = getPBRMaterial;
exports.getGeometry = getGeometry;
exports.getDirectionLight = getDirectionLight;
exports.getBasicCameraView = getBasicCameraView;
exports.getPerspectiveCameraProjection = getPerspectiveCameraProjection;
/* No side effect */
