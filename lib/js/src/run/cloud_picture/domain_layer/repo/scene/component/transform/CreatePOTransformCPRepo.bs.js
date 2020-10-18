'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var POConfigDpRunAPI$Wonderjs = require("../../../../../../../construct/external_layer/api/run/dependency/POConfigDpRunAPI.bs.js");
var BufferTransformCPRepoUtils$Wonderjs = require("./utils/BufferTransformCPRepoUtils.bs.js");
var CreateMapComponentCPRepoUtils$Wonderjs = require("../utils/CreateMapComponentCPRepoUtils.bs.js");
var CreateTypeArrayTransformCPRepoUtils$Wonderjs = require("./utils/CreateTypeArrayTransformCPRepoUtils.bs.js");
var OperateTypeArrayTransformCPRepoUtils$Wonderjs = require("../../../../../infrastructure_layer/dependency/repo/scene/component/utils/OperateTypeArrayTransformCPRepoUtils.bs.js");

function _setAllTypeArrDataToDefault(param, count, param$1) {
  var defaultLocalScale = param$1[3];
  var defaultLocalRotation = param$1[2];
  var defaultLocalPosition = param$1[1];
  var defaultLocalToWorldMatrix = param$1[0];
  var localScales = param[3];
  var localRotations = param[2];
  var localPositions = param[1];
  var localToWorldMatrices = param[0];
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.reduce(ListSt$Wonderjs.range(0, count - 1 | 0), Result$Wonderjs.succeed(undefined), (function (result, index) {
                    return Result$Wonderjs.bind(result, (function (param) {
                                  return Result$Wonderjs.bind(OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalToWorldMatrix(index, defaultLocalToWorldMatrix, localToWorldMatrices), (function (param) {
                                                return Result$Wonderjs.bind(OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalPosition(index, defaultLocalPosition, localPositions), (function (param) {
                                                              return Result$Wonderjs.bind(OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalRotation(index, defaultLocalRotation, localRotations), (function (param) {
                                                                            return OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalScale(index, defaultLocalScale, localScales);
                                                                          }));
                                                            }));
                                              }));
                                }));
                  })), (function (param) {
                return [
                        localToWorldMatrices,
                        localPositions,
                        localRotations,
                        localScales
                      ];
              }));
}

function _initBufferData(count, defaultDataTuple) {
  return Result$Wonderjs.bind(BufferTransformCPRepoUtils$Wonderjs.createBuffer(count), (function (buffer) {
                return Result$Wonderjs.mapSuccess(_setAllTypeArrDataToDefault(CreateTypeArrayTransformCPRepoUtils$Wonderjs.createTypeArrays(buffer, count), count, defaultDataTuple), (function (typeArrData) {
                              return [
                                      buffer,
                                      typeArrData
                                    ];
                            }));
              }));
}

function createPO(param) {
  var transformCount = Curry._1(POConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getTransformCount, undefined);
  var defaultLocalToWorldMatrix = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ];
  var defaultLocalPosition = [
    0,
    0,
    0
  ];
  var defaultLocalRotation = [
    0,
    0,
    0,
    1
  ];
  var defaultLocalScale = [
    1,
    1,
    1
  ];
  return Result$Wonderjs.mapSuccess(_initBufferData(transformCount, [
                  defaultLocalToWorldMatrix,
                  defaultLocalPosition,
                  defaultLocalRotation,
                  defaultLocalScale
                ]), (function (param) {
                var match = param[1];
                return {
                        maxIndex: 0,
                        buffer: param[0],
                        localToWorldMatrices: match[0],
                        localPositions: match[1],
                        localRotations: match[2],
                        localScales: match[3],
                        defaultLocalToWorldMatrix: defaultLocalToWorldMatrix,
                        defaultLocalPosition: defaultLocalPosition,
                        defaultLocalRotation: defaultLocalRotation,
                        defaultLocalScale: defaultLocalScale,
                        parentMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(transformCount),
                        childrenMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(transformCount),
                        gameObjectMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(transformCount),
                        dirtyMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(transformCount)
                      };
              }));
}

exports._setAllTypeArrDataToDefault = _setAllTypeArrDataToDefault;
exports._initBufferData = _initBufferData;
exports.createPO = createPO;
/* No side effect */
