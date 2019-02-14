

import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as MapUnitService$Wonderjs from "../../../../primitive/material/MapUnitService.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as BufferMaterialService$Wonderjs from "../../../../record/main/material/BufferMaterialService.js";
import * as GameObjectsMapService$Wonderjs from "../../../../primitive/GameObjectsMapService.js";
import * as DisposeMaterialService$Wonderjs from "../../../../record/main/material/DisposeMaterialService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../../primitive/buffer/DisposeTypeArrayService.js";
import * as GroupBasicMaterialService$Wonderjs from "../../../../record/main/material/basic/GroupBasicMaterialService.js";
import * as BufferBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/BufferBasicMaterialService.js";
import * as DisposeMaterialMainService$Wonderjs from "../DisposeMaterialMainService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";

function isAlive(material, param) {
  return DisposeMaterialMainService$Wonderjs.isAlive(material, param[/* disposedIndexArray */11]);
}

function _disposeData(gameObject, material, textureCountPerMaterial, basicMaterialRecord) {
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
          /* gameObjectsMap */GameObjectsMapService$Wonderjs.removeGameObject(gameObject, material, basicMaterialRecord[/* gameObjectsMap */10]),
          /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */11],
          /* nameMap */DisposeComponentService$Wonderjs.disposeSparseMapData(material, basicMaterialRecord[/* nameMap */12]),
          /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */13]
        ];
}

function _handleDispose(param, disposedIndexArray, textureCountPerMaterial, basicMaterialRecord) {
  var material = param[1];
  var gameObject = param[0];
  var match = GroupBasicMaterialService$Wonderjs.isGroupBasicMaterial(material, basicMaterialRecord);
  if (match) {
    return GroupBasicMaterialService$Wonderjs.removeGameObject(gameObject, material, basicMaterialRecord);
  } else {
    var init = _disposeData(gameObject, material, textureCountPerMaterial, basicMaterialRecord);
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
}

function handleBatchDisposeComponent(materialDataArray, state) {
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(materialDataArray.map((function (param) {
                            return param[1];
                          })), isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = basicMaterialRecord[/* disposedIndexArray */11];
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  ArrayService$WonderCommonlib.reduceOneParam((function (basicMaterialRecord, materialData) {
          return _handleDispose(materialData, disposedIndexArray, textureCountPerMaterial, basicMaterialRecord);
        }), basicMaterialRecord, materialDataArray);
  return state;
}

export {
  isAlive ,
  _disposeData ,
  _handleDispose ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
