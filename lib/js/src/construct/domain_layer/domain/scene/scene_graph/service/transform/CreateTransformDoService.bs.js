'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var TransformEntity$Wonderjs = require("../../entity/TransformEntity.bs.js");
var IndexComponentDoService$Wonderjs = require("../IndexComponentDoService.bs.js");
var IndexTransformDoService$Wonderjs = require("./IndexTransformDoService.bs.js");
var BufferComponentDoService$Wonderjs = require("../BufferComponentDoService.bs.js");

function _initDataWhenCreate(index) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).setChildren, index, /* [] */0);
}

function create(param) {
  var index = IndexTransformDoService$Wonderjs.getMaxIndex(undefined);
  var newIndex = IndexComponentDoService$Wonderjs.generateIndex(index);
  IndexTransformDoService$Wonderjs.setMaxIndex(newIndex);
  _initDataWhenCreate(index);
  Curry._2(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).setIsDirty, index, true);
  return Result$Wonderjs.mapSuccess(BufferComponentDoService$Wonderjs.checkNotExceedMaxCountByIndex(index, Curry._1(DpContainer$Wonderjs.unsafeGetPOConfigDp(undefined).getTransformCount, undefined)), TransformEntity$Wonderjs.create);
}

exports._initDataWhenCreate = _initDataWhenCreate;
exports.create = create;
/* No side effect */
