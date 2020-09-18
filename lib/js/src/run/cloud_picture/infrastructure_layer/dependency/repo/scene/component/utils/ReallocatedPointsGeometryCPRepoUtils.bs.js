'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../../../../construct/domain_layer/library/log/Log.bs.js");
var Result$Wonderjs = require("../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Contract$Wonderjs = require("../../../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var OtherConfigDpRunAPI$Wonderjs = require("../../../../../../../../construct/external_layer/api/run/dependency/OtherConfigDpRunAPI.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("./TypeArrayCPRepoUtils.bs.js");

function getInfo(infoIndex, infos) {
  return Contract$Wonderjs.ensureCheck([
              TypeArrayCPRepoUtils$Wonderjs.getUint32_1(infoIndex, infos),
              TypeArrayCPRepoUtils$Wonderjs.getUint32_1(infoIndex + 1 | 0, infos)
            ], (function (param) {
                var endIndex = param[1];
                var startIndex = param[0];
                Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("has info data", "not"), (function (param) {
                        return Contract$Wonderjs.assertNullableListExist({
                                    hd: startIndex,
                                    tl: {
                                      hd: endIndex,
                                      tl: /* [] */0
                                    }
                                  });
                      }));
                return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("endIndex >= startIndex", "is " + endIndex), (function (param) {
                              return Contract$Wonderjs.Operators.$great$eq(endIndex, startIndex);
                            }));
              }), Curry._1(OtherConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined));
}

function setInfo(infoIndex, startIndex, endIndex, infos) {
  return Result$Wonderjs.bind(Result$Wonderjs.bind(Contract$Wonderjs.requireCheck((function (param) {
                        Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("startIndex >= 0", "is " + startIndex), (function (param) {
                                return Contract$Wonderjs.Operators.$great$eq(startIndex, 0);
                              }));
                        return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("endIndex >= startIndex", "is " + endIndex), (function (param) {
                                      return Contract$Wonderjs.Operators.$great$eq(endIndex, startIndex);
                                    }));
                      }), Curry._1(OtherConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined)), (function (param) {
                    return TypeArrayCPRepoUtils$Wonderjs.setUint32_1(infoIndex, startIndex, infos);
                  })), (function (param) {
                return TypeArrayCPRepoUtils$Wonderjs.setUint32_1(infoIndex + 1 | 0, endIndex, infos);
              }));
}

function hasPointData(infoIndex, infos) {
  return Result$Wonderjs.mapSuccess(getInfo(infoIndex, infos), (function (param) {
                return param[1] > param[0];
              }));
}

function getFloat32PointData(infoIndex, points, infos) {
  return Result$Wonderjs.mapSuccess(getInfo(infoIndex, infos), (function (param) {
                return TypeArrayCPRepoUtils$Wonderjs.getFloat32Array(points, param[0], param[1]);
              }));
}

function _setPointData(param, fillTypeArrayFunc) {
  var offset = param[2];
  var newOffset = offset + param[3] | 0;
  return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(setInfo(param[0], offset, newOffset, param[1]), (function (param) {
                    return Curry._1(fillTypeArrayFunc, offset);
                  })), (function (param) {
                return newOffset;
              }));
}

var setFloat32PointData = _setPointData;

function getUint32PointData(infoIndex, points, infos) {
  return Result$Wonderjs.mapSuccess(getInfo(infoIndex, infos), (function (param) {
                return TypeArrayCPRepoUtils$Wonderjs.getUint32Array(points, param[0], param[1]);
              }));
}

var setUint32PointData = _setPointData;

exports.getInfo = getInfo;
exports.setInfo = setInfo;
exports.hasPointData = hasPointData;
exports.getFloat32PointData = getFloat32PointData;
exports._setPointData = _setPointData;
exports.setFloat32PointData = setFloat32PointData;
exports.getUint32PointData = getUint32PointData;
exports.setUint32PointData = setUint32PointData;
/* No side effect */
