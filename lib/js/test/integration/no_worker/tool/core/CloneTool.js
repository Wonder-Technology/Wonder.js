'use strict';

var GeometryTool$Wonderjs = require("../../../../tool/service/geometry/GeometryTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");

var getFlattenClonedGameObjectArr = ArrayService$WonderCommonlib.flatten;

var cloneGameObject = GameObjectAPI$Wonderjs.cloneGameObject;

function cloneWithGeometry(state, gameObject1, geometry1, count) {
  var match = cloneGameObject(gameObject1, count, false, state);
  var clonedGameObjectArr = match[1];
  var state$1 = match[0];
  return /* tuple */[
          state$1,
          gameObject1,
          geometry1,
          ArrayService$WonderCommonlib.flatten(clonedGameObjectArr),
          ArrayService$WonderCommonlib.flatten(clonedGameObjectArr).map((function (clonedGameObject) {
                  return GeometryTool$Wonderjs.unsafeGetGeometryComponent(clonedGameObject, state$1);
                }))
        ];
}

function cloneWithBasicMaterial(state, gameObject1, material1, count, isShareMaterial) {
  var match = cloneGameObject(gameObject1, count, isShareMaterial, state);
  var clonedGameObjectArr = match[1];
  var state$1 = match[0];
  return /* tuple */[
          state$1,
          gameObject1,
          material1,
          ArrayService$WonderCommonlib.flatten(clonedGameObjectArr),
          ArrayService$WonderCommonlib.flatten(clonedGameObjectArr).map((function (clonedGameObject) {
                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state$1);
                }))
        ];
}

exports.getFlattenClonedGameObjectArr = getFlattenClonedGameObjectArr;
exports.cloneGameObject = cloneGameObject;
exports.cloneWithGeometry = cloneWithGeometry;
exports.cloneWithBasicMaterial = cloneWithBasicMaterial;
/* GeometryTool-Wonderjs Not a pure module */
