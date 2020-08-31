'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var TransformEntity$Wonderjs = require("../../entity/TransformEntity.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");

function getGameObject(transform) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getGameObject, TransformEntity$Wonderjs.value(transform))), GameObjectEntity$Wonderjs.create);
}

exports.getGameObject = getGameObject;
/* No side effect */
