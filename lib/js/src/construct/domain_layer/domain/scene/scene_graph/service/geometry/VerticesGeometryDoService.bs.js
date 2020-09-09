'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var VerticesVO$Wonderjs = require("../../value_object/VerticesVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");

function getVertices(geometry) {
  return Result$Wonderjs.mapSuccess(Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getVertices, GeometryEntity$Wonderjs.value(geometry)), VerticesVO$Wonderjs.create);
}

function setVertices(geometry, vertices) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).setVertices, GeometryEntity$Wonderjs.value(geometry), VerticesVO$Wonderjs.value(vertices));
}

function hasVertices(geometry) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).hasVertices, GeometryEntity$Wonderjs.value(geometry));
}

exports.getVertices = getVertices;
exports.setVertices = setVertices;
exports.hasVertices = hasVertices;
/* No side effect */
