'use strict';

var StateAPI$Wonderjs = require("../../../../src/api/StateAPI.js");
var IsDebugMainService$Wonderjs = require("../../../../src/service/state/main/state/IsDebugMainService.js");

var setIsDebug = StateAPI$Wonderjs.setIsDebug;

var getIsDebug = IsDebugMainService$Wonderjs.getIsDebug;

exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
/* StateAPI-Wonderjs Not a pure module */
