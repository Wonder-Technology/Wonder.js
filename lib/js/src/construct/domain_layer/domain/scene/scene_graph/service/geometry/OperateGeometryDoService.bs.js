'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");

function isFlipTexCoordY(geometry) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).isFlipTexCoordY, GeometryEntity$Wonderjs.value(geometry));
}

function isSame(geometry1, geometry2) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).isSame, GeometryEntity$Wonderjs.value(geometry1), GeometryEntity$Wonderjs.value(geometry2));
}

function getId(geometry) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getId, GeometryEntity$Wonderjs.value(geometry));
}

exports.isFlipTexCoordY = isFlipTexCoordY;
exports.isSame = isSame;
exports.getId = getId;
/* No side effect */
