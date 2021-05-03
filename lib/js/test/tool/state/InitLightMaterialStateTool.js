'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var LightMaterialTool$Wonderjs = require("../service/material/LightMaterialTool.js");
var InitMaterialStateTool$Wonderjs = require("./InitMaterialStateTool.js");
var CreateInitLightMaterialStateMainService$Wonderjs = require("../../../src/service/state/main/material/light/CreateInitLightMaterialStateMainService.js");

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
      /* diffuseTextureIndices */init[/* diffuseTextureIndices */6],
      /* specularTextureIndices */init[/* specularTextureIndices */7],
      /* defaultDiffuseColor */init[/* defaultDiffuseColor */8],
      /* defaultSpecularColor */init[/* defaultSpecularColor */9],
      /* defaultShininess */init[/* defaultShininess */10],
      /* gameObjectsMap */init[/* gameObjectsMap */11],
      /* disposedIndexArray */init[/* disposedIndexArray */12],
      /* nameMap */init[/* nameMap */13],
      /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */14]
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
      /* diffuseTextureIndices */init$1[/* diffuseTextureIndices */6],
      /* specularTextureIndices */init$1[/* specularTextureIndices */7],
      /* defaultDiffuseColor */init$1[/* defaultDiffuseColor */8],
      /* defaultSpecularColor */init$1[/* defaultSpecularColor */9],
      /* defaultShininess */init$1[/* defaultShininess */10],
      /* gameObjectsMap */init$1[/* gameObjectsMap */11],
      /* disposedIndexArray */init$1[/* disposedIndexArray */12],
      /* nameMap */init$1[/* nameMap */13],
      /* materialArrayForWorkerInit */init$1[/* materialArrayForWorkerInit */14]
    ];
    return CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
                0,
                /* array */[]
              ], newrecord$1);
  }
}

exports.createStateWithoutMaterialData = createStateWithoutMaterialData;
/* LightMaterialTool-Wonderjs Not a pure module */
