'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var FarVO$Wonderjs = require("../../value_object/FarVO.bs.js");
var FovyVO$Wonderjs = require("../../value_object/FovyVO.bs.js");
var NearVO$Wonderjs = require("../../value_object/NearVO.bs.js");
var AspectVO$Wonderjs = require("../../value_object/AspectVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var PerspectiveCameraProjectionEntity$Wonderjs = require("../../entity/PerspectiveCameraProjectionEntity.bs.js");

function getFovy(cameraProjection) {
  return FovyVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getFovy, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)));
}

function getAspect(cameraProjection) {
  return AspectVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getAspect, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)));
}

function getNear(cameraProjection) {
  return NearVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getNear, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)));
}

function getFar(cameraProjection) {
  return FarVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getFar, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)));
}

exports.getFovy = getFovy;
exports.getAspect = getAspect;
exports.getNear = getNear;
exports.getFar = getFar;
/* No side effect */
