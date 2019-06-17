

import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as MapUnitService$Wonderjs from "../../../../primitive/material/MapUnitService.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as DisposeMaterialService$Wonderjs from "../../../../record/main/material/DisposeMaterialService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../../primitive/buffer/DisposeTypeArrayService.js";
import * as GroupLightMaterialService$Wonderjs from "../../../../record/main/material/light/GroupLightMaterialService.js";
import * as BufferLightMaterialService$Wonderjs from "../../../../record/all/material/light/BufferLightMaterialService.js";
import * as DisposeMaterialMainService$Wonderjs from "../DisposeMaterialMainService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as GameObjectLightMaterialService$Wonderjs from "../../../../record/main/material/light/GameObjectLightMaterialService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";
import * as OperateLightMaterialMainService$Wonderjs from "./OperateLightMaterialMainService.js";

function isAlive(material, param) {
  return DisposeMaterialMainService$Wonderjs.isAlive(material, param[/* disposedIndexArray */14]);
}

function _disposeData(isRemoveTexture, material, textureCountPerMaterial, state) {
  var state$1 = DisposeMaterialMainService$Wonderjs.disposeMaps(isRemoveTexture, /* tuple */[
        material,
        /* LightMaterial */1
      ], /* array */[
        OperateLightMaterialMainService$Wonderjs.getDiffuseMap(material, state),
        OperateLightMaterialMainService$Wonderjs.getSpecularMap(material, state)
      ], state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var shaderIndices = DisposeMaterialService$Wonderjs.disposeData(material, lightMaterialRecord[/* shaderIndices */2], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0));
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */shaderIndices,
    /* diffuseColors */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferLightMaterialService$Wonderjs.getDiffuseColorIndex(material), BufferLightMaterialService$Wonderjs.getDiffuseColorsSize(/* () */0), lightMaterialRecord[/* defaultDiffuseColor */10], lightMaterialRecord[/* diffuseColors */3]),
    /* specularColors */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferLightMaterialService$Wonderjs.getSpecularColorIndex(material), BufferLightMaterialService$Wonderjs.getSpecularColorsSize(/* () */0), lightMaterialRecord[/* defaultSpecularColor */11], lightMaterialRecord[/* specularColors */4]),
    /* shininess */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32(BufferLightMaterialService$Wonderjs.getShininessIndex(material), lightMaterialRecord[/* defaultShininess */12], lightMaterialRecord[/* shininess */5]),
    /* textureIndices */DisposeMaterialMainService$Wonderjs.disposeTextureIndices(material, textureCountPerMaterial, lightMaterialRecord[/* textureIndices */6]),
    /* diffuseMapUnits */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(BufferLightMaterialService$Wonderjs.getDiffuseMapUnitIndex(material), MapUnitService$Wonderjs.getDefaultUnit(/* () */0), lightMaterialRecord[/* diffuseMapUnits */7]),
    /* specularMapUnits */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(BufferLightMaterialService$Wonderjs.getDiffuseMapUnitIndex(material), MapUnitService$Wonderjs.getDefaultUnit(/* () */0), lightMaterialRecord[/* specularMapUnits */8]),
    /* emptyMapUnitArrayMap */DisposeComponentService$Wonderjs.disposeSparseMapData(material, lightMaterialRecord[/* emptyMapUnitArrayMap */9]),
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */13],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */14],
    /* nameMap */DisposeComponentService$Wonderjs.disposeSparseMapData(material, lightMaterialRecord[/* nameMap */15]),
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */16]
  ];
  return newrecord;
}

