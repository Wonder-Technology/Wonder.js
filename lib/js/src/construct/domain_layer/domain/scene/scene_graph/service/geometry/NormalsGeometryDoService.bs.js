'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var NormalsVO$Wonderjs = require("../../value_object/NormalsVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");

function getNormals(geometry) {
  return Result$Wonderjs.mapSuccess(Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getNormals, GeometryEntity$Wonderjs.value(geometry)), NormalsVO$Wonderjs.create);
}

function setNormals(geometry, normals) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).setNormals, GeometryEntity$Wonderjs.value(geometry), NormalsVO$Wonderjs.value(normals));
}

function hasNormals(geometry) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).hasNormals, GeometryEntity$Wonderjs.value(geometry));
}

exports.getNormals = getNormals;
exports.setNormals = setNormals;
exports.hasNormals = hasNormals;
/* No side effect */
