'use strict';

var BufferSettingService$Wonderjs = require("../../../../src/service/record/main/setting/BufferSettingService.js");

function getBasicMaterialCount(state) {
  return BufferSettingService$Wonderjs.getBasicMaterialCount(state[/* settingRecord */0]);
}

exports.getBasicMaterialCount = getBasicMaterialCount;
/* BufferSettingService-Wonderjs Not a pure module */
