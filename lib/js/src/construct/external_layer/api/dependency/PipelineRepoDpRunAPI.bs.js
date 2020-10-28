'use strict';

var DpContainer$Wonderjs = require("../../../domain_layer/dependency/container/DpContainer.bs.js");
var PipelineRepoDpApService$Wonderjs = require("../../../application_layer/dependency/PipelineRepoDpApService.bs.js");

function unsafeGet(param) {
  return DpContainer$Wonderjs.unsafeGetPipelineRepoDp(undefined);
}

var set = PipelineRepoDpApService$Wonderjs.set;

exports.unsafeGet = unsafeGet;
exports.set = set;
/* No side effect */
