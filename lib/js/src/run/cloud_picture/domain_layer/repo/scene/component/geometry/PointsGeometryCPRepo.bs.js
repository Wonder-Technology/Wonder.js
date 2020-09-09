'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../../../construct/domain_layer/library/log/Log.bs.js");
var CPRepo$Wonderjs = require("../../../CPRepo.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Contract$Wonderjs = require("../../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var DpContainer$Wonderjs = require("../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");
var BufferGeometryCPRepoUtils$Wonderjs = require("./utils/BufferGeometryCPRepoUtils.bs.js");
var ReallocatedPointsGeometryCPRepoUtils$Wonderjs = require("./utils/ReallocatedPointsGeometryCPRepoUtils.bs.js");

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
                                            var x = startIndex / 3;
                                            return Contract$Wonderjs.Operators.$eq$eq$dot(x - Math.floor(x), 0.0);
                                          }));
                            }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined));
              }));
}

function getIndexInfo(index) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var indicesInfos = match.indicesInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getInfo(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), indicesInfos);
}

function getVerticesTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).vertices;
}

function getNormalsTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).normals;
}

function getIndicesTypeArr(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).indices;
}

exports.getVertexInfo = getVertexInfo;
exports.getIndexInfo = getIndexInfo;
exports.getVerticesTypeArr = getVerticesTypeArr;
exports.getNormalsTypeArr = getNormalsTypeArr;
exports.getIndicesTypeArr = getIndicesTypeArr;
/* CPRepo-Wonderjs Not a pure module */
