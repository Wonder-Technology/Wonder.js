

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";

function _restoreTypeArrays(currentTransformRecord, targetTransformRecord) {
  var match = currentTransformRecord[/* localPositions */3] === targetTransformRecord[/* localPositions */3] && currentTransformRecord[/* localRotations */4] === targetTransformRecord[/* localRotations */4] && currentTransformRecord[/* localScales */5] === targetTransformRecord[/* localScales */5] && currentTransformRecord[/* localToWorldMatrices */2] === targetTransformRecord[/* localToWorldMatrices */2];
  if (match) {
    return /* tuple */[
            currentTransformRecord,
            targetTransformRecord
          ];
  } else {
    RecordTransformMainService$Wonderjs.setAllTypeArrDataToDefault(currentTransformRecord[/* index */0], /* tuple */[
          currentTransformRecord[/* defaultLocalToWorldMatrix */11],
          currentTransformRecord[/* defaultLocalPosition */12],
          currentTransformRecord[/* defaultLocalRotation */13],
          currentTransformRecord[/* defaultLocalScale */14]
        ], /* tuple */[
          currentTransformRecord[/* localToWorldMatrices */2],
          currentTransformRecord[/* localPositions */3],
          currentTransformRecord[/* localRotations */4],
          currentTransformRecord[/* localScales */5]
        ]);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentTransformRecord[/* localPositions */3],
          0
        ], /* tuple */[
          targetTransformRecord[/* localPositions */3],
          0
        ], targetTransformRecord[/* localPositions */3].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentTransformRecord[/* localRotations */4],
          0
        ], /* tuple */[
          targetTransformRecord[/* localRotations */4],
          0
        ], targetTransformRecord[/* localRotations */4].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentTransformRecord[/* localScales */5],
          0
        ], /* tuple */[
          targetTransformRecord[/* localScales */5],
          0
        ], targetTransformRecord[/* localScales */5].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentTransformRecord[/* localToWorldMatrices */2],
          0
        ], /* tuple */[
          targetTransformRecord[/* localToWorldMatrices */2],
          0
        ], targetTransformRecord[/* localToWorldMatrices */2].length);
    return /* tuple */[
            currentTransformRecord,
            targetTransformRecord
          ];
  }
}

function restore(currentState, targetState) {
  var currentTransformRecord = RecordTransformMainService$Wonderjs.getRecord(currentState);
  var targetTransformRecord = RecordTransformMainService$Wonderjs.getRecord(targetState);
  var match = _restoreTypeArrays(currentTransformRecord, targetTransformRecord);
  var currentTransformRecord$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  var newrecord$1 = Caml_array.caml_array_dup(match[1]);
  newrecord[/* transformRecord */11] = (newrecord$1[/* buffer */1] = currentTransformRecord$1[/* buffer */1], newrecord$1[/* localToWorldMatrices */2] = currentTransformRecord$1[/* localToWorldMatrices */2], newrecord$1[/* localPositions */3] = currentTransformRecord$1[/* localPositions */3], newrecord$1[/* localRotations */4] = currentTransformRecord$1[/* localRotations */4], newrecord$1[/* localScales */5] = currentTransformRecord$1[/* localScales */5], newrecord$1);
  return newrecord;
}

export {
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
