'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var DirectionLightEntity$Wonderjs = require("../../entity/DirectionLightEntity.bs.js");

function getAllLights(sceneGameObject) {
  return ListSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetDirectionLightRepoDp(undefined).getAllLights, GameObjectEntity$Wonderjs.value(sceneGameObject)), DirectionLightEntity$Wonderjs.create);
}

function getLightCount(sceneGameObject) {
  return ListSt$Wonderjs.length(getAllLights(sceneGameObject));
}

exports.getAllLights = getAllLights;
exports.getLightCount = getLightCount;
/* No side effect */
