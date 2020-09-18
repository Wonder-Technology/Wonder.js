'use strict';

var DpContainer$Wonderjs = require("../../../../domain_layer/dependency/container/DpContainer.bs.js");
var POConfigDpApService$Wonderjs = require("../../../../application_layer/dependency/POConfigDpApService.bs.js");

function unsafeGet(param) {
  return DpContainer$Wonderjs.unsafeGetPOConfigDp(undefined);
}

var set = POConfigDpApService$Wonderjs.set;

exports.unsafeGet = unsafeGet;
exports.set = set;
/* No side effect */
