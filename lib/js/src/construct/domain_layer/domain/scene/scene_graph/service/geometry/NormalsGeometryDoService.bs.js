'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var NormalsVO$Wonderjs = require("../../value_object/NormalsVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");

function getNormals(geometry) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getNormals, GeometryEntity$Wonderjs.value(geometry)), NormalsVO$Wonderjs.create);
}

exports.getNormals = getNormals;
/* No side effect */
