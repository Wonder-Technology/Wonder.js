'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var CreateTransformDoService$Wonderjs = require("../transform/CreateTransformDoService.bs.js");
var AddComponentGameObjectDoService$Wonderjs = require("./AddComponentGameObjectDoService.bs.js");

function create(param) {
  var uid = Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).getMaxUID, undefined);
  Curry._1(DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).setMaxUID, uid + 1 | 0);
  var gameObject = GameObjectEntity$Wonderjs.create(uid);
  return Result$Wonderjs.bind(CreateTransformDoService$Wonderjs.create(undefined), (function (transform) {
                return AddComponentGameObjectDoService$Wonderjs.addTransform(gameObject, transform);
              }));
}

exports.create = create;
/* No side effect */
