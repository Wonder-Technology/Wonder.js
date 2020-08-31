'use strict';

var GameObjectApService$Wonderjs = require("../../../application_layer/scene/GameObjectApService.bs.js");

function create(param) {
  return GameObjectApService$Wonderjs.create(undefined);
}

var addTransform = GameObjectApService$Wonderjs.addTransform;

var getTransform = GameObjectApService$Wonderjs.getTransform;

var hasTransform = GameObjectApService$Wonderjs.hasTransform;

exports.create = create;
exports.addTransform = addTransform;
exports.getTransform = getTransform;
exports.hasTransform = hasTransform;
/* No side effect */
