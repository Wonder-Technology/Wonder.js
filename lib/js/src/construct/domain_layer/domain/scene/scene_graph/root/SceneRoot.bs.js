'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../entity/GameObjectEntity.bs.js");

function getSceneGameObject(param) {
  return GameObjectEntity$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetSceneRepoDp(undefined).getSceneGameObject, undefined));
}

exports.getSceneGameObject = getSceneGameObject;
/* No side effect */
