'use strict';

var Most = require("most");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var TimeStatisticDoService$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/statistic/statistic/service/TimeStatisticDoService.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("start_time");
}

function exec(param) {
  return Most.just(Result$Wonderjs.succeed(TimeStatisticDoService$Wonderjs.start(undefined)));
}

exports.create = create;
exports.exec = exec;
/* most Not a pure module */
