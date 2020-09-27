'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../library/log/Log.bs.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var Contract$Wonderjs = require("../../../../../library/contract/Contract.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var TexCoordsVO$Wonderjs = require("../../value_object/TexCoordsVO.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../../run/cloud_picture/infrastructure_layer/dependency/repo/scene/component/utils/TypeArrayCPRepoUtils.bs.js");

function getTexCoords(geometry) {
  return Result$Wonderjs.mapSuccess(Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).getTexCoords, GeometryEntity$Wonderjs.value(geometry)), TexCoordsVO$Wonderjs.create);
}

function setTexCoords(geometry, texCoords) {
  return Result$Wonderjs.bind(Contract$Wonderjs.requireCheck((function (param) {
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("texCoords in [0.0, 1.0]", "not"), (function (param) {
                                  return TypeArrayCPRepoUtils$Wonderjs.reduceFloat32Array(TexCoordsVO$Wonderjs.value(texCoords), true, (function (result, value) {
                                                if (result && Contract$Wonderjs.Operators.$great$eq$dot(value, 0.0)) {
                                                  return Contract$Wonderjs.Operators.$less$eq$dot(value, 1.0);
                                                } else {
                                                  return false;
                                                }
                                              }));
                                }));
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                return Curry._2(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).setTexCoords, GeometryEntity$Wonderjs.value(geometry), TexCoordsVO$Wonderjs.value(texCoords));
              }));
}

function hasTexCoords(geometry) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetGeometryRepoDp(undefined).hasTexCoords, GeometryEntity$Wonderjs.value(geometry));
}

exports.getTexCoords = getTexCoords;
exports.setTexCoords = setTexCoords;
exports.hasTexCoords = hasTexCoords;
/* No side effect */
