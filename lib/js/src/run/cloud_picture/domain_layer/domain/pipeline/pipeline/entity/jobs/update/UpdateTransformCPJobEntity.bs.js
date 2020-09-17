'use strict';

var Most = require("most");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var TransformEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/entity/TransformEntity.bs.js");
var TransformRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/TransformRunAPI.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("update_transform");
}

function exec(param) {
  for(var i = 0 ,i_finish = TransformRunAPI$Wonderjs.getMaxIndex(undefined); i < i_finish; ++i){
    TransformRunAPI$Wonderjs.mutableUpdate(TransformEntity$Wonderjs.create(i));
  }
  return Most.just(Result$Wonderjs.succeed(undefined));
}

exports.create = create;
exports.exec = exec;
/* most Not a pure module */
