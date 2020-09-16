'use strict';

var DpContainer$Wonderjs = require("../../../../domain_layer/dependency/container/DpContainer.bs.js");
var WebGPUCoreDpApService$Wonderjs = require("../../../../application_layer/dependency/WebGPUCoreDpApService.bs.js");

function unsafeGet(param) {
  return DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined);
}

var set = WebGPUCoreDpApService$Wonderjs.set;

exports.unsafeGet = unsafeGet;
exports.set = set;
/* No side effect */
