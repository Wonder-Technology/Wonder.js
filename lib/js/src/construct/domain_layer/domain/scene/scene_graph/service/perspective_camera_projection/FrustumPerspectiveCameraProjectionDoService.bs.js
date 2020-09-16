'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var FarVO$Wonderjs = require("../../value_object/FarVO.bs.js");
var FovyVO$Wonderjs = require("../../value_object/FovyVO.bs.js");
var NearVO$Wonderjs = require("../../value_object/NearVO.bs.js");
var AspectVO$Wonderjs = require("../../value_object/AspectVO.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var PerspectiveCameraProjectionEntity$Wonderjs = require("../../entity/PerspectiveCameraProjectionEntity.bs.js");

function getFovy(cameraProjection) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getFovy, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)), FovyVO$Wonderjs.create);
}

function setFovy(cameraProjection, fovy) {
  Curry._2(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).setFovy, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection), FovyVO$Wonderjs.value(fovy));
  return Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).markDirty, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection));
}

function getAspect(cameraProjection) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getAspect, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)), AspectVO$Wonderjs.create);
}

function setAspect(cameraProjection, aspect) {
  Curry._2(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).setAspect, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection), AspectVO$Wonderjs.value(aspect));
  return Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).markDirty, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection));
}

function getNear(cameraProjection) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getNear, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)), NearVO$Wonderjs.create);
}

function setNear(cameraProjection, near) {
  Curry._2(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).setNear, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection), NearVO$Wonderjs.value(near));
  return Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).markDirty, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection));
}

function getFar(cameraProjection) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getFar, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)), FarVO$Wonderjs.create);
}

function setFar(cameraProjection, far) {
  Curry._2(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).setFar, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection), FarVO$Wonderjs.value(far));
  return Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).markDirty, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection));
}

function computeAspect(param) {
  return AspectVO$Wonderjs.create(param[0] / param[1]);
}

exports.getFovy = getFovy;
exports.setFovy = setFovy;
exports.getAspect = getAspect;
exports.setAspect = setAspect;
exports.getNear = getNear;
exports.setNear = setNear;
exports.getFar = getFar;
exports.setFar = setFar;
exports.computeAspect = computeAspect;
/* No side effect */
