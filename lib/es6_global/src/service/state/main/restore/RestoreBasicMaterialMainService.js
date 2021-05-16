

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
    /* isDepthTests */record[/* isDepthTests */4],
    /* alphas */record[/* alphas */5],
    /* defaultColor */record[/* defaultColor */6],
    /* gameObjectsMap */record[/* gameObjectsMap */7],
    /* disposedIndexArray */record[/* disposedIndexArray */8],
    /* nameMap */record[/* nameMap */9],
    /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */10]
  ];
  return newrecord;
}

function _restoreTypeArrays(currentBasicMaterialRecord, targetBasicMaterialRecord) {
  var match = currentBasicMaterialRecord[/* shaderIndices */2] === targetBasicMaterialRecord[/* shaderIndices */2] && currentBasicMaterialRecord[/* colors */3] === targetBasicMaterialRecord[/* colors */3] && currentBasicMaterialRecord[/* isDepthTests */4] === targetBasicMaterialRecord[/* isDepthTests */4];
  if (match) {
    return /* tuple */[
            currentBasicMaterialRecord,
            targetBasicMaterialRecord
          ];
  } else {
    RecordBasicMaterialMainService$Wonderjs.setAllTypeArrDataToDefault(currentBasicMaterialRecord[/* index */0], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0), currentBasicMaterialRecord[/* defaultColor */6], /* tuple */[
          currentBasicMaterialRecord[/* shaderIndices */2],
          currentBasicMaterialRecord[/* colors */3],
          currentBasicMaterialRecord[/* isDepthTests */4],
          currentBasicMaterialRecord[/* alphas */5]
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
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentBasicMaterialRecord[/* isDepthTests */4],
          0
        ], /* tuple */[
          targetBasicMaterialRecord[/* isDepthTests */4],
          0
        ], targetBasicMaterialRecord[/* isDepthTests */4].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentBasicMaterialRecord[/* alphas */5],
          0
        ], /* tuple */[
          targetBasicMaterialRecord[/* alphas */5],
          0
        ], targetBasicMaterialRecord[/* alphas */5].length);
    return /* tuple */[
            currentBasicMaterialRecord,
            targetBasicMaterialRecord
          ];
  }
}

function restore(gl, currentState, targetState) {
  var targetState$1 = _resetShaderIndices(targetState);
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(targetState$1);
  var targetState$2 = InitBasicMaterialMainService$Wonderjs.initMaterials(AliveMaterialService$Wonderjs.getAllAliveMaterials(match[/* index */0], match[/* disposedIndexArray */8]), gl, targetState$1);
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
    /* isDepthTests */currentBasicMaterialRecord$1[/* isDepthTests */4],
    /* alphas */currentBasicMaterialRecord$1[/* alphas */5],
    /* defaultColor */targetBasicMaterialRecord$1[/* defaultColor */6],
    /* gameObjectsMap */targetBasicMaterialRecord$1[/* gameObjectsMap */7],
    /* disposedIndexArray */targetBasicMaterialRecord$1[/* disposedIndexArray */8],
    /* nameMap */targetBasicMaterialRecord$1[/* nameMap */9],
    /* materialArrayForWorkerInit */targetBasicMaterialRecord$1[/* materialArrayForWorkerInit */10]
  ];
  return newrecord;
}

export {
  _resetShaderIndices ,
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
