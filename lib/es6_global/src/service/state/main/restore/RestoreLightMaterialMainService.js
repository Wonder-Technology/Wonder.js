

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as AliveMaterialService$Wonderjs from "../../../primitive/material/AliveMaterialService.js";
import * as RestoreMaterialService$Wonderjs from "../../../record/main/material/RestoreMaterialService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as InitLightMaterialMainService$Wonderjs from "../material/light/InitLightMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../material/light/RecordLightMaterialMainService.js";

function _resetShaderIndices(state) {
  var record = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */RestoreMaterialService$Wonderjs.resetShaderIndices(record[/* index */0], DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0), record[/* shaderIndices */2]),
    /* diffuseColors */record[/* diffuseColors */3],
    /* specularColors */record[/* specularColors */4],
    /* shininess */record[/* shininess */5],
    /* textureIndices */record[/* textureIndices */6],
    /* diffuseMapUnits */record[/* diffuseMapUnits */7],
    /* specularMapUnits */record[/* specularMapUnits */8],
    /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */9],
    /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */record[/* defaultSpecularColor */11],
    /* defaultShininess */record[/* defaultShininess */12],
    /* gameObjectsMap */record[/* gameObjectsMap */13],
    /* disposedIndexArray */record[/* disposedIndexArray */14],
    /* nameMap */record[/* nameMap */15],
    /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */16]
  ];
  return newrecord;
}

function _restoreTypeArrays(currentLightMaterialRecord, targetLightMaterialRecord) {
  var match = currentLightMaterialRecord[/* shaderIndices */2] === targetLightMaterialRecord[/* shaderIndices */2] && currentLightMaterialRecord[/* diffuseColors */3] === targetLightMaterialRecord[/* diffuseColors */3] && currentLightMaterialRecord[/* specularColors */4] === targetLightMaterialRecord[/* specularColors */4] && currentLightMaterialRecord[/* textureIndices */6] === targetLightMaterialRecord[/* textureIndices */6] && currentLightMaterialRecord[/* diffuseMapUnits */7] === targetLightMaterialRecord[/* diffuseMapUnits */7] && currentLightMaterialRecord[/* specularMapUnits */8] === targetLightMaterialRecord[/* specularMapUnits */8];
  if (match) {
    return /* tuple */[
            currentLightMaterialRecord,
            targetLightMaterialRecord
          ];
  } else {
    RecordLightMaterialMainService$Wonderjs.setAllTypeArrDataToDefault(currentLightMaterialRecord[/* index */0], /* tuple */[
          DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0),
          currentLightMaterialRecord[/* defaultDiffuseColor */10],
          currentLightMaterialRecord[/* defaultSpecularColor */11],
          currentLightMaterialRecord[/* defaultShininess */12]
        ], /* tuple */[
          currentLightMaterialRecord[/* shaderIndices */2],
          currentLightMaterialRecord[/* diffuseColors */3],
          currentLightMaterialRecord[/* specularColors */4],
          currentLightMaterialRecord[/* shininess */5],
          currentLightMaterialRecord[/* textureIndices */6],
          currentLightMaterialRecord[/* diffuseMapUnits */7],
          currentLightMaterialRecord[/* specularMapUnits */8]
        ]);
    TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
          currentLightMaterialRecord[/* shaderIndices */2],
          0
        ], /* tuple */[
          targetLightMaterialRecord[/* shaderIndices */2],
          0
        ], targetLightMaterialRecord[/* shaderIndices */2].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentLightMaterialRecord[/* diffuseColors */3],
          0
        ], /* tuple */[
          targetLightMaterialRecord[/* diffuseColors */3],
          0
        ], targetLightMaterialRecord[/* diffuseColors */3].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentLightMaterialRecord[/* specularColors */4],
          0
        ], /* tuple */[
          targetLightMaterialRecord[/* specularColors */4],
          0
        ], targetLightMaterialRecord[/* specularColors */4].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentLightMaterialRecord[/* shininess */5],
          0
        ], /* tuple */[
          targetLightMaterialRecord[/* shininess */5],
          0
        ], targetLightMaterialRecord[/* shininess */5].length);
    TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
          currentLightMaterialRecord[/* textureIndices */6],
          0
        ], /* tuple */[
          targetLightMaterialRecord[/* textureIndices */6],
          0
        ], targetLightMaterialRecord[/* textureIndices */6].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentLightMaterialRecord[/* diffuseMapUnits */7],
          0
        ], /* tuple */[
          targetLightMaterialRecord[/* diffuseMapUnits */7],
          0
        ], targetLightMaterialRecord[/* diffuseMapUnits */7].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentLightMaterialRecord[/* specularMapUnits */8],
          0
        ], /* tuple */[
          targetLightMaterialRecord[/* specularMapUnits */8],
          0
        ], targetLightMaterialRecord[/* specularMapUnits */8].length);
    return /* tuple */[
            currentLightMaterialRecord,
            targetLightMaterialRecord
          ];
  }
}

function restore(gl, currentState, targetState) {
  var targetState$1 = _resetShaderIndices(targetState);
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(targetState$1);
  var targetState$2 = InitLightMaterialMainService$Wonderjs.initMaterials(AliveMaterialService$Wonderjs.getAllAliveMaterials(match[/* index */0], match[/* disposedIndexArray */14]), gl, targetState$1);
  var currentLightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(currentState);
  var targetLightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(targetState$2);
  var match$1 = _restoreTypeArrays(currentLightMaterialRecord, targetLightMaterialRecord);
  var targetLightMaterialRecord$1 = match$1[1];
  var currentLightMaterialRecord$1 = match$1[0];
  var newrecord = Caml_array.caml_array_dup(targetState$2);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */targetLightMaterialRecord$1[/* index */0],
    /* buffer */currentLightMaterialRecord$1[/* buffer */1],
    /* shaderIndices */currentLightMaterialRecord$1[/* shaderIndices */2],
    /* diffuseColors */currentLightMaterialRecord$1[/* diffuseColors */3],
    /* specularColors */currentLightMaterialRecord$1[/* specularColors */4],
    /* shininess */currentLightMaterialRecord$1[/* shininess */5],
    /* textureIndices */currentLightMaterialRecord$1[/* textureIndices */6],
    /* diffuseMapUnits */currentLightMaterialRecord$1[/* diffuseMapUnits */7],
    /* specularMapUnits */currentLightMaterialRecord$1[/* specularMapUnits */8],
    /* emptyMapUnitArrayMap */targetLightMaterialRecord$1[/* emptyMapUnitArrayMap */9],
    /* defaultDiffuseColor */targetLightMaterialRecord$1[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */targetLightMaterialRecord$1[/* defaultSpecularColor */11],
    /* defaultShininess */targetLightMaterialRecord$1[/* defaultShininess */12],
    /* gameObjectsMap */targetLightMaterialRecord$1[/* gameObjectsMap */13],
    /* disposedIndexArray */targetLightMaterialRecord$1[/* disposedIndexArray */14],
    /* nameMap */targetLightMaterialRecord$1[/* nameMap */15],
    /* materialArrayForWorkerInit */targetLightMaterialRecord$1[/* materialArrayForWorkerInit */16]
  ];
  return newrecord;
}

export {
  _resetShaderIndices ,
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
