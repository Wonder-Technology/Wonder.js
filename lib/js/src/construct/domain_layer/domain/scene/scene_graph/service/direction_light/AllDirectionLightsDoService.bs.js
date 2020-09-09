'use strict';

var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var DirectionLightEntity$Wonderjs = require("../../entity/DirectionLightEntity.bs.js");
var IndexDirectionLightDoService$Wonderjs = require("./IndexDirectionLightDoService.bs.js");

function getAllLights(param) {
  return ListSt$Wonderjs.map(ListSt$Wonderjs.range(0, IndexDirectionLightDoService$Wonderjs.getMaxIndex(undefined)), DirectionLightEntity$Wonderjs.create);
}

function getLightCount(param) {
  return ListSt$Wonderjs.length(getAllLights(undefined));
}

exports.getAllLights = getAllLights;
exports.getLightCount = getLightCount;
/* No side effect */
