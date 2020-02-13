

import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
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
import * as OperateBasicMaterialMainService$Wonderjs from "./OperateBasicMaterialMainService.js";

function isAlive(material, param) {
  return DisposeMaterialMainService$Wonderjs.isAlive(material, param[/* disposedIndexArray */11]);
}

function _disposeData(isRemoveTexture, material, textureCountPerMaterial, state) {
  var state$1 = DisposeMaterialMainService$Wonderjs.disposeMaps(isRemoveTexture, /* tuple */[
        material,
        /* BasicMaterial */0
      ], /* array */[OperateBasicMaterialMainService$Wonderjs.getMap(material, state)], state);
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state$1);
  var shaderIndices = DisposeMaterialService$Wonderjs.disposeData(material, basicMaterialRecord[/* shaderIndices */2], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0));
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* basicMaterialRecord */15] = /* record */[
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
  return newrecord;
}

function handleBatchDisposeComponentData(isRemoveTexture, materialDataMap, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(MutableSparseMapService$WonderCommonlib.getValidKeys(materialDataMap), isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  return MutableSparseMapService$WonderCommonlib.reduceiValid((function (state, gameObjectArr, material) {
                var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
                var basicMaterialRecord$1 = GroupBasicMaterialService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, basicMaterialRecord);
                var match = GroupBasicMaterialService$Wonderjs.isGroupBasicMaterial(material, basicMaterialRecord$1);
                if (match) {
                  var newrecord = Caml_array.caml_array_dup(state);
                  newrecord[/* basicMaterialRecord */15] = basicMaterialRecord$1;
                  return newrecord;
                } else {
                  var state$1 = _disposeData(isRemoveTexture, material, textureCountPerMaterial, state);
                  var basicMaterialRecord$2 = RecordBasicMaterialMainService$Wonderjs.getRecord(state$1);
                  var newrecord$1 = Caml_array.caml_array_dup(state$1);
                  newrecord$1[/* basicMaterialRecord */15] = /* record */[
                    /* index */basicMaterialRecord$2[/* index */0],
                    /* buffer */basicMaterialRecord$2[/* buffer */1],
                    /* shaderIndices */basicMaterialRecord$2[/* shaderIndices */2],
                    /* colors */basicMaterialRecord$2[/* colors */3],
                    /* textureIndices */basicMaterialRecord$2[/* textureIndices */4],
                    /* mapUnits */basicMaterialRecord$2[/* mapUnits */5],
                    /* isDepthTests */basicMaterialRecord$2[/* isDepthTests */6],
                    /* alphas */basicMaterialRecord$2[/* alphas */7],
                    /* emptyMapUnitArrayMap */basicMaterialRecord$2[/* emptyMapUnitArrayMap */8],
                    /* defaultColor */basicMaterialRecord$2[/* defaultColor */9],
                    /* gameObjectsMap */basicMaterialRecord$2[/* gameObjectsMap */10],
                    /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, basicMaterialRecord$2[/* disposedIndexArray */11]),
                    /* nameMap */basicMaterialRecord$2[/* nameMap */12],
                    /* materialArrayForWorkerInit */basicMaterialRecord$2[/* materialArrayForWorkerInit */13]
                  ];
                  return newrecord$1;
                }
              }), state, materialDataMap);
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
  RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, material) {
                var state$1 = _disposeData(false, material, textureCountPerMaterial, state);
                var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state$1);
                var newrecord = Caml_array.caml_array_dup(state$1);
                newrecord[/* basicMaterialRecord */15] = /* record */[
                  /* index */basicMaterialRecord[/* index */0],
                  /* buffer */basicMaterialRecord[/* buffer */1],
                  /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
                  /* colors */basicMaterialRecord[/* colors */3],
                  /* textureIndices */basicMaterialRecord[/* textureIndices */4],
                  /* mapUnits */basicMaterialRecord[/* mapUnits */5],
                  /* isDepthTests */basicMaterialRecord[/* isDepthTests */6],
                  /* alphas */basicMaterialRecord[/* alphas */7],
                  /* emptyMapUnitArrayMap */basicMaterialRecord[/* emptyMapUnitArrayMap */8],
                  /* defaultColor */basicMaterialRecord[/* defaultColor */9],
                  /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */10],
                  /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, basicMaterialRecord[/* disposedIndexArray */11]),
                  /* nameMap */basicMaterialRecord[/* nameMap */12],
                  /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */13]
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
