'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var DirectionLightEntity$Wonderjs = require("../../entity/DirectionLightEntity.bs.js");
var IndexComponentDoService$Wonderjs = require("../IndexComponentDoService.bs.js");
var BufferComponentDoService$Wonderjs = require("../BufferComponentDoService.bs.js");
var IndexDirectionLightDoService$Wonderjs = require("./IndexDirectionLightDoService.bs.js");

function create(param) {
  var index = IndexDirectionLightDoService$Wonderjs.getMaxIndex(undefined);
  var newIndex = IndexComponentDoService$Wonderjs.generateIndex(index);
  IndexDirectionLightDoService$Wonderjs.setMaxIndex(newIndex);
  return Result$Wonderjs.mapSuccess(BufferComponentDoService$Wonderjs.checkNotExceedMaxCountByIndex(index, Curry._1(DpContainer$Wonderjs.unsafeGetPOConfigDp(undefined).getDirectionLightCount, undefined)), DirectionLightEntity$Wonderjs.create);
}

exports.create = create;
/* No side effect */
