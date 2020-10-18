'use strict';

var Most = require("most");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var JobEntity$Wonderjs = require("../JobEntity.bs.js");
var TransformEntity$Wonderjs = require("../../../../scene/scene_graph/entity/TransformEntity.bs.js");
var IndexTransformDoService$Wonderjs = require("../../../../scene/scene_graph/service/transform/IndexTransformDoService.bs.js");
var UpdateTransformDoService$Wonderjs = require("../../../../scene/scene_graph/service/transform/UpdateTransformDoService.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("update_transform");
}

function exec(param) {
  for(var i = 0 ,i_finish = IndexTransformDoService$Wonderjs.getMaxIndex(undefined); i < i_finish; ++i){
    UpdateTransformDoService$Wonderjs.mutableUpdate(TransformEntity$Wonderjs.create(i));
  }
  return Most.just(Result$Wonderjs.succeed(undefined));
}

exports.create = create;
exports.exec = exec;
/* most Not a pure module */
