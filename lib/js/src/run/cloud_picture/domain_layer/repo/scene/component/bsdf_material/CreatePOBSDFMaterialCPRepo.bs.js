'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var ListResult$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/ListResult.bs.js");
var POConfigDpRunAPI$Wonderjs = require("../../../../../../../construct/external_layer/api/run/dependency/POConfigDpRunAPI.bs.js");
var BufferBSDFMaterialCPRepoUtils$Wonderjs = require("./utils/BufferBSDFMaterialCPRepoUtils.bs.js");
var CreateMapComponentCPRepoUtils$Wonderjs = require("../utils/CreateMapComponentCPRepoUtils.bs.js");
var CreateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs = require("./utils/CreateTypeArrayBSDFMaterialCPRepoUtils.bs.js");
var OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs = require("../../../../../infrastructure_layer/dependency/repo/scene/component/utils/OperateTypeArrayBSDFMaterialCPRepoUtils.bs.js");

function _setAllTypeArrDataToDefault(param, count, param$1) {
  var defaultIOR = param$1[6];
  var defaultTransmission = param$1[5];
  var defaultMetalness = param$1[4];
  var defaultRoughness = param$1[3];
  var defaultSpecularColor = param$1[2];
  var defaultSpecular = param$1[1];
  var defaultDiffuseColor = param$1[0];
  var iors = param[6];
  var transmissions = param[5];
  var metalnesses = param[4];
  var roughnesses = param[3];
  var specularColors = param[2];
  var speculars = param[1];
  var diffuseColors = param[0];
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.reduce(ListSt$Wonderjs.range(0, count - 1 | 0), Result$Wonderjs.succeed(undefined), (function (result, index) {
                    return Result$Wonderjs.bind(result, (function (param) {
                                  return ListResult$Wonderjs.mergeResults({
                                              hd: OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setDiffuseColor(index, defaultDiffuseColor, diffuseColors),
                                              tl: {
                                                hd: OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setSpecular(index, defaultSpecular, speculars),
                                                tl: {
                                                  hd: OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setSpecularColor(index, defaultSpecularColor, specularColors),
                                                  tl: {
                                                    hd: OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setRoughness(index, defaultRoughness, roughnesses),
                                                    tl: {
                                                      hd: OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setMetalness(index, defaultMetalness, metalnesses),
                                                      tl: {
                                                        hd: OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setTransmission(index, defaultTransmission, transmissions),
                                                        tl: {
                                                          hd: OperateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.setIOR(index, defaultIOR, iors),
                                                          tl: /* [] */0
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            });
                                }));
                  })), (function (param) {
                return [
                        diffuseColors,
                        speculars,
                        specularColors,
                        roughnesses,
                        metalnesses,
                        transmissions,
                        iors
                      ];
              }));
}

function _initBufferData(count, defaultDataTuple) {
  return Result$Wonderjs.bind(BufferBSDFMaterialCPRepoUtils$Wonderjs.createBuffer(count), (function (buffer) {
                return Result$Wonderjs.mapSuccess(_setAllTypeArrDataToDefault(CreateTypeArrayBSDFMaterialCPRepoUtils$Wonderjs.createTypeArrays(buffer, count), count, defaultDataTuple), (function (typeArrData) {
                              return [
                                      buffer,
                                      typeArrData
                                    ];
                            }));
              }));
}

function createPO(param) {
  var bsdfMaterialCount = Curry._1(POConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getBSDFMaterialCount, undefined);
  var defaultDiffuseColor = [
    1,
    1,
    1
  ];
  var defaultSpecularColor = [
    1,
    1,
    1
  ];
  return Result$Wonderjs.mapSuccess(_initBufferData(bsdfMaterialCount, [
                  defaultDiffuseColor,
                  1.0,
                  defaultSpecularColor,
                  1.0,
                  1.0,
                  0.0,
                  1.5
                ]), (function (param) {
                var match = param[1];
                return {
                        maxIndex: 0,
                        buffer: param[0],
                        diffuseColors: match[0],
                        speculars: match[1],
                        specularColors: match[2],
                        roughnesses: match[3],
                        metalnesses: match[4],
                        transmissions: match[5],
                        iors: match[6],
                        defaultDiffuseColor: defaultDiffuseColor,
                        defaultSpecular: 1.0,
                        defaultSpecularColor: defaultSpecularColor,
                        defaultRoughness: 1.0,
                        defaultMetalness: 1.0,
                        defaultTransmission: 0.0,
                        defaultIOR: 1.5,
                        gameObjectsMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(bsdfMaterialCount),
                        diffuseMapImageIdMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(bsdfMaterialCount),
                        channelRoughnessMetallicMapImageIdMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(bsdfMaterialCount),
                        emissionMapImageIdMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(bsdfMaterialCount),
                        normalMapImageIdMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(bsdfMaterialCount),
                        transmissionMapImageIdMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(bsdfMaterialCount),
                        specularMapImageIdMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(bsdfMaterialCount)
                      };
              }));
}

exports._setAllTypeArrDataToDefault = _setAllTypeArrDataToDefault;
exports._initBufferData = _initBufferData;
exports.createPO = createPO;
/* No side effect */
