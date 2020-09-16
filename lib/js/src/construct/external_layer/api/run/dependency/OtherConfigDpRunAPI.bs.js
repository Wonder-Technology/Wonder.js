'use strict';

var DpContainer$Wonderjs = require("../../../../domain_layer/dependency/container/DpContainer.bs.js");
var OtherConfigDpApService$Wonderjs = require("../../../../application_layer/dependency/OtherConfigDpApService.bs.js");

function unsafeGet(param) {
  return DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined);
}

var set = OtherConfigDpApService$Wonderjs.set;

exports.unsafeGet = unsafeGet;
exports.set = set;
/* No side effect */
