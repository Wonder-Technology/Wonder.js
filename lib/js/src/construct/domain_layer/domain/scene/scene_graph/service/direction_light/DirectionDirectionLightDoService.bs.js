'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DirectionVO$Wonderjs = require("../../value_object/DirectionVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var DirectionLightEntity$Wonderjs = require("../../entity/DirectionLightEntity.bs.js");

function getDirection(light) {
  return DirectionVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetDirectionLightRepoDp(undefined).getDirection, DirectionLightEntity$Wonderjs.value(light)));
}

exports.getDirection = getDirection;
/* No side effect */
