'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var PBRMaterialEntity$Wonderjs = require("../../entity/PBRMaterialEntity.bs.js");
var IndexComponentDoService$Wonderjs = require("../IndexComponentDoService.bs.js");
var BufferComponentDoService$Wonderjs = require("../BufferComponentDoService.bs.js");
var IndexPBRMaterialDoService$Wonderjs = require("./IndexPBRMaterialDoService.bs.js");

function create(param) {
  var index = IndexPBRMaterialDoService$Wonderjs.getMaxIndex(undefined);
  var newIndex = IndexComponentDoService$Wonderjs.generateIndex(index);
  IndexPBRMaterialDoService$Wonderjs.setMaxIndex(newIndex);
  return Result$Wonderjs.mapSuccess(BufferComponentDoService$Wonderjs.checkNotExceedMaxCountByIndex(index, Curry._1(DpContainer$Wonderjs.unsafeGetPOConfigDp(undefined).getPBRMaterialCount, undefined)), PBRMaterialEntity$Wonderjs.create);
}

exports.create = create;
/* No side effect */