function handleBatchDisposeComponentData(isRemoveTexture, materialDataMap, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(MutableSparseMapService$WonderCommonlib.getValidKeys(materialDataMap), isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  return MutableSparseMapService$WonderCommonlib.reduceiValid((function (state, gameObjectArr, material) {
                var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
                var lightMaterialRecord$1 = GroupLightMaterialService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, lightMaterialRecord);
                var match = GroupLightMaterialService$Wonderjs.isGroupLightMaterial(material, lightMaterialRecord$1);
                if (match) {
                  var newrecord = Caml_array.caml_array_dup(state);
                  newrecord[/* lightMaterialRecord */16] = lightMaterialRecord$1;
                  return newrecord;
                } else {
                  var state$1 = _disposeData(isRemoveTexture, material, textureCountPerMaterial, state);
                  var lightMaterialRecord$2 = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
                  var newrecord$1 = Caml_array.caml_array_dup(state$1);
                  newrecord$1[/* lightMaterialRecord */16] = /* record */[
                    /* index */lightMaterialRecord$2[/* index */0],
                    /* buffer */lightMaterialRecord$2[/* buffer */1],
                    /* shaderIndices */lightMaterialRecord$2[/* shaderIndices */2],
                    /* diffuseColors */lightMaterialRecord$2[/* diffuseColors */3],
                    /* specularColors */lightMaterialRecord$2[/* specularColors */4],
                    /* shininess */lightMaterialRecord$2[/* shininess */5],
                    /* textureIndices */lightMaterialRecord$2[/* textureIndices */6],
                    /* diffuseMapUnits */lightMaterialRecord$2[/* diffuseMapUnits */7],
                    /* specularMapUnits */lightMaterialRecord$2[/* specularMapUnits */8],
                    /* emptyMapUnitArrayMap */lightMaterialRecord$2[/* emptyMapUnitArrayMap */9],
                    /* defaultDiffuseColor */lightMaterialRecord$2[/* defaultDiffuseColor */10],
                    /* defaultSpecularColor */lightMaterialRecord$2[/* defaultSpecularColor */11],
                    /* defaultShininess */lightMaterialRecord$2[/* defaultShininess */12],
                    /* gameObjectsMap */lightMaterialRecord$2[/* gameObjectsMap */13],
                    /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, lightMaterialRecord$2[/* disposedIndexArray */14]),
                    /* nameMap */lightMaterialRecord$2[/* nameMap */15],
                    /* materialArrayForWorkerInit */lightMaterialRecord$2[/* materialArrayForWorkerInit */16]
                  ];
                  return newrecord$1;
                }
              }), state, materialDataMap);
}

function handleBatchDisposeComponent(isRemoveTexture, materialHasNoGameObjectArray, state) {
  Contract$WonderLog.requireCheck((function (param) {
          DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(materialHasNoGameObjectArray, isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("material has no gameObject", "has"), (function (param) {
                        var materialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
                        return Contract$WonderLog.Operators[/* = */0](materialHasNoGameObjectArray.filter((function (material) {
                                          return Js_option.isSome(GameObjectLightMaterialService$Wonderjs.getGameObjects(material, materialRecord));
                                        })).length, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, material) {
                var state$1 = _disposeData(isRemoveTexture, material, textureCountPerMaterial, state);
                var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
                var newrecord = Caml_array.caml_array_dup(state$1);
                newrecord[/* lightMaterialRecord */16] = /* record */[
                  /* index */lightMaterialRecord[/* index */0],
                  /* buffer */lightMaterialRecord[/* buffer */1],
                  /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
                  /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
                  /* specularColors */lightMaterialRecord[/* specularColors */4],
                  /* shininess */lightMaterialRecord[/* shininess */5],
                  /* textureIndices */lightMaterialRecord[/* textureIndices */6],
                  /* diffuseMapUnits */lightMaterialRecord[/* diffuseMapUnits */7],
                  /* specularMapUnits */lightMaterialRecord[/* specularMapUnits */8],
                  /* emptyMapUnitArrayMap */lightMaterialRecord[/* emptyMapUnitArrayMap */9],
                  /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
                  /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
                  /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
                  /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */13],
                  /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, lightMaterialRecord[/* disposedIndexArray */14]),
                  /* nameMap */lightMaterialRecord[/* nameMap */15],
                  /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */16]
                ];
                return newrecord;
              }), state, materialHasNoGameObjectArray);
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponentData ,
  handleBatchDisposeComponent ,
  
}
/* Log-WonderLog Not a pure module */
