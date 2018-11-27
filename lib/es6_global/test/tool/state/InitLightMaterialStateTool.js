

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as LightMaterialTool$Wonderjs from "../service/material/LightMaterialTool.js";
import * as InitMaterialStateTool$Wonderjs from "./InitMaterialStateTool.js";
import * as CreateInitLightMaterialStateMainService$Wonderjs from "../../../src/service/state/main/material/light/CreateInitLightMaterialStateMainService.js";

function createStateWithoutMaterialData(state) {
  var match = InitMaterialStateTool$Wonderjs.isRenderConfigRecordExist(state);
  if (match) {
    var newrecord = Caml_array.caml_array_dup(state);
    var init = LightMaterialTool$Wonderjs.getRecord(state);
    newrecord[/* lightMaterialRecord */16] = /* record */[
      /* index */init[/* index */0],
      /* buffer */init[/* buffer */1],
      /* shaderIndices */new Uint32Array(/* array */[]),
      /* diffuseColors */init[/* diffuseColors */3],
      /* specularColors */init[/* specularColors */4],
      /* shininess */init[/* shininess */5],
      /* textureIndices */init[/* textureIndices */6],
      /* diffuseMapUnits */init[/* diffuseMapUnits */7],
      /* specularMapUnits */init[/* specularMapUnits */8],
      /* emptyMapUnitArrayMap */init[/* emptyMapUnitArrayMap */9],
      /* defaultDiffuseColor */init[/* defaultDiffuseColor */10],
      /* defaultSpecularColor */init[/* defaultSpecularColor */11],
      /* defaultShininess */init[/* defaultShininess */12],
      /* gameObjectsMap */init[/* gameObjectsMap */13],
      /* disposedIndexArray */init[/* disposedIndexArray */14],
      /* nameMap */init[/* nameMap */15],
      /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */16]
    ];
    return CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
                0,
                /* array */[]
              ], newrecord);
  } else {
    var state$1 = InitMaterialStateTool$Wonderjs.setRenderConfig(1, state);
    var newrecord$1 = Caml_array.caml_array_dup(state$1);
    var init$1 = LightMaterialTool$Wonderjs.getRecord(state$1);
    newrecord$1[/* lightMaterialRecord */16] = /* record */[
      /* index */init$1[/* index */0],
      /* buffer */init$1[/* buffer */1],
      /* shaderIndices */new Uint32Array(/* array */[]),
      /* diffuseColors */init$1[/* diffuseColors */3],
      /* specularColors */init$1[/* specularColors */4],
      /* shininess */init$1[/* shininess */5],
      /* textureIndices */init$1[/* textureIndices */6],
      /* diffuseMapUnits */init$1[/* diffuseMapUnits */7],
      /* specularMapUnits */init$1[/* specularMapUnits */8],
      /* emptyMapUnitArrayMap */init$1[/* emptyMapUnitArrayMap */9],
      /* defaultDiffuseColor */init$1[/* defaultDiffuseColor */10],
      /* defaultSpecularColor */init$1[/* defaultSpecularColor */11],
      /* defaultShininess */init$1[/* defaultShininess */12],
      /* gameObjectsMap */init$1[/* gameObjectsMap */13],
      /* disposedIndexArray */init$1[/* disposedIndexArray */14],
      /* nameMap */init$1[/* nameMap */15],
      /* materialArrayForWorkerInit */init$1[/* materialArrayForWorkerInit */16]
    ];
    return CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
                0,
                /* array */[]
              ], newrecord$1);
  }
}

export {
  createStateWithoutMaterialData ,
  
}
/* LightMaterialTool-Wonderjs Not a pure module */
