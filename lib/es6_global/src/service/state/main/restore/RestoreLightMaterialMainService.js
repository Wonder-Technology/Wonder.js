

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as TextureIndexService$Wonderjs from "../../../primitive/material/TextureIndexService.js";
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
    /* diffuseTextureIndices */record[/* diffuseTextureIndices */6],
    /* specularTextureIndices */record[/* specularTextureIndices */7],
    /* defaultDiffuseColor */record[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */record[/* defaultSpecularColor */9],
    /* defaultShininess */record[/* defaultShininess */10],
    /* gameObjectsMap */record[/* gameObjectsMap */11],
    /* disposedIndexArray */record[/* disposedIndexArray */12],
    /* nameMap */record[/* nameMap */13],
    /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */14]
  ];
  return newrecord;
}

function _restoreTypeArrays(currentLightMaterialRecord, targetLightMaterialRecord) {
  var match = currentLightMaterialRecord[/* shaderIndices */2] === targetLightMaterialRecord[/* shaderIndices */2] && currentLightMaterialRecord[/* diffuseColors */3] === targetLightMaterialRecord[/* diffuseColors */3] && currentLightMaterialRecord[/* specularColors */4] === targetLightMaterialRecord[/* specularColors */4] && currentLightMaterialRecord[/* diffuseTextureIndices */6] === targetLightMaterialRecord[/* diffuseTextureIndices */6] && currentLightMaterialRecord[/* specularTextureIndices */7] === targetLightMaterialRecord[/* specularTextureIndices */7];
  if (match) {
    return /* tuple */[
            currentLightMaterialRecord,
            targetLightMaterialRecord
          ];
  } else {
    RecordLightMaterialMainService$Wonderjs.setAllTypeArrDataToDefault(currentLightMaterialRecord[/* index */0], /* tuple */[
          DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0),
          currentLightMaterialRecord[/* defaultDiffuseColor */8],
          currentLightMaterialRecord[/* defaultSpecularColor */9],
          currentLightMaterialRecord[/* defaultShininess */10],
          TextureIndexService$Wonderjs.getDefaultTextureIndex(/* () */0)
        ], /* tuple */[
          currentLightMaterialRecord[/* shaderIndices */2],
          currentLightMaterialRecord[/* diffuseColors */3],
          currentLightMaterialRecord[/* specularColors */4],
          currentLightMaterialRecord[/* shininess */5],
          currentLightMaterialRecord[/* diffuseTextureIndices */6],
          currentLightMaterialRecord[/* specularTextureIndices */7]
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
          currentLightMaterialRecord[/* diffuseTextureIndices */6],
          0
        ], /* tuple */[
          targetLightMaterialRecord[/* diffuseTextureIndices */6],
          0
        ], targetLightMaterialRecord[/* diffuseTextureIndices */6].length);
    TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
          currentLightMaterialRecord[/* specularTextureIndices */7],
          0
        ], /* tuple */[
          targetLightMaterialRecord[/* specularTextureIndices */7],
          0
        ], targetLightMaterialRecord[/* specularTextureIndices */7].length);
    return /* tuple */[
            currentLightMaterialRecord,
            targetLightMaterialRecord
          ];
  }
}

function restore(gl, currentState, targetState) {
  var targetState$1 = _resetShaderIndices(targetState);
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(targetState$1);
  var targetState$2 = InitLightMaterialMainService$Wonderjs.initMaterials(AliveMaterialService$Wonderjs.getAllAliveMaterials(match[/* index */0], match[/* disposedIndexArray */12]), gl, targetState$1);
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
    /* diffuseTextureIndices */currentLightMaterialRecord$1[/* diffuseTextureIndices */6],
    /* specularTextureIndices */currentLightMaterialRecord$1[/* specularTextureIndices */7],
    /* defaultDiffuseColor */targetLightMaterialRecord$1[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */targetLightMaterialRecord$1[/* defaultSpecularColor */9],
    /* defaultShininess */targetLightMaterialRecord$1[/* defaultShininess */10],
    /* gameObjectsMap */targetLightMaterialRecord$1[/* gameObjectsMap */11],
    /* disposedIndexArray */targetLightMaterialRecord$1[/* disposedIndexArray */12],
    /* nameMap */targetLightMaterialRecord$1[/* nameMap */13],
    /* materialArrayForWorkerInit */targetLightMaterialRecord$1[/* materialArrayForWorkerInit */14]
  ];
  return newrecord;
}

export {
  _resetShaderIndices ,
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
