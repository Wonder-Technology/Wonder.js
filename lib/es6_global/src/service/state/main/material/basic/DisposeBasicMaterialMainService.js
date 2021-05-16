

import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferMaterialService$Wonderjs from "../../../../record/main/material/BufferMaterialService.js";
import * as DisposeMaterialService$Wonderjs from "../../../../record/main/material/DisposeMaterialService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../../primitive/buffer/DisposeTypeArrayService.js";
import * as GroupBasicMaterialService$Wonderjs from "../../../../record/main/material/basic/GroupBasicMaterialService.js";
import * as DisposeMaterialMainService$Wonderjs from "../DisposeMaterialMainService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as BufferAllBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/BufferAllBasicMaterialService.js";
import * as GameObjectBasicMaterialService$Wonderjs from "../../../../record/main/material/basic/GameObjectBasicMaterialService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";

function isAlive(material, param) {
  return DisposeMaterialMainService$Wonderjs.isAlive(material, param[/* disposedIndexArray */8]);
}

function _disposeData(material, state) {
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var shaderIndices = DisposeMaterialService$Wonderjs.disposeData(material, basicMaterialRecord[/* shaderIndices */2], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */basicMaterialRecord[/* index */0],
    /* buffer */basicMaterialRecord[/* buffer */1],
    /* shaderIndices */shaderIndices,
    /* colors */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferAllBasicMaterialService$Wonderjs.getColorIndex(material), BufferAllBasicMaterialService$Wonderjs.getColorsSize(/* () */0), basicMaterialRecord[/* defaultColor */6], basicMaterialRecord[/* colors */3]),
    /* isDepthTests */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(BufferAllBasicMaterialService$Wonderjs.getIsDepthTestIndex(material), BufferMaterialService$Wonderjs.getDefaultIsDepthTest(/* () */0), basicMaterialRecord[/* isDepthTests */4]),
    /* alphas */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32(BufferAllBasicMaterialService$Wonderjs.getAlphaIndex(material), BufferAllBasicMaterialService$Wonderjs.getDefaultAlpha(/* () */0), basicMaterialRecord[/* alphas */5]),
    /* defaultColor */basicMaterialRecord[/* defaultColor */6],
    /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */7],
    /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */8],
    /* nameMap */DisposeComponentService$Wonderjs.disposeSparseMapData(material, basicMaterialRecord[/* nameMap */9]),
    /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */10]
  ];
  return newrecord;
}

function handleBatchDisposeComponentData(materialDataMap, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(MutableSparseMapService$WonderCommonlib.getValidKeys(materialDataMap), isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return MutableSparseMapService$WonderCommonlib.reduceiValid((function (state, gameObjectArr, material) {
                var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
                var basicMaterialRecord$1 = GroupBasicMaterialService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, basicMaterialRecord);
                var match = GroupBasicMaterialService$Wonderjs.isGroupBasicMaterial(material, basicMaterialRecord$1);
                if (match) {
                  var newrecord = Caml_array.caml_array_dup(state);
                  newrecord[/* basicMaterialRecord */15] = basicMaterialRecord$1;
                  return newrecord;
                } else {
                  var state$1 = _disposeData(material, state);
                  var basicMaterialRecord$2 = RecordBasicMaterialMainService$Wonderjs.getRecord(state$1);
                  var newrecord$1 = Caml_array.caml_array_dup(state$1);
                  newrecord$1[/* basicMaterialRecord */15] = /* record */[
                    /* index */basicMaterialRecord$2[/* index */0],
                    /* buffer */basicMaterialRecord$2[/* buffer */1],
                    /* shaderIndices */basicMaterialRecord$2[/* shaderIndices */2],
                    /* colors */basicMaterialRecord$2[/* colors */3],
                    /* isDepthTests */basicMaterialRecord$2[/* isDepthTests */4],
                    /* alphas */basicMaterialRecord$2[/* alphas */5],
                    /* defaultColor */basicMaterialRecord$2[/* defaultColor */6],
                    /* gameObjectsMap */basicMaterialRecord$2[/* gameObjectsMap */7],
                    /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, basicMaterialRecord$2[/* disposedIndexArray */8]),
                    /* nameMap */basicMaterialRecord$2[/* nameMap */9],
                    /* materialArrayForWorkerInit */basicMaterialRecord$2[/* materialArrayForWorkerInit */10]
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
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, material) {
                var state$1 = _disposeData(material, state);
                var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state$1);
                var newrecord = Caml_array.caml_array_dup(state$1);
                newrecord[/* basicMaterialRecord */15] = /* record */[
                  /* index */basicMaterialRecord[/* index */0],
                  /* buffer */basicMaterialRecord[/* buffer */1],
                  /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
                  /* colors */basicMaterialRecord[/* colors */3],
                  /* isDepthTests */basicMaterialRecord[/* isDepthTests */4],
                  /* alphas */basicMaterialRecord[/* alphas */5],
                  /* defaultColor */basicMaterialRecord[/* defaultColor */6],
                  /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */7],
                  /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, basicMaterialRecord[/* disposedIndexArray */8]),
                  /* nameMap */basicMaterialRecord[/* nameMap */9],
                  /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */10]
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
