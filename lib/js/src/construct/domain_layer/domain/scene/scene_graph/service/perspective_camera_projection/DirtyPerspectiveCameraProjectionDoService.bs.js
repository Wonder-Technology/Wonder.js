'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var PerspectiveCameraProjectionEntity$Wonderjs = require("../../entity/PerspectiveCameraProjectionEntity.bs.js");

function markDirty(cameraProjection) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).markDirty, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection));
}

function markNotDirty(cameraProjection) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).markNotDirty, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection));
}

function getUniqueDirtyList(param) {
  return ListSt$Wonderjs.map(ListSt$Wonderjs.removeDuplicateItems(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getDirtyList, undefined)), PerspectiveCameraProjectionEntity$Wonderjs.create);
}

exports.markDirty = markDirty;
exports.markNotDirty = markNotDirty;
exports.getUniqueDirtyList = getUniqueDirtyList;
/* No side effect */
