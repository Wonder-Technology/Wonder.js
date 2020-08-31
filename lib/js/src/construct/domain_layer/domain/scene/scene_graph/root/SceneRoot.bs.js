'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../entity/GameObjectEntity.bs.js");

function getSceneGameObject(param) {
  return OptionSt$Wonderjs.map(OptionSt$Wonderjs.fromNullable(Curry._1(DpContainer$Wonderjs.unsafeGetSceneRepoDp(undefined).getSceneGameObject, undefined)), GameObjectEntity$Wonderjs.create);
}

function setSceneGameObject(gameObject) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetSceneRepoDp(undefined).setSceneGameObject, GameObjectEntity$Wonderjs.value(gameObject));
}

exports.getSceneGameObject = getSceneGameObject;
exports.setSceneGameObject = setSceneGameObject;
/* No side effect */
