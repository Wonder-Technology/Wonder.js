'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var BSDFMaterialEntity$Wonderjs = require("../../entity/BSDFMaterialEntity.bs.js");
var IndexComponentDoService$Wonderjs = require("../IndexComponentDoService.bs.js");
var BufferComponentDoService$Wonderjs = require("../BufferComponentDoService.bs.js");
var IndexBSDFMaterialDoService$Wonderjs = require("./IndexBSDFMaterialDoService.bs.js");

function create(param) {
  var index = IndexBSDFMaterialDoService$Wonderjs.getMaxIndex(undefined);
  var newIndex = IndexComponentDoService$Wonderjs.generateIndex(index);
  IndexBSDFMaterialDoService$Wonderjs.setMaxIndex(newIndex);
  return Result$Wonderjs.mapSuccess(BufferComponentDoService$Wonderjs.checkNotExceedMaxCountByIndex(index, Curry._1(DpContainer$Wonderjs.unsafeGetPOConfigDp(undefined).getBSDFMaterialCount, undefined)), BSDFMaterialEntity$Wonderjs.create);
}

exports.create = create;
/* No side effect */
