'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var BasicCameraViewEntity$Wonderjs = require("../../entity/BasicCameraViewEntity.bs.js");

function isActive(cameraView) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetBasicCameraViewRepoDp(undefined).isActive, BasicCameraViewEntity$Wonderjs.value(cameraView));
}

function active(cameraView) {
  Curry._1(DpContainer$Wonderjs.unsafeGetBasicCameraViewRepoDp(undefined).setAllNotActive, undefined);
  return Curry._2(DpContainer$Wonderjs.unsafeGetBasicCameraViewRepoDp(undefined).setActive, BasicCameraViewEntity$Wonderjs.value(cameraView), true);
}

function unactive(cameraView) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBasicCameraViewRepoDp(undefined).setActive, BasicCameraViewEntity$Wonderjs.value(cameraView), false);
}

function setActive(cameraView, isActive) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBasicCameraViewRepoDp(undefined).setActive, BasicCameraViewEntity$Wonderjs.value(cameraView), isActive);
}

function getActiveCameraView(param) {
  return Result$Wonderjs.mapSuccess(Curry._1(DpContainer$Wonderjs.unsafeGetBasicCameraViewRepoDp(undefined).getActiveBasicCameraViews, undefined), (function (activeCameraViews) {
                return OptionSt$Wonderjs.map(ListSt$Wonderjs.head(activeCameraViews), BasicCameraViewEntity$Wonderjs.create);
              }));
}

exports.isActive = isActive;
exports.active = active;
exports.unactive = unactive;
exports.setActive = setActive;
exports.getActiveCameraView = getActiveCameraView;
/* No side effect */
