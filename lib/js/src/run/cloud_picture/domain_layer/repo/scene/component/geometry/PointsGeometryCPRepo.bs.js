'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../../../construct/domain_layer/library/log/Log.bs.js");
var CPRepo$Wonderjs = require("../../../../../infrastructure_layer/data/container/CPRepo.bs.js");
var Number$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Number.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Contract$Wonderjs = require("../../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var DpContainer$Wonderjs = require("../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");
var OtherConfigDpRunAPI$Wonderjs = require("../../../../../../../construct/external_layer/api/run/dependency/OtherConfigDpRunAPI.bs.js");
var BufferGeometryCPRepoUtils$Wonderjs = require("../../../../../infrastructure_layer/dependency/repo/scene/component/utils/BufferGeometryCPRepoUtils.bs.js");
var ReallocatedPointsGeometryCPRepoUtils$Wonderjs = require("../../../../../infrastructure_layer/dependency/repo/scene/component/utils/ReallocatedPointsGeometryCPRepoUtils.bs.js");

function getVertexInfo(index) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var verticesInfos = match.verticesInfos;
  return Result$Wonderjs.bind(ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getInfo(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), verticesInfos), (function (param) {
                return Contract$Wonderjs.ensureCheck([
                            param[0],
                            param[1]
                          ], (function (param) {
                              var endIndex = param[1];
                              var startIndex = param[0];
                              Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("equal to the info get from normals", "not equal"), (function (param) {
                                      var match = CPRepo$Wonderjs.getExnGeometry(undefined);
                                      var normalsInfos = match.normalsInfos;
                                      var match$1 = Result$Wonderjs.getExn(ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getInfo(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), normalsInfos));
                                      if (Contract$Wonderjs.Operators.$eq(startIndex, match$1[0])) {
                                        return Contract$Wonderjs.Operators.$eq(endIndex, match$1[1]);
                                      } else {
                                        return false;
                                      }
                                    }));
                              return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("startIndex:" + startIndex + " is 3 times", "not"), (function (param) {
                                            var x = Number$Wonderjs.dividInt(startIndex, 3);
                                            return Contract$Wonderjs.Operators.$eq$eq$dot(x - Math.floor(x), 0.0);
                                          }));
                            }), Curry._1(OtherConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined));
              }));
}

function getIndexInfo(index) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var indicesInfos = match.indicesInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getInfo(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), indicesInfos);
}

function _getVerticesTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).vertices;
}

function _getTexCoordsTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).texCoords;
}

function _getNormalsTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).normals;
}

function _getTangentsTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).tangents;
}

function _getIndicesTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).indices;
}

function getVerticesOffset(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).verticesOffset;
}

function getVertexCount(param) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("verticesOffset be 3 times", "not"), (function (param) {
                                  var x = Number$Wonderjs.dividInt(CPRepo$Wonderjs.getExnGeometry(undefined).verticesOffset, 3);
                                  return Contract$Wonderjs.Operators.$eq$eq$dot(x - Math.floor(x), 0.0);
                                }));
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                return CPRepo$Wonderjs.getExnGeometry(undefined).verticesOffset / 3 | 0;
              }));
}

function _getTexCoordsOffset(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).texCoordsOffset;
}

function getNormalsOffset(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).normalsOffset;
}

function _getTangentsOffset(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).tangentsOffset;
}

function _getIndicesOffset(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).indicesOffset;
}

function getSubUsedVerticesTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).vertices.subarray(0, CPRepo$Wonderjs.getExnGeometry(undefined).verticesOffset);
}

function getSubUsedTexCoordsTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).texCoords.subarray(0, CPRepo$Wonderjs.getExnGeometry(undefined).texCoordsOffset);
}

function getSubUsedNormalsTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).normals.subarray(0, CPRepo$Wonderjs.getExnGeometry(undefined).normalsOffset);
}

function getSubUsedTangentsTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).tangents.subarray(0, CPRepo$Wonderjs.getExnGeometry(undefined).tangentsOffset);
}

function getSubUsedIndicesTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).indices.subarray(0, CPRepo$Wonderjs.getExnGeometry(undefined).indicesOffset);
}

function getCopyUsedIndicesTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).indices.slice(0, CPRepo$Wonderjs.getExnGeometry(undefined).indicesOffset);
}

exports.getVertexInfo = getVertexInfo;
exports.getIndexInfo = getIndexInfo;
exports._getVerticesTypeArr = _getVerticesTypeArr;
exports._getTexCoordsTypeArr = _getTexCoordsTypeArr;
exports._getNormalsTypeArr = _getNormalsTypeArr;
exports._getTangentsTypeArr = _getTangentsTypeArr;
exports._getIndicesTypeArr = _getIndicesTypeArr;
exports.getVerticesOffset = getVerticesOffset;
exports.getVertexCount = getVertexCount;
exports._getTexCoordsOffset = _getTexCoordsOffset;
exports.getNormalsOffset = getNormalsOffset;
exports._getTangentsOffset = _getTangentsOffset;
exports._getIndicesOffset = _getIndicesOffset;
exports.getSubUsedVerticesTypeArr = getSubUsedVerticesTypeArr;
exports.getSubUsedTexCoordsTypeArr = getSubUsedTexCoordsTypeArr;
exports.getSubUsedNormalsTypeArr = getSubUsedNormalsTypeArr;
exports.getSubUsedTangentsTypeArr = getSubUsedTangentsTypeArr;
exports.getSubUsedIndicesTypeArr = getSubUsedIndicesTypeArr;
exports.getCopyUsedIndicesTypeArr = getCopyUsedIndicesTypeArr;
/* CPRepo-Wonderjs Not a pure module */
