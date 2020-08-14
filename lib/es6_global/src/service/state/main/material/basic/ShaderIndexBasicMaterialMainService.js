

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";

function setShaderIndex(materialIndex, shaderIndex, state) {
  var record = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */ShaderIndicesService$Wonderjs.setShaderIndex(materialIndex, shaderIndex, record[/* shaderIndices */2]),
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

export {
  setShaderIndex ,
  
}
/* ShaderIndicesService-Wonderjs Not a pure module */
