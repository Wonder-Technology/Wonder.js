'use strict';

var DpContainer$Wonderjs = require("../../../domain_layer/dependency/container/DpContainer.bs.js");
var ConfigDpApService$Wonderjs = require("../../../application_layer/dependency/ConfigDpApService.bs.js");

function unsafeGet(param) {
  return DpContainer$Wonderjs.unsafeGetConfigDp(undefined);
}

var set = ConfigDpApService$Wonderjs.set;

exports.unsafeGet = unsafeGet;
exports.set = set;
/* No side effect */
