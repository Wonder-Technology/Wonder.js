'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");

function hasTransform(gameObject) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasTransform, GameObjectEntity$Wonderjs.value(gameObject));
}

exports.hasTransform = hasTransform;
/* No side effect */
