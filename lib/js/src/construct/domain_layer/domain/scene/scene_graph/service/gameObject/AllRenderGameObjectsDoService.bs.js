'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var BSDFMaterialEntity$Wonderjs = require("../../entity/BSDFMaterialEntity.bs.js");

function getAllRenderGameObjects(param) {
  return ListSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getAllGeometryGameObjects, undefined), GameObjectEntity$Wonderjs.create);
}

function getAllRenderGeometries(param) {
  return ListSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getAllGameObjectGeometries, undefined), GeometryEntity$Wonderjs.create);
}

function getAllRenderBSDFMaterials(param) {
  return ListSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getAllGameObjectBSDFMaterials, undefined), BSDFMaterialEntity$Wonderjs.create);
}

exports.getAllRenderGameObjects = getAllRenderGameObjects;
exports.getAllRenderGeometries = getAllRenderGeometries;
exports.getAllRenderBSDFMaterials = getAllRenderBSDFMaterials;
/* No side effect */
