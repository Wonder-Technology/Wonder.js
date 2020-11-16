'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var TangentsVO$Wonderjs = require("../../value_object/TangentsVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");

function getTangents(geometry) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getTangents, GeometryEntity$Wonderjs.value(geometry)), TangentsVO$Wonderjs.create);
}

exports.getTangents = getTangents;
/* No side effect */
