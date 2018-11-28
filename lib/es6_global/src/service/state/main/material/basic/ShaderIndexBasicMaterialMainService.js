

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
    /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */6],
    /* defaultColor */record[/* defaultColor */7],
    /* gameObjectsMap */record[/* gameObjectsMap */8],
    /* disposedIndexArray */record[/* disposedIndexArray */9],
    /* nameMap */record[/* nameMap */10],
    /* materialArrayForWorkerInit */record[/* materialArrayForWorkerInit */11]
  ];
  return newrecord;
}

export {
  setShaderIndex ,
  
}
/* ShaderIndicesService-Wonderjs Not a pure module */
