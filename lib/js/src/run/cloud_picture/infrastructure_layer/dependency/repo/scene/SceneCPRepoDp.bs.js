'use strict';

var CPRepo$Wonderjs = require("../../../../domain_layer/repo/CPRepo.bs.js");

function getSceneGameObject(gameObject) {
  return CPRepo$Wonderjs.getScene(undefined).sceneGameObject;
}

function setSceneGameObject(gameObject) {
  return CPRepo$Wonderjs.setScene({
              sceneGameObject: gameObject
            });
}

exports.getSceneGameObject = getSceneGameObject;
exports.setSceneGameObject = setSceneGameObject;
/* CPRepo-Wonderjs Not a pure module */
