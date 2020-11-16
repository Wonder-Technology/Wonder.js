'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var VerticesVO$Wonderjs = require("../../value_object/VerticesVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");

function getVertices(geometry) {
  return VerticesVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getVertices, GeometryEntity$Wonderjs.value(geometry)));
}

exports.getVertices = getVertices;
/* No side effect */
