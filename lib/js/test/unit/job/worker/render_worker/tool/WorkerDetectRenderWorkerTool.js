'use strict';

var OptionService$Wonderjs = require("../../../../../../src/service/atom/OptionService.js");

function getRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* workerDetectRecord */27]);
}

exports.getRecord = getRecord;
/* OptionService-Wonderjs Not a pure module */
