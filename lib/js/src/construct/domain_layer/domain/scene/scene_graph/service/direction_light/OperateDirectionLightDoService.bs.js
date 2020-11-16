'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Color3VO$Wonderjs = require("../../value_object/Color3VO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var IntensityVO$Wonderjs = require("../../value_object/IntensityVO.bs.js");
var DirectionLightEntity$Wonderjs = require("../../entity/DirectionLightEntity.bs.js");

function getColor(light) {
  return Color3VO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetDirectionLightRepoDp(undefined).getColor, DirectionLightEntity$Wonderjs.value(light)));
}

function getIntensity(light) {
  return IntensityVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetDirectionLightRepoDp(undefined).getIntensity, DirectionLightEntity$Wonderjs.value(light)));
}

exports.getColor = getColor;
exports.getIntensity = getIntensity;
/* No side effect */
