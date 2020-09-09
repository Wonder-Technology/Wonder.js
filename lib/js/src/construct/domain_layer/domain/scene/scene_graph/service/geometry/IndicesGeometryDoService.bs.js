'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var IndicesVO$Wonderjs = require("../../value_object/IndicesVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");

function getIndices(geometry) {
  return Result$Wonderjs.mapSuccess(Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getIndices, GeometryEntity$Wonderjs.value(geometry)), IndicesVO$Wonderjs.create);
}

function setIndices(geometry, indices) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).setIndices, GeometryEntity$Wonderjs.value(geometry), IndicesVO$Wonderjs.value(indices));
}

function hasIndices(geometry) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).hasIndices, GeometryEntity$Wonderjs.value(geometry));
}

function getIndicesCount(geometry) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getIndicesCount, GeometryEntity$Wonderjs.value(geometry));
}

exports.getIndices = getIndices;
exports.setIndices = setIndices;
exports.hasIndices = hasIndices;
exports.getIndicesCount = getIndicesCount;
/* No side effect */
