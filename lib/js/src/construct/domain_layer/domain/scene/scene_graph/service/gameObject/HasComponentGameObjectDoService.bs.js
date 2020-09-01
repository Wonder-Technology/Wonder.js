'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");

function hasTransform(gameObject) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasTransform, GameObjectEntity$Wonderjs.value(gameObject));
}

function hasPBRMaterial(gameObject) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasPBRMaterial, GameObjectEntity$Wonderjs.value(gameObject));
}

function hasGeometry(gameObject) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasGeometry, GameObjectEntity$Wonderjs.value(gameObject));
}

function hasDirectionLight(gameObject) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasDirectionLight, GameObjectEntity$Wonderjs.value(gameObject));
}

function hasBasicCameraView(gameObject) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasBasicCameraView, GameObjectEntity$Wonderjs.value(gameObject));
}

function hasPerspectiveCameraProjection(gameObject) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasPerspectiveCameraProjection, GameObjectEntity$Wonderjs.value(gameObject));
}

exports.hasTransform = hasTransform;
exports.hasPBRMaterial = hasPBRMaterial;
exports.hasGeometry = hasGeometry;
exports.hasDirectionLight = hasDirectionLight;
exports.hasBasicCameraView = hasBasicCameraView;
exports.hasPerspectiveCameraProjection = hasPerspectiveCameraProjection;
/* No side effect */
