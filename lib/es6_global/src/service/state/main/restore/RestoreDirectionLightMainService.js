

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../light/direction/RecordDirectionLightMainService.js";

function _restoreTypeArrays(currentDirectionLightRecord, targetDirectionLightRecord) {
  var match = currentDirectionLightRecord[/* colors */2] === targetDirectionLightRecord[/* colors */2] && currentDirectionLightRecord[/* intensities */3] === targetDirectionLightRecord[/* intensities */3];
  if (match) {
    return /* tuple */[
            currentDirectionLightRecord,
            targetDirectionLightRecord
          ];
  } else {
    RecordDirectionLightMainService$Wonderjs.setAllTypeArrDataToDefault(currentDirectionLightRecord[/* index */0], /* tuple */[
          currentDirectionLightRecord[/* colors */2],
          currentDirectionLightRecord[/* intensities */3]
        ]);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentDirectionLightRecord[/* colors */2],
          0
        ], /* tuple */[
          targetDirectionLightRecord[/* colors */2],
          0
        ], targetDirectionLightRecord[/* colors */2].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentDirectionLightRecord[/* intensities */3],
          0
        ], /* tuple */[
          targetDirectionLightRecord[/* intensities */3],
          0
        ], targetDirectionLightRecord[/* intensities */3].length);
    return /* tuple */[
            currentDirectionLightRecord,
            targetDirectionLightRecord
          ];
  }
}

function restore(currentState, targetState) {
  var currentDirectionLightRecord = RecordDirectionLightMainService$Wonderjs.getRecord(currentState);
  var targetDirectionLightRecord = RecordDirectionLightMainService$Wonderjs.getRecord(targetState);
  var match = _restoreTypeArrays(currentDirectionLightRecord, targetDirectionLightRecord);
  var targetDirectionLightRecord$1 = match[1];
  var currentDirectionLightRecord$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* directionLightRecord */21] = /* record */[
    /* index */targetDirectionLightRecord$1[/* index */0],
    /* buffer */currentDirectionLightRecord$1[/* buffer */1],
    /* colors */currentDirectionLightRecord$1[/* colors */2],
    /* intensities */currentDirectionLightRecord$1[/* intensities */3],
    /* renderLightArr */targetDirectionLightRecord$1[/* renderLightArr */4],
    /* gameObjectMap */targetDirectionLightRecord$1[/* gameObjectMap */5],
    /* disposedIndexArray */targetDirectionLightRecord$1[/* disposedIndexArray */6]
  ];
  return newrecord;
}

export {
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
