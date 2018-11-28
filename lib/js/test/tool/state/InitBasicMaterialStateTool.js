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
      /* textureIndices */init[/* textureIndices */4],
      /* mapUnits */init[/* mapUnits */5],
      /* emptyMapUnitArrayMap */init[/* emptyMapUnitArrayMap */6],
      /* defaultColor */init[/* defaultColor */7],
      /* gameObjectsMap */init[/* gameObjectsMap */8],
      /* disposedIndexArray */init[/* disposedIndexArray */9],
      /* nameMap */init[/* nameMap */10],
      /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */11]
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
      /* textureIndices */init$1[/* textureIndices */4],
      /* mapUnits */init$1[/* mapUnits */5],
      /* emptyMapUnitArrayMap */init$1[/* emptyMapUnitArrayMap */6],
      /* defaultColor */init$1[/* defaultColor */7],
      /* gameObjectsMap */init$1[/* gameObjectsMap */8],
      /* disposedIndexArray */init$1[/* disposedIndexArray */9],
      /* nameMap */init$1[/* nameMap */10],
      /* materialArrayForWorkerInit */init$1[/* materialArrayForWorkerInit */11]
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
