'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var IndicesVO$Wonderjs = require("../../value_object/IndicesVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");

function getIndices(geometry) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getIndices, GeometryEntity$Wonderjs.value(geometry)), IndicesVO$Wonderjs.create);
}

exports.getIndices = getIndices;
/* No side effect */
