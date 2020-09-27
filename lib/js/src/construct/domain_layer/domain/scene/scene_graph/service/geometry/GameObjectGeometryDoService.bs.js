'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");

function getGameObjects(geometry) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getGameObjects, GeometryEntity$Wonderjs.value(geometry)), (function (gameObjects) {
                return ListSt$Wonderjs.map(gameObjects, GameObjectEntity$Wonderjs.create);
              }));
}

exports.getGameObjects = getGameObjects;
/* No side effect */
