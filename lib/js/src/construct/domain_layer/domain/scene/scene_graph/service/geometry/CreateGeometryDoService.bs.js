'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");
var IndexGeometryDoService$Wonderjs = require("./IndexGeometryDoService.bs.js");
var IndexComponentDoService$Wonderjs = require("../IndexComponentDoService.bs.js");
var BufferComponentDoService$Wonderjs = require("../BufferComponentDoService.bs.js");

function create(param) {
  var index = IndexGeometryDoService$Wonderjs.getMaxIndex(undefined);
  var newIndex = IndexComponentDoService$Wonderjs.generateIndex(index);
  IndexGeometryDoService$Wonderjs.setMaxIndex(newIndex);
  return Result$Wonderjs.mapSuccess(BufferComponentDoService$Wonderjs.checkNotExceedMaxCountByIndex(index, Curry._1(DpContainer$Wonderjs.unsafeGetPOConfigDp(undefined).getGeometryCount, undefined)), GeometryEntity$Wonderjs.create);
}

exports.create = create;
/* No side effect */
