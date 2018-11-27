

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";

function setShaderIndex(materialIndex, shaderIndex, state) {
  var record = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */ShaderIndicesService$Wonderjs.setShaderIndex(materialIndex, shaderIndex, record[/* shaderIndices */2]),
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

export {
  setShaderIndex ,
  
}
/* ShaderIndicesService-Wonderjs Not a pure module */
