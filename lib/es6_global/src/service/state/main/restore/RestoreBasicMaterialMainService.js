

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
    /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */6],
    /* defaultColor */record[/* defaultColor */7],
    /* gameObjectsMap */record[/* gameObjectsMap */8],
    /* disposedIndexArray */record[/* disposedIndexArray */9],
    /* nameMap */record[/* nameMap */10],
    /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */11]
  ];
  return newrecord;
}

function _restoreTypeArrays(currentBasicMaterialRecord, targetBasicMaterialRecord) {
  var match = currentBasicMaterialRecord[/* shaderIndices */2] === targetBasicMaterialRecord[/* shaderIndices */2] && currentBasicMaterialRecord[/* colors */3] === targetBasicMaterialRecord[/* colors */3] && currentBasicMaterialRecord[/* textureIndices */4] === targetBasicMaterialRecord[/* textureIndices */4] && currentBasicMaterialRecord[/* mapUnits */5] === targetBasicMaterialRecord[/* mapUnits */5];
  if (match) {
    return /* tuple */[
            currentBasicMaterialRecord,
            targetBasicMaterialRecord
          ];
  } else {
    RecordBasicMaterialMainService$Wonderjs.setAllTypeArrDataToDefault(currentBasicMaterialRecord[/* index */0], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0), currentBasicMaterialRecord[/* defaultColor */7], /* tuple */[
          currentBasicMaterialRecord[/* shaderIndices */2],
          currentBasicMaterialRecord[/* colors */3],
          currentBasicMaterialRecord[/* textureIndices */4],
          currentBasicMaterialRecord[/* mapUnits */5]
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
    return /* tuple */[
            currentBasicMaterialRecord,
            targetBasicMaterialRecord
          ];
  }
}

function restore(gl, currentState, targetState) {
  var targetState$1 = _resetShaderIndices(targetState);
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(targetState$1);
  var targetState$2 = InitBasicMaterialMainService$Wonderjs.initMaterials(AliveMaterialService$Wonderjs.getAllAliveMaterials(match[/* index */0], match[/* disposedIndexArray */9]), gl, targetState$1);
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
    /* emptyMapUnitArrayMap */targetBasicMaterialRecord$1[/* emptyMapUnitArrayMap */6],
    /* defaultColor */targetBasicMaterialRecord$1[/* defaultColor */7],
    /* gameObjectsMap */targetBasicMaterialRecord$1[/* gameObjectsMap */8],
    /* disposedIndexArray */targetBasicMaterialRecord$1[/* disposedIndexArray */9],
    /* nameMap */targetBasicMaterialRecord$1[/* nameMap */10],
    /* materialArrayForWorkerInit */targetBasicMaterialRecord$1[/* materialArrayForWorkerInit */11]
  ];
  return newrecord;
}

export {
  _resetShaderIndices ,
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
