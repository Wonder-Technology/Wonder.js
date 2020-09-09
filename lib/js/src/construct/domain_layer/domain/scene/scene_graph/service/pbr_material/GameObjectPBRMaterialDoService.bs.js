'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var PBRMaterialEntity$Wonderjs = require("../../entity/PBRMaterialEntity.bs.js");

function getGameObjects(material) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetPBRMaterialRepoDp(undefined).getGameObjects, PBRMaterialEntity$Wonderjs.value(material))), (function (gameObjects) {
                return ListSt$Wonderjs.map(gameObjects, GameObjectEntity$Wonderjs.create);
              }));
}

exports.getGameObjects = getGameObjects;
/* No side effect */
