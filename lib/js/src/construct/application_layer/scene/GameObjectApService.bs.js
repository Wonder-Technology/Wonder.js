'use strict';

var CreateGameObjectDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/CreateGameObjectDoService.bs.js");
var AddComponentGameObjectDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/AddComponentGameObjectDoService.bs.js");
var GetComponentGameObjectDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/GetComponentGameObjectDoService.bs.js");
var HasComponentGameObjectDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/HasComponentGameObjectDoService.bs.js");

function create(param) {
  return CreateGameObjectDoService$Wonderjs.create(undefined);
}

var addTransform = AddComponentGameObjectDoService$Wonderjs.addTransform;

var getTransform = GetComponentGameObjectDoService$Wonderjs.getTransform;

var hasTransform = HasComponentGameObjectDoService$Wonderjs.hasTransform;

exports.create = create;
exports.addTransform = addTransform;
exports.getTransform = getTransform;
exports.hasTransform = hasTransform;
/* No side effect */
