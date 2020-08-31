'use strict';

var CPRepo$Wonderjs = require("../../../../domain_layer/repo/CPRepo.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");

function getMaxUID(param) {
  return CPRepo$Wonderjs.getGameObject(undefined).maxUID;
}

function setMaxUID(maxUID) {
  var init = CPRepo$Wonderjs.getGameObject(undefined);
  return CPRepo$Wonderjs.setGameObject({
              maxUID: maxUID,
              transformMap: init.transformMap
            });
}

function addTransform(gameObject, transform) {
  var gameObjectPO = CPRepo$Wonderjs.getGameObject(undefined);
  return CPRepo$Wonderjs.setGameObject({
              maxUID: gameObjectPO.maxUID,
              transformMap: ImmutableSparseMap$Wonderjs.set(gameObjectPO.transformMap, gameObject, transform)
            });
}

function getTransform(gameObject) {
  return ImmutableSparseMap$Wonderjs.getNullable(CPRepo$Wonderjs.getGameObject(undefined).transformMap, gameObject);
}

function hasTransform(gameObject) {
  return ImmutableSparseMap$Wonderjs.has(CPRepo$Wonderjs.getGameObject(undefined).transformMap, gameObject);
}

exports.getMaxUID = getMaxUID;
exports.setMaxUID = setMaxUID;
exports.addTransform = addTransform;
exports.getTransform = getTransform;
exports.hasTransform = hasTransform;
/* CPRepo-Wonderjs Not a pure module */
