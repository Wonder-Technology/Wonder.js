

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
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";
import * as TextureCountMapMaterialService$Wonderjs from "../../../../record/main/material/TextureCountMapMaterialService.js";

function isAlive(material, param) {
  return DisposeComponentService$Wonderjs.isAlive(material, param[/* disposedIndexArray */15]);
}

function _disposeData(material, textureCountPerMaterial, lightMaterialRecord) {
  var match = DisposeMaterialService$Wonderjs.disposeData(material, /* tuple */[
        lightMaterialRecord[/* shaderIndices */2],
        lightMaterialRecord[/* groupCountMap */14],
        lightMaterialRecord[/* gameObjectMap */13]
      ], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0));
  return /* record */[
          /* index */lightMaterialRecord[/* index */0],
          /* buffer */lightMaterialRecord[/* buffer */1],
          /* shaderIndices */match[0],
          /* diffuseColors */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferLightMaterialService$Wonderjs.getDiffuseColorIndex(material), BufferLightMaterialService$Wonderjs.getDiffuseColorsSize(/* () */0), lightMaterialRecord[/* defaultDiffuseColor */10], lightMaterialRecord[/* diffuseColors */3]),
          /* specularColors */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferLightMaterialService$Wonderjs.getSpecularColorIndex(material), BufferLightMaterialService$Wonderjs.getSpecularColorsSize(/* () */0), lightMaterialRecord[/* defaultSpecularColor */11], lightMaterialRecord[/* specularColors */4]),
          /* shininess */DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32(BufferLightMaterialService$Wonderjs.getShininessIndex(material), lightMaterialRecord[/* defaultShininess */12], lightMaterialRecord[/* shininess */5]),
          /* textureIndices */DisposeMaterialMainService$Wonderjs.disposeTextureIndices(material, textureCountPerMaterial, lightMaterialRecord[/* textureIndices */6]),
          /* diffuseMapUnits */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(BufferLightMaterialService$Wonderjs.getDiffuseMapUnitIndex(material), MapUnitService$Wonderjs.getDefaultUnit(/* () */0), lightMaterialRecord[/* diffuseMapUnits */7]),
          /* specularMapUnits */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(BufferLightMaterialService$Wonderjs.getDiffuseMapUnitIndex(material), MapUnitService$Wonderjs.getDefaultUnit(/* () */0), lightMaterialRecord[/* specularMapUnits */8]),
          /* textureCountMap */TextureCountMapMaterialService$Wonderjs.setCount(material, TextureCountMapMaterialService$Wonderjs.getDefaultCount(/* () */0), lightMaterialRecord[/* textureCountMap */9]),
          /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
          /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
          /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
          /* gameObjectMap */match[2],
          /* groupCountMap */match[1],
          /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */15],
          /* nameMap */DisposeComponentService$Wonderjs.disposeSparseMapData(material, lightMaterialRecord[/* nameMap */16]),
          /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */17]
        ];
}

function _handleDispose(disposedIndexArray, material, textureCountPerMaterial, lightMaterialRecord) {
  var match = GroupLightMaterialService$Wonderjs.isGroupMaterial(material, lightMaterialRecord);
  if (match) {
    return GroupLightMaterialService$Wonderjs.decreaseGroupCount(material, lightMaterialRecord);
  } else {
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
            /* textureCountMap */init[/* textureCountMap */9],
            /* defaultDiffuseColor */init[/* defaultDiffuseColor */10],
            /* defaultSpecularColor */init[/* defaultSpecularColor */11],
            /* defaultShininess */init[/* defaultShininess */12],
            /* gameObjectMap */init[/* gameObjectMap */13],
            /* groupCountMap */init[/* groupCountMap */14],
            /* disposedIndexArray */DisposeMaterialService$Wonderjs.addDisposeIndex(material, disposedIndexArray),
            /* nameMap */init[/* nameMap */16],
            /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */17]
          ];
  }
}

function handleBatchDisposeComponent(materialArray, state) {
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(materialArray, isAlive, RecordLightMaterialMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = lightMaterialRecord[/* disposedIndexArray */15];
  var textureCountPerMaterial = BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]);
  ArrayService$WonderCommonlib.reduceOneParam((function (lightMaterialRecord, material) {
          return _handleDispose(disposedIndexArray, material, textureCountPerMaterial, lightMaterialRecord);
        }), lightMaterialRecord, materialArray);
  return state;
}

export {
  isAlive ,
  _disposeData ,
  _handleDispose ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
