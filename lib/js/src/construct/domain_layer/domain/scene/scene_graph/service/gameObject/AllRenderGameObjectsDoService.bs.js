'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var BSDFMaterialEntity$Wonderjs = require("../../entity/BSDFMaterialEntity.bs.js");

function getAllRenderGameObjects(sceneGameObject) {
  return ListSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getAllGeometryGameObjects, GameObjectEntity$Wonderjs.value(sceneGameObject)), GameObjectEntity$Wonderjs.create);
}

function getAllRenderGeometries(sceneGameObject) {
  return ListSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getAllGameObjectGeometries, GameObjectEntity$Wonderjs.value(sceneGameObject)), GeometryEntity$Wonderjs.create);
}

function getAllRenderBSDFMaterials(sceneGameObject) {
  return ListSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getAllGameObjectBSDFMaterials, GameObjectEntity$Wonderjs.value(sceneGameObject)), BSDFMaterialEntity$Wonderjs.create);
}

exports.getAllRenderGameObjects = getAllRenderGameObjects;
exports.getAllRenderGeometries = getAllRenderGeometries;
exports.getAllRenderBSDFMaterials = getAllRenderBSDFMaterials;
/* No side effect */
