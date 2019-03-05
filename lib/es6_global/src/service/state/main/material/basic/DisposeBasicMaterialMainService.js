

import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as MapUnitService$Wonderjs from "../../../../primitive/material/MapUnitService.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as BufferMaterialService$Wonderjs from "../../../../record/main/material/BufferMaterialService.js";
import * as DisposeMaterialService$Wonderjs from "../../../../record/main/material/DisposeMaterialService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../../primitive/buffer/DisposeTypeArrayService.js";
import * as GroupBasicMaterialService$Wonderjs from "../../../../record/main/material/basic/GroupBasicMaterialService.js";
import * as BufferBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/BufferBasicMaterialService.js";
import * as DisposeMaterialMainService$Wonderjs from "../DisposeMaterialMainService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as GameObjectBasicMaterialService$Wonderjs from "../../../../record/main/material/basic/GameObjectBasicMaterialService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";

function isAlive(material, param) {
  return DisposeMaterialMainService$Wonderjs.isAlive(material, param[/* disposedIndexArray */11]);
}

function _disposeData(material, textureCountPerMaterial, basicMaterialRecord) {
  var shaderIndices = DisposeMaterialService$Wonderjs.disposeData(material, basicMaterialRecord[/* shaderIndices */2], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0));
  return /* record */[
          /* index */basicMaterialRecord[/* index */0],
          /* buffer */basicMaterialRecord[/* buffer */1],
          /* shaderIndices */shaderIndices,
          /* colors */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferBasicMaterialService$Wonderjs.getColorIndex(material), BufferBasicMaterialService$Wonderjs.getColorsSize(/* () */0), basicMaterialRecord[/* defaultColor */9], basicMaterialRecord[/* colors */3]),
          /* textureIndices */DisposeMaterialMainService$Wonderjs.disposeTextureIndices(material, textureCountPerMaterial, basicMaterialRecord[/* textureIndices */4]),
          /* mapUnits */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(BufferBasicMaterialService$Wonderjs.getMapUnitIndex(material), MapUnitService$Wonderjs.getDefaultUnit(/* () */0), basicMaterialRecord[/* mapUnits */5]),
          /* isDepthTests */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(BufferBasicMaterialService$Wonderjs.getIsDepthTestIndex(material), BufferMaterialService$Wonderjs.getDefaultIsDepthTest(/* () */0), basicMaterialRecord[/* isDepthTests */6]),
          /* alphas */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32(BufferBasicMaterialService$Wonderjs.getAlphaIndex(material), BufferBasicMaterialService$Wonderjs.getDefaultAlpha(/* () */0), basicMaterialRecord[/* alphas */7]),
          /* emptyMapUnitArrayMap */DisposeComponentService$Wonderjs.disposeSparseMapData(material, basicMaterialRecord[/* emptyMapUnitArrayMap */8]),
          /* defaultColor */basicMaterialRecord[/* defaultColor */9],
          /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */10],
          /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */11],
          /* nameMap */DisposeComponentService$Wonderjs.disposeSparseMapData(material, basicMaterialRecord[/* nameMap */12]),
          /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */13]
        ];
}

function handleBatchDisposeComponentData(materialDataMap, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(MutableSparseMapService$WonderCommonlib.getValidKeys(materialDataMap), isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = basicMaterialRecord[/* disposedIndexArray */11];
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  var basicMaterialRecord$1 = MutableSparseMapService$WonderCommonlib.reduceiValid((function (basicMaterialRecord, gameObjectArr, material) {
          var basicMaterialRecord$1 = GroupBasicMaterialService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, basicMaterialRecord);
          var match = GroupBasicMaterialService$Wonderjs.isGroupBasicMaterial(material, basicMaterialRecord$1);
          if (match) {
            return basicMaterialRecord$1;
          } else {
            var init = _disposeData(material, textureCountPerMaterial, basicMaterialRecord$1);
            return /* record */[
                    /* index */init[/* index */0],
                    /* buffer */init[/* buffer */1],
                    /* shaderIndices */init[/* shaderIndices */2],
                    /* colors */init[/* colors */3],
                    /* textureIndices */init[/* textureIndices */4],
                    /* mapUnits */init[/* mapUnits */5],
                    /* isDepthTests */init[/* isDepthTests */6],
                    /* alphas */init[/* alphas */7],
                    /* emptyMapUnitArrayMap */init[/* emptyMapUnitArrayMap */8],
                    /* defaultColor */init[/* defaultColor */9],
                    /* gameObjectsMap */init[/* gameObjectsMap */10],
                    /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, disposedIndexArray),
                    /* nameMap */init[/* nameMap */12],
                    /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */13]
                  ];
          }
        }), basicMaterialRecord, materialDataMap);
  state[/* basicMaterialRecord */15] = basicMaterialRecord$1;
  return state;
}

function handleBatchDisposeComponent(materialHasNoGameObjectArray, state) {
  Contract$WonderLog.requireCheck((function (param) {
          DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(materialHasNoGameObjectArray, isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("material has no gameObject", "has"), (function (param) {
                        var materialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
                        return Contract$WonderLog.Operators[/* = */0](materialHasNoGameObjectArray.filter((function (material) {
                                          return Js_option.isSome(GameObjectBasicMaterialService$Wonderjs.getGameObjects(material, materialRecord));
                                        })).length, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = basicMaterialRecord[/* disposedIndexArray */11];
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  var basicMaterialRecord$1 = ArrayService$WonderCommonlib.reduceOneParam((function (basicMaterialRecord, material) {
          var init = _disposeData(material, textureCountPerMaterial, basicMaterialRecord);
          return /* record */[
                  /* index */init[/* index */0],
                  /* buffer */init[/* buffer */1],
                  /* shaderIndices */init[/* shaderIndices */2],
                  /* colors */init[/* colors */3],
                  /* textureIndices */init[/* textureIndices */4],
                  /* mapUnits */init[/* mapUnits */5],
                  /* isDepthTests */init[/* isDepthTests */6],
                  /* alphas */init[/* alphas */7],
                  /* emptyMapUnitArrayMap */init[/* emptyMapUnitArrayMap */8],
                  /* defaultColor */init[/* defaultColor */9],
                  /* gameObjectsMap */init[/* gameObjectsMap */10],
                  /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, disposedIndexArray),
                  /* nameMap */init[/* nameMap */12],
                  /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */13]
                ];
        }), basicMaterialRecord, materialHasNoGameObjectArray);
  state[/* basicMaterialRecord */15] = basicMaterialRecord$1;
  return state;
}

export {
  isAlive ,
  _disposeData ,
  handleBatchDisposeComponentData ,
  handleBatchDisposeComponent ,
  
}
/* Log-WonderLog Not a pure module */
