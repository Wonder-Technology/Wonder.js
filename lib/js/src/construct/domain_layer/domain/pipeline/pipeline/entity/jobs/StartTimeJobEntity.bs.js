'use strict';

var Most = require("most");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var JobEntity$Wonderjs = require("../JobEntity.bs.js");
var TimeDoService$Wonderjs = require("../../../../statistic/time/service/TimeDoService.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("start_time");
}

function exec(param) {
  return Most.just(Result$Wonderjs.succeed(TimeDoService$Wonderjs.start(undefined)));
}

exports.create = create;
exports.exec = exec;
/* most Not a pure module */
