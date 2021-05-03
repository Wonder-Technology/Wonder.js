'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var InitMaterialStateTool$Wonderjs = require("./InitMaterialStateTool.js");
var RecordBasicMaterialMainService$Wonderjs = require("../../../src/service/state/main/material/basic/RecordBasicMaterialMainService.js");
var CreateInitBasicMaterialStateMainService$Wonderjs = require("../../../src/service/state/main/material/basic/CreateInitBasicMaterialStateMainService.js");

var getRecord = RecordBasicMaterialMainService$Wonderjs.getRecord;

function createStateWithoutMaterialData(state) {
  var match = InitMaterialStateTool$Wonderjs.isRenderConfigRecordExist(state);
  if (match) {
    var newrecord = Caml_array.caml_array_dup(state);
    var init = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
    newrecord[/* basicMaterialRecord */15] = /* record */[
      /* index */init[/* index */0],
      /* buffer */init[/* buffer */1],
      /* shaderIndices */new Uint32Array(/* array */[]),
      /* colors */init[/* colors */3],
      /* isDepthTests */init[/* isDepthTests */4],
      /* alphas */init[/* alphas */5],
      /* defaultColor */init[/* defaultColor */6],
      /* gameObjectsMap */init[/* gameObjectsMap */7],
      /* disposedIndexArray */init[/* disposedIndexArray */8],
      /* nameMap */init[/* nameMap */9],
      /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */10]
    ];
    return CreateInitBasicMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
                0,
                /* array */[]
              ], newrecord);
  } else {
    var state$1 = InitMaterialStateTool$Wonderjs.setRenderConfig(1, state);
    var newrecord$1 = Caml_array.caml_array_dup(state$1);
    var init$1 = RecordBasicMaterialMainService$Wonderjs.getRecord(state$1);
    newrecord$1[/* basicMaterialRecord */15] = /* record */[
      /* index */init$1[/* index */0],
      /* buffer */init$1[/* buffer */1],
      /* shaderIndices */new Uint32Array(/* array */[]),
      /* colors */init$1[/* colors */3],
      /* isDepthTests */init$1[/* isDepthTests */4],
      /* alphas */init$1[/* alphas */5],
      /* defaultColor */init$1[/* defaultColor */6],
      /* gameObjectsMap */init$1[/* gameObjectsMap */7],
      /* disposedIndexArray */init$1[/* disposedIndexArray */8],
      /* nameMap */init$1[/* nameMap */9],
      /* materialArrayForWorkerInit */init$1[/* materialArrayForWorkerInit */10]
    ];
    return CreateInitBasicMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
                0,
                /* array */[]
              ], newrecord$1);
  }
}

exports.getRecord = getRecord;
exports.createStateWithoutMaterialData = createStateWithoutMaterialData;
/* RecordBasicMaterialMainService-Wonderjs Not a pure module */
