

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as RecordPointLightMainService$Wonderjs from "../light/point/RecordPointLightMainService.js";

function _restoreTypeArrays(currentPointLightRecord, targetPointLightRecord) {
  var match = currentPointLightRecord[/* colors */2] === targetPointLightRecord[/* colors */2] && currentPointLightRecord[/* intensities */3] === targetPointLightRecord[/* intensities */3] && currentPointLightRecord[/* constants */4] === targetPointLightRecord[/* constants */4] && currentPointLightRecord[/* linears */5] === targetPointLightRecord[/* linears */5] && currentPointLightRecord[/* quadratics */6] === targetPointLightRecord[/* quadratics */6] && currentPointLightRecord[/* ranges */7] === targetPointLightRecord[/* ranges */7];
  if (match) {
    return /* tuple */[
            currentPointLightRecord,
            targetPointLightRecord
          ];
  } else {
    RecordPointLightMainService$Wonderjs.setAllTypeArrDataToDefault(currentPointLightRecord[/* index */0], /* tuple */[
          currentPointLightRecord[/* colors */2],
          currentPointLightRecord[/* intensities */3],
          currentPointLightRecord[/* constants */4],
          currentPointLightRecord[/* linears */5],
          currentPointLightRecord[/* quadratics */6],
          currentPointLightRecord[/* ranges */7]
        ]);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentPointLightRecord[/* colors */2],
          0
        ], /* tuple */[
          targetPointLightRecord[/* colors */2],
          0
        ], targetPointLightRecord[/* colors */2].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentPointLightRecord[/* intensities */3],
          0
        ], /* tuple */[
          targetPointLightRecord[/* intensities */3],
          0
        ], targetPointLightRecord[/* intensities */3].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentPointLightRecord[/* constants */4],
          0
        ], /* tuple */[
          targetPointLightRecord[/* constants */4],
          0
        ], targetPointLightRecord[/* constants */4].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentPointLightRecord[/* linears */5],
          0
        ], /* tuple */[
          targetPointLightRecord[/* linears */5],
          0
        ], targetPointLightRecord[/* linears */5].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentPointLightRecord[/* quadratics */6],
          0
        ], /* tuple */[
          targetPointLightRecord[/* quadratics */6],
          0
        ], targetPointLightRecord[/* quadratics */6].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentPointLightRecord[/* ranges */7],
          0
        ], /* tuple */[
          targetPointLightRecord[/* ranges */7],
          0
        ], targetPointLightRecord[/* ranges */7].length);
    return /* tuple */[
            currentPointLightRecord,
            targetPointLightRecord
          ];
  }
}

function restore(currentState, targetState) {
  var currentPointLightRecord = RecordPointLightMainService$Wonderjs.getRecord(currentState);
  var targetPointLightRecord = RecordPointLightMainService$Wonderjs.getRecord(targetState);
  var match = _restoreTypeArrays(currentPointLightRecord, targetPointLightRecord);
  var targetPointLightRecord$1 = match[1];
  var currentPointLightRecord$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* pointLightRecord */21] = /* record */[
    /* index */targetPointLightRecord$1[/* index */0],
    /* buffer */currentPointLightRecord$1[/* buffer */1],
    /* colors */currentPointLightRecord$1[/* colors */2],
    /* intensities */currentPointLightRecord$1[/* intensities */3],
    /* constants */currentPointLightRecord$1[/* constants */4],
    /* linears */currentPointLightRecord$1[/* linears */5],
    /* quadratics */currentPointLightRecord$1[/* quadratics */6],
    /* ranges */currentPointLightRecord$1[/* ranges */7],
    /* renderLightArr */targetPointLightRecord$1[/* renderLightArr */8],
    /* disposedIndexArray */targetPointLightRecord$1[/* disposedIndexArray */9],
    /* gameObjectMap */targetPointLightRecord$1[/* gameObjectMap */10]
  ];
  return newrecord;
}

export {
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
