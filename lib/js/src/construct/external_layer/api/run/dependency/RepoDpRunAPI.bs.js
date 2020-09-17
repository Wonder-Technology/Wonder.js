'use strict';

var DpContainer$Wonderjs = require("../../../../domain_layer/dependency/container/DpContainer.bs.js");
var RepoDpApService$Wonderjs = require("../../../../application_layer/dependency/RepoDpApService.bs.js");

function unsafeGet(param) {
  return DpContainer$Wonderjs.unsafeGetTimeRepoDp(undefined);
}

var set = RepoDpApService$Wonderjs.set;

exports.unsafeGet = unsafeGet;
exports.set = set;
/* No side effect */
