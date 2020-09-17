'use strict';

var Most = require("most");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var AccumulationPassCPDoService$Wonderjs = require("../../../service/AccumulationPassCPDoService.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("update_accumulation");
}

function exec(param) {
  return Most.just(Result$Wonderjs.succeed(AccumulationPassCPDoService$Wonderjs.increaseSampleAccumulation(undefined)));
}

exports.create = create;
exports.exec = exec;
/* most Not a pure module */
