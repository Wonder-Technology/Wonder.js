'use strict';

var DpContainer$Wonderjs = require("../../../../domain_layer/dependency/container/DpContainer.bs.js");
var WebGPURayTracingDpApService$Wonderjs = require("../../../../application_layer/dependency/WebGPURayTracingDpApService.bs.js");

function unsafeGet(param) {
  return DpContainer$Wonderjs.unsafeGetWebGPURayTracingDp(undefined);
}

var set = WebGPURayTracingDpApService$Wonderjs.set;

exports.unsafeGet = unsafeGet;
exports.set = set;
/* No side effect */
