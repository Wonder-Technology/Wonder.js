

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as AliveMaterialService$Wonderjs from "../../../primitive/material/AliveMaterialService.js";
import * as RestoreMaterialService$Wonderjs from "../../../record/main/material/RestoreMaterialService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as InitBasicMaterialMainService$Wonderjs from "../material/basic/InitBasicMaterialMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../material/basic/RecordBasicMaterialMainService.js";

function _resetShaderIndices(state) {
  var record = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */RestoreMaterialService$Wonderjs.resetShaderIndices(record[/* index */0], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0), record[/* shaderIndices */2]),
    /* colors */record[/* colors */3],
    /* textureIndices */record[/* textureIndices */4],
    /* mapUnits */record[/* mapUnits */5],
    /* isDepthTests */record[/* isDepthTests */6],
    /* alphas */record[/* alphas */7],
    /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */8],
    /* defaultColor */record[/* defaultColor */9],
    /* gameObjectsMap */record[/* gameObjectsMap */10],
    /* disposedIndexArray */record[/* disposedIndexArray */11],
    /* nameMap */record[/* nameMap */12],
    /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */13]
  ];
  return newrecord;
}

function _restoreTypeArrays(currentBasicMaterialRecord, targetBasicMaterialRecord) {
  var match = currentBasicMaterialRecord[/* shaderIndices */2] === targetBasicMaterialRecord[/* shaderIndices */2] && currentBasicMaterialRecord[/* colors */3] === targetBasicMaterialRecord[/* colors */3] && currentBasicMaterialRecord[/* textureIndices */4] === targetBasicMaterialRecord[/* textureIndices */4] && currentBasicMaterialRecord[/* mapUnits */5] === targetBasicMaterialRecord[/* mapUnits */5] && currentBasicMaterialRecord[/* isDepthTests */6] === targetBasicMaterialRecord[/* isDepthTests */6];
  if (match) {
    return /* tuple */[
            currentBasicMaterialRecord,
            targetBasicMaterialRecord
          ];
  } else {
    RecordBasicMaterialMainService$Wonderjs.setAllTypeArrDataToDefault(currentBasicMaterialRecord[/* index */0], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0), currentBasicMaterialRecord[/* defaultColor */9], /* tuple */[
          currentBasicMaterialRecord[/* shaderIndices */2],
          currentBasicMaterialRecord[/* colors */3],
          currentBasicMaterialRecord[/* textureIndices */4],
          currentBasicMaterialRecord[/* mapUnits */5],
          currentBasicMaterialRecord[/* isDepthTests */6],
          currentBasicMaterialRecord[/* alphas */7]
        ]);
    TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
          currentBasicMaterialRecord[/* shaderIndices */2],
          0
        ], /* tuple */[
          targetBasicMaterialRecord[/* shaderIndices */2],
          0
        ], targetBasicMaterialRecord[/* shaderIndices */2].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentBasicMaterialRecord[/* colors */3],
          0
        ], /* tuple */[
          targetBasicMaterialRecord[/* colors */3],
          0
        ], targetBasicMaterialRecord[/* colors */3].length);
    TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
          currentBasicMaterialRecord[/* textureIndices */4],
          0
        ], /* tuple */[
          targetBasicMaterialRecord[/* textureIndices */4],
          0
        ], targetBasicMaterialRecord[/* textureIndices */4].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentBasicMaterialRecord[/* mapUnits */5],
          0
        ], /* tuple */[
          targetBasicMaterialRecord[/* mapUnits */5],
          0
        ], targetBasicMaterialRecord[/* mapUnits */5].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentBasicMaterialRecord[/* isDepthTests */6],
          0
        ], /* tuple */[
          targetBasicMaterialRecord[/* isDepthTests */6],
          0
        ], targetBasicMaterialRecord[/* isDepthTests */6].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentBasicMaterialRecord[/* alphas */7],
          0
        ], /* tuple */[
          targetBasicMaterialRecord[/* alphas */7],
          0
        ], targetBasicMaterialRecord[/* alphas */7].length);
    return /* tuple */[
            currentBasicMaterialRecord,
            targetBasicMaterialRecord
          ];
  }
}

function restore(gl, currentState, targetState) {
  var targetState$1 = _resetShaderIndices(targetState);
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(targetState$1);
  var targetState$2 = InitBasicMaterialMainService$Wonderjs.initMaterials(AliveMaterialService$Wonderjs.getAllAliveMaterials(match[/* index */0], match[/* disposedIndexArray */11]), gl, targetState$1);
  var currentBasicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(currentState);
  var targetBasicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(targetState$2);
  var match$1 = _restoreTypeArrays(currentBasicMaterialRecord, targetBasicMaterialRecord);
  var targetBasicMaterialRecord$1 = match$1[1];
  var currentBasicMaterialRecord$1 = match$1[0];
  var newrecord = Caml_array.caml_array_dup(targetState$2);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */targetBasicMaterialRecord$1[/* index */0],
    /* buffer */currentBasicMaterialRecord$1[/* buffer */1],
    /* shaderIndices */currentBasicMaterialRecord$1[/* shaderIndices */2],
    /* colors */currentBasicMaterialRecord$1[/* colors */3],
    /* textureIndices */currentBasicMaterialRecord$1[/* textureIndices */4],
    /* mapUnits */currentBasicMaterialRecord$1[/* mapUnits */5],
    /* isDepthTests */currentBasicMaterialRecord$1[/* isDepthTests */6],
    /* alphas */currentBasicMaterialRecord$1[/* alphas */7],
    /* emptyMapUnitArrayMap */targetBasicMaterialRecord$1[/* emptyMapUnitArrayMap */8],
    /* defaultColor */targetBasicMaterialRecord$1[/* defaultColor */9],
    /* gameObjectsMap */targetBasicMaterialRecord$1[/* gameObjectsMap */10],
    /* disposedIndexArray */targetBasicMaterialRecord$1[/* disposedIndexArray */11],
    /* nameMap */targetBasicMaterialRecord$1[/* nameMap */12],
    /* materialArrayForWorkerInit */targetBasicMaterialRecord$1[/* materialArrayForWorkerInit */13]
  ];
  return newrecord;
}

export {
  _resetShaderIndices ,
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
