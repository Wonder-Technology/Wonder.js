'use strict';

var OptionService$Wonderjs = require("../../../../../../src/service/atom/OptionService.js");

function unsafeGetObjectInstanceTransformCollections(param) {
  var sourceInstanceRecord = param[/* sourceInstanceRecord */11];
  return OptionService$Wonderjs.unsafeGet(sourceInstanceRecord[/* objectInstanceTransformCollections */1]);
}

function unsafeGetIsTransformStatics(param) {
  var sourceInstanceRecord = param[/* sourceInstanceRecord */11];
  return OptionService$Wonderjs.unsafeGet(sourceInstanceRecord[/* isTransformStatics */2]);
}

exports.unsafeGetObjectInstanceTransformCollections = unsafeGetObjectInstanceTransformCollections;
exports.unsafeGetIsTransformStatics = unsafeGetIsTransformStatics;
/* OptionService-Wonderjs Not a pure module */
