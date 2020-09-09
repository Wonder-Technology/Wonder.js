'use strict';

var ListSt$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var POConfigCPRepo$Wonderjs = require("../../../POConfigCPRepo.bs.js");
var BufferPBRMaterialCPRepoUtils$Wonderjs = require("./utils/BufferPBRMaterialCPRepoUtils.bs.js");
var CreateMapComponentCPRepoUtils$Wonderjs = require("../utils/CreateMapComponentCPRepoUtils.bs.js");
var CreateTypeArrayPBRMaterialCPRepoUtils$Wonderjs = require("./utils/CreateTypeArrayPBRMaterialCPRepoUtils.bs.js");
var OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs = require("./utils/OperateTypeArrayPBRMaterialCPRepoUtils.bs.js");

function _setAllTypeArrDataToDefault(param, count, param$1) {
  var defaultMetalness = param$1[3];
  var defaultRoughness = param$1[2];
  var defaultSpecular = param$1[1];
  var defaultDiffuseColor = param$1[0];
  var metalnesses = param[3];
  var roughnesses = param[2];
  var speculars = param[1];
  var diffuseColors = param[0];
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.reduce(ListSt$Wonderjs.range(0, count - 1 | 0), Result$Wonderjs.succeed(undefined), (function (result, index) {
                    return Result$Wonderjs.bind(result, (function (param) {
                                  return Result$Wonderjs.bind(OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.setDiffuseColor(index, defaultDiffuseColor, diffuseColors), (function (param) {
                                                return Result$Wonderjs.bind(OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.setSpecular(index, defaultSpecular, speculars), (function (param) {
                                                              return Result$Wonderjs.bind(OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.setRoughness(index, defaultRoughness, roughnesses), (function (param) {
                                                                            return OperateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.setMetalness(index, defaultMetalness, metalnesses);
                                                                          }));
                                                            }));
                                              }));
                                }));
                  })), (function (param) {
                return [
                        diffuseColors,
                        speculars,
                        roughnesses,
                        metalnesses
                      ];
              }));
}

function _initBufferData(count, defaultDataTuple) {
  return Result$Wonderjs.bind(BufferPBRMaterialCPRepoUtils$Wonderjs.createBuffer(count), (function (buffer) {
                return Result$Wonderjs.mapSuccess(_setAllTypeArrDataToDefault(CreateTypeArrayPBRMaterialCPRepoUtils$Wonderjs.createTypeArrays(buffer, count), count, defaultDataTuple), (function (typeArrData) {
                              return [
                                      buffer,
                                      typeArrData
                                    ];
                            }));
              }));
}

function createPO(param) {
  var pbrMaterialCount = POConfigCPRepo$Wonderjs.getPBRMaterialCount(undefined);
  var defaultDiffuseColor = [
    1,
    1,
    1
  ];
  return Result$Wonderjs.mapSuccess(_initBufferData(pbrMaterialCount, [
                  defaultDiffuseColor,
                  0.0,
                  0.0,
                  0.0
                ]), (function (param) {
                var match = param[1];
                return {
                        maxIndex: 0,
                        buffer: param[0],
                        diffuseColors: match[0],
                        speculars: match[1],
                        roughnesses: match[2],
                        metalnesses: match[3],
                        defaultDiffuseColor: defaultDiffuseColor,
                        defaultSpecular: 0.0,
                        defaultRoughness: 0.0,
                        defaultMetalness: 0.0,
                        gameObjectsMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(pbrMaterialCount)
                      };
              }));
}

exports._setAllTypeArrDataToDefault = _setAllTypeArrDataToDefault;
exports._initBufferData = _initBufferData;
exports.createPO = createPO;
/* POConfigCPRepo-Wonderjs Not a pure module */
