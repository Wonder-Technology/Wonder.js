

import * as Contract$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as MapUnitService$Wonderjs from "../../../../primitive/material/MapUnitService.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as DisposeMaterialService$Wonderjs from "../../../../record/main/material/DisposeMaterialService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../../primitive/buffer/DisposeTypeArrayService.js";
import * as GroupBasicMaterialService$Wonderjs from "../../../../record/main/material/basic/GroupBasicMaterialService.js";
import * as BufferBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/BufferBasicMaterialService.js";
import * as DisposeMaterialMainService$Wonderjs from "../DisposeMaterialMainService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";
import * as TextureCountMapMaterialService$Wonderjs from "../../../../record/main/material/TextureCountMapMaterialService.js";

function isAlive(material, param) {
  return DisposeComponentService$Wonderjs.isAlive(material, param[/* disposedIndexArray */10]);
}

function _disposeData(material, textureCountPerMaterial, basicMaterialRecord) {
  var match = DisposeMaterialService$Wonderjs.disposeData(material, /* tuple */[
        basicMaterialRecord[/* shaderIndices */2],
        basicMaterialRecord[/* groupCountMap */9],
        basicMaterialRecord[/* gameObjectMap */8]
      ], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0));
  return /* record */[
          /* index */basicMaterialRecord[/* index */0],
          /* buffer */basicMaterialRecord[/* buffer */1],
          /* shaderIndices */match[0],
          /* colors */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferBasicMaterialService$Wonderjs.getColorIndex(material), BufferBasicMaterialService$Wonderjs.getColorsSize(/* () */0), basicMaterialRecord[/* defaultColor */7], basicMaterialRecord[/* colors */3]),
          /* textureIndices */DisposeMaterialMainService$Wonderjs.disposeTextureIndices(material, textureCountPerMaterial, basicMaterialRecord[/* textureIndices */4]),
          /* mapUnits */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(BufferBasicMaterialService$Wonderjs.getMapUnitIndex(material), MapUnitService$Wonderjs.getDefaultUnit(/* () */0), basicMaterialRecord[/* mapUnits */5]),
          /* textureCountMap */TextureCountMapMaterialService$Wonderjs.setCount(material, TextureCountMapMaterialService$Wonderjs.getDefaultCount(/* () */0), basicMaterialRecord[/* textureCountMap */6]),
          /* defaultColor */basicMaterialRecord[/* defaultColor */7],
          /* gameObjectMap */match[2],
          /* groupCountMap */match[1],
          /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */10],
          /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */11]
        ];
}

function _handleDispose(disposedIndexArray, material, textureCountPerMaterial, basicMaterialRecord) {
  var match = GroupBasicMaterialService$Wonderjs.isGroupMaterial(material, basicMaterialRecord);
  if (match) {
    return GroupBasicMaterialService$Wonderjs.decreaseGroupCount(material, basicMaterialRecord);
  } else {
    var init = _disposeData(material, textureCountPerMaterial, basicMaterialRecord);
    return /* record */[
            /* index */init[/* index */0],
            /* buffer */init[/* buffer */1],
            /* shaderIndices */init[/* shaderIndices */2],
            /* colors */init[/* colors */3],
            /* textureIndices */init[/* textureIndices */4],
            /* mapUnits */init[/* mapUnits */5],
            /* textureCountMap */init[/* textureCountMap */6],
            /* defaultColor */init[/* defaultColor */7],
            /* gameObjectMap */init[/* gameObjectMap */8],
            /* groupCountMap */init[/* groupCountMap */9],
            /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, disposedIndexArray),
            /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */11]
          ];
  }
}

function handleBatchDisposeComponent(materialArray, state) {
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(materialArray, isAlive, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = basicMaterialRecord[/* disposedIndexArray */10];
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  ArrayService$WonderCommonlib.reduceOneParam((function (basicMaterialRecord, material) {
          return _handleDispose(disposedIndexArray, material, textureCountPerMaterial, basicMaterialRecord);
        }), basicMaterialRecord, materialArray);
  return state;
}

export {
  isAlive ,
  _disposeData ,
  _handleDispose ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
