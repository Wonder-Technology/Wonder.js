'use strict';

var DpContainer$Wonderjs = require("../../../../domain_layer/dependency/container/DpContainer.bs.js");
var TimeDpApService$Wonderjs = require("../../../../application_layer/dependency/TimeDpApService.bs.js");

function unsafeGet(param) {
  return DpContainer$Wonderjs.unsafeGetTimeRepoDp(undefined);
}

var set = TimeDpApService$Wonderjs.set;

exports.unsafeGet = unsafeGet;
exports.set = set;
/* No side effect */
