'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var TexCoordsVO$Wonderjs = require("../../value_object/TexCoordsVO.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");

function getTexCoords(geometry) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getTexCoords, GeometryEntity$Wonderjs.value(geometry)), TexCoordsVO$Wonderjs.create);
}

exports.getTexCoords = getTexCoords;
/* No side effect */
