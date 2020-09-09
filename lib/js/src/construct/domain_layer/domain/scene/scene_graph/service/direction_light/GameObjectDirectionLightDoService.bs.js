'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var DirectionLightEntity$Wonderjs = require("../../entity/DirectionLightEntity.bs.js");

function getGameObject(light) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetDirectionLightRepoDp(undefined).getGameObject, DirectionLightEntity$Wonderjs.value(light))), GameObjectEntity$Wonderjs.create);
}

exports.getGameObject = getGameObject;
/* No side effect */
