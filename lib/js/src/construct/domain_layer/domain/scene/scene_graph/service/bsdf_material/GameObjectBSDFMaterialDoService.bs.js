'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var BSDFMaterialEntity$Wonderjs = require("../../entity/BSDFMaterialEntity.bs.js");

function getGameObjects(material) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).getGameObjects, BSDFMaterialEntity$Wonderjs.value(material)), (function (gameObjects) {
                return ListSt$Wonderjs.map(gameObjects, GameObjectEntity$Wonderjs.create);
              }));
}

exports.getGameObjects = getGameObjects;
/* No side effect */
