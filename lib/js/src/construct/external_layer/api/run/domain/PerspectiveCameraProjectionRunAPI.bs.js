'use strict';

var PerspectiveCameraProjectionApService$Wonderjs = require("../../../../application_layer/scene/PerspectiveCameraProjectionApService.bs.js");

function create(param) {
  return PerspectiveCameraProjectionApService$Wonderjs.create(undefined);
}

var getGameObject = PerspectiveCameraProjectionApService$Wonderjs.getGameObject;

var getPMatrix = PerspectiveCameraProjectionApService$Wonderjs.getPMatrix;

var getFovy = PerspectiveCameraProjectionApService$Wonderjs.getFovy;

var setFovy = PerspectiveCameraProjectionApService$Wonderjs.setFovy;

var getAspect = PerspectiveCameraProjectionApService$Wonderjs.getAspect;

var setAspect = PerspectiveCameraProjectionApService$Wonderjs.setAspect;

var getNear = PerspectiveCameraProjectionApService$Wonderjs.getNear;

var setNear = PerspectiveCameraProjectionApService$Wonderjs.setNear;

var getFar = PerspectiveCameraProjectionApService$Wonderjs.getFar;

var setFar = PerspectiveCameraProjectionApService$Wonderjs.setFar;

var markDirty = PerspectiveCameraProjectionApService$Wonderjs.markDirty;

var markNotDirty = PerspectiveCameraProjectionApService$Wonderjs.markNotDirty;

var update = PerspectiveCameraProjectionApService$Wonderjs.update;

exports.create = create;
exports.getGameObject = getGameObject;
exports.getPMatrix = getPMatrix;
exports.getFovy = getFovy;
exports.setFovy = setFovy;
exports.getAspect = getAspect;
exports.setAspect = setAspect;
exports.getNear = getNear;
exports.setNear = setNear;
exports.getFar = getFar;
exports.setFar = setFar;
exports.markDirty = markDirty;
exports.markNotDirty = markNotDirty;
exports.update = update;
/* PerspectiveCameraProjectionApService-Wonderjs Not a pure module */
