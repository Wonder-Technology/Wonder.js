

import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
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

function isAlive(material, param) {
  return DisposeMaterialMainService$Wonderjs.isAlive(material, param[/* disposedIndexArray */14]);
}

function _disposeData(material, textureCountPerMaterial, lightMaterialRecord) {
  var shaderIndices = DisposeMaterialService$Wonderjs.disposeData(material, lightMaterialRecord[/* shaderIndices */2], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0));
  return /* record */[
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
}

function handleBatchDisposeComponentData(materialDataMap, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(MutableSparseMapService$WonderCommonlib.getValidKeys(materialDataMap), isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = lightMaterialRecord[/* disposedIndexArray */14];
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  var lightMaterialRecord$1 = MutableSparseMapService$WonderCommonlib.reduceiValid((function (lightMaterialRecord, gameObjectArr, material) {
          var lightMaterialRecord$1 = GroupLightMaterialService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, lightMaterialRecord);
          var match = GroupLightMaterialService$Wonderjs.isGroupLightMaterial(material, lightMaterialRecord$1);
          if (match) {
            return lightMaterialRecord$1;
          } else {
            var init = _disposeData(material, textureCountPerMaterial, lightMaterialRecord$1);
            return /* record */[
                    /* index */init[/* index */0],
                    /* buffer */init[/* buffer */1],
                    /* shaderIndices */init[/* shaderIndices */2],
                    /* diffuseColors */init[/* diffuseColors */3],
                    /* specularColors */init[/* specularColors */4],
                    /* shininess */init[/* shininess */5],
                    /* textureIndices */init[/* textureIndices */6],
                    /* diffuseMapUnits */init[/* diffuseMapUnits */7],
                    /* specularMapUnits */init[/* specularMapUnits */8],
                    /* emptyMapUnitArrayMap */init[/* emptyMapUnitArrayMap */9],
                    /* defaultDiffuseColor */init[/* defaultDiffuseColor */10],
                    /* defaultSpecularColor */init[/* defaultSpecularColor */11],
                    /* defaultShininess */init[/* defaultShininess */12],
                    /* gameObjectsMap */init[/* gameObjectsMap */13],
                    /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, disposedIndexArray),
                    /* nameMap */init[/* nameMap */15],
                    /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */16]
                  ];
          }
        }), lightMaterialRecord, materialDataMap);
  state[/* lightMaterialRecord */16] = lightMaterialRecord$1;
  return state;
}

function handleBatchDisposeComponent(materialHasNoGameObjectArray, state) {
  Contract$WonderLog.requireCheck((function (param) {
          DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(materialHasNoGameObjectArray, isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("material has no gameObject", "has"), (function (param) {
                        var materialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
                        return Contract$WonderLog.Operators[/* = */0](materialHasNoGameObjectArray.filter((function (material) {
                                          return Js_option.isSome(GameObjectLightMaterialService$Wonderjs.getGameObjects(material, materialRecord));
                                        })).length, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = lightMaterialRecord[/* disposedIndexArray */14];
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  var lightMaterialRecord$1 = ArrayService$WonderCommonlib.reduceOneParam((function (lightMaterialRecord, material) {
          var init = _disposeData(material, textureCountPerMaterial, lightMaterialRecord);
          return /* record */[
                  /* index */init[/* index */0],
                  /* buffer */init[/* buffer */1],
                  /* shaderIndices */init[/* shaderIndices */2],
                  /* diffuseColors */init[/* diffuseColors */3],
                  /* specularColors */init[/* specularColors */4],
                  /* shininess */init[/* shininess */5],
                  /* textureIndices */init[/* textureIndices */6],
                  /* diffuseMapUnits */init[/* diffuseMapUnits */7],
                  /* specularMapUnits */init[/* specularMapUnits */8],
                  /* emptyMapUnitArrayMap */init[/* emptyMapUnitArrayMap */9],
                  /* defaultDiffuseColor */init[/* defaultDiffuseColor */10],
                  /* defaultSpecularColor */init[/* defaultSpecularColor */11],
                  /* defaultShininess */init[/* defaultShininess */12],
                  /* gameObjectsMap */init[/* gameObjectsMap */13],
                  /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, disposedIndexArray),
                  /* nameMap */init[/* nameMap */15],
                  /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */16]
                ];
        }), lightMaterialRecord, materialHasNoGameObjectArray);
  state[/* lightMaterialRecord */16] = lightMaterialRecord$1;
  return state;
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponentData ,
  handleBatchDisposeComponent ,
  
}
/* Log-WonderLog Not a pure module */
