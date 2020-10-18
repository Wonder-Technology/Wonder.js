'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var POConfigDpRunAPI$Wonderjs = require("../../../../../../../construct/external_layer/api/run/dependency/POConfigDpRunAPI.bs.js");
var CreateMapComponentCPRepoUtils$Wonderjs = require("../utils/CreateMapComponentCPRepoUtils.bs.js");
var BufferDirectionLightCPRepoUtils$Wonderjs = require("./utils/BufferDirectionLightCPRepoUtils.bs.js");
var CreateTypeArrayDirectionLightCPRepoUtils$Wonderjs = require("./utils/CreateTypeArrayDirectionLightCPRepoUtils.bs.js");
var OperateTypeArrayDirectionLightCPRepoUtils$Wonderjs = require("../../../../../infrastructure_layer/dependency/repo/scene/component/utils/OperateTypeArrayDirectionLightCPRepoUtils.bs.js");

function _setAllTypeArrDataToDefault(param, count, param$1) {
  var defaultIntensity = param$1[1];
  var defaultColor = param$1[0];
  var intensities = param[1];
  var colors = param[0];
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.reduce(ListSt$Wonderjs.range(0, count - 1 | 0), Result$Wonderjs.succeed(undefined), (function (result, index) {
                    return Result$Wonderjs.bind(result, (function (param) {
                                  return Result$Wonderjs.bind(OperateTypeArrayDirectionLightCPRepoUtils$Wonderjs.setColor(index, defaultColor, colors), (function (param) {
                                                return OperateTypeArrayDirectionLightCPRepoUtils$Wonderjs.setIntensity(index, defaultIntensity, intensities);
                                              }));
                                }));
                  })), (function (param) {
                return [
                        colors,
                        intensities
                      ];
              }));
}

function _initBufferData(count, defaultDataTuple) {
  return Result$Wonderjs.bind(BufferDirectionLightCPRepoUtils$Wonderjs.createBuffer(count), (function (buffer) {
                return Result$Wonderjs.mapSuccess(_setAllTypeArrDataToDefault(CreateTypeArrayDirectionLightCPRepoUtils$Wonderjs.createTypeArrays(buffer, count), count, defaultDataTuple), (function (typeArrData) {
                              return [
                                      buffer,
                                      typeArrData
                                    ];
                            }));
              }));
}

function createPO(param) {
  var lightCount = Curry._1(POConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getDirectionLightCount, undefined);
  return Result$Wonderjs.mapSuccess(_initBufferData(lightCount, [
                  [
                    1,
                    1,
                    1
                  ],
                  1.0
                ]), (function (param) {
                var match = param[1];
                return {
                        maxIndex: 0,
                        buffer: param[0],
                        colors: match[0],
                        intensities: match[1],
                        gameObjectMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(lightCount)
                      };
              }));
}

exports._setAllTypeArrDataToDefault = _setAllTypeArrDataToDefault;
exports._initBufferData = _initBufferData;
exports.createPO = createPO;
/* No side effect */
