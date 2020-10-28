'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");

function getAllRenderGameObjects(param) {
  return ListSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getAllGeometryGameObjects, undefined), GameObjectEntity$Wonderjs.create);
}

exports.getAllRenderGameObjects = getAllRenderGameObjects;
/* No side effect */
