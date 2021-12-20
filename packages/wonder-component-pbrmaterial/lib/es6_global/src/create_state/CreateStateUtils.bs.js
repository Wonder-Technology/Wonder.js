

import * as ListSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as CreateMapComponentUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/CreateMapComponentUtils.bs.js";
import * as BufferPBRMaterialUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/pbrmaterial/BufferPBRMaterialUtils.bs.js";
import * as CreateTypeArrayPBRMaterialUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/pbrmaterial/CreateTypeArrayPBRMaterialUtils.bs.js";
import * as OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial from "../utils/OperateTypeArrayPBRMaterialUtils.bs.js";

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
  ListSt$WonderCommonlib.forEach(ListSt$WonderCommonlib.range(0, count - 1 | 0), (function (index) {
          OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial.setDiffuseColor(index, defaultDiffuseColor, diffuseColors);
          OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial.setSpecular(index, defaultSpecular, speculars);
          OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial.setSpecularColor(index, defaultSpecularColor, specularColors);
          OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial.setRoughness(index, defaultRoughness, roughnesses);
          OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial.setMetalness(index, defaultMetalness, metalnesses);
          OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial.setTransmission(index, defaultTransmission, transmissions);
          return OperateTypeArrayPBRMaterialUtils$WonderComponentPbrmaterial.setIOR(index, defaultIOR, iors);
        }));
  return [
          diffuseColors,
          speculars,
          specularColors,
          roughnesses,
          metalnesses,
          transmissions,
          iors
        ];
}

function _initBufferData(count, defaultDataTuple) {
  var buffer = BufferPBRMaterialUtils$WonderComponentWorkerUtils.createBuffer(count);
  var typeArrData = _setAllTypeArrDataToDefault(CreateTypeArrayPBRMaterialUtils$WonderComponentWorkerUtils.createTypeArrays(buffer, count), count, defaultDataTuple);
  return [
          buffer,
          typeArrData
        ];
}

function createStateWithSharedArrayBufferData(param, param$1, param$2) {
  var pbrMaterialCount = param[1];
  var diffuseColors = param$2.diffuseColors;
  var speculars = param$2.speculars;
  var specularColors = param$2.specularColors;
  var roughnesses = param$2.roughnesses;
  var metalnesses = param$2.metalnesses;
  var transmissions = param$2.transmissions;
  var iors = param$2.iors;
  return {
          config: {
            isDebug: param[0],
            pbrMaterialCount: pbrMaterialCount
          },
          maxIndex: 0,
          buffer: param$2.buffer,
          diffuseColors: diffuseColors,
          speculars: speculars,
          specularColors: specularColors,
          roughnesses: roughnesses,
          metalnesses: metalnesses,
          transmissions: transmissions,
          iors: iors,
          defaultDiffuseColor: param$1[0],
          defaultSpecular: param$1[1],
          defaultSpecularColor: param$1[2],
          defaultRoughness: param$1[3],
          defaultMetalness: param$1[4],
          defaultTransmission: param$1[5],
          defaultIOR: param$1[6],
          gameObjectsMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(pbrMaterialCount),
          gameObjectPBRMaterialMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(pbrMaterialCount),
          diffuseMapMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(pbrMaterialCount),
          channelRoughnessMetallicMapMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(pbrMaterialCount),
          emissionMapMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(pbrMaterialCount),
          normalMapMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(pbrMaterialCount),
          transmissionMapMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(pbrMaterialCount),
          specularMapMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(pbrMaterialCount)
        };
}

function createState(isDebug, pbrMaterialCount) {
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
  var match = _initBufferData(pbrMaterialCount, [
        defaultDiffuseColor,
        1.0,
        defaultSpecularColor,
        1.0,
        1.0,
        0.0,
        1.5
      ]);
  var match$1 = match[1];
  return createStateWithSharedArrayBufferData([
              isDebug,
              pbrMaterialCount
            ], [
              defaultDiffuseColor,
              1.0,
              defaultSpecularColor,
              1.0,
              1.0,
              0.0,
              1.5
            ], {
              buffer: match[0],
              diffuseColors: match$1[0],
              speculars: match$1[1],
              specularColors: match$1[2],
              roughnesses: match$1[3],
              metalnesses: match$1[4],
              transmissions: match$1[5],
              iors: match$1[6]
            });
}

export {
  _setAllTypeArrDataToDefault ,
  _initBufferData ,
  createStateWithSharedArrayBufferData ,
  createState ,
  
}
/* No side effect */
