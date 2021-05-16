

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/BufferMeshRendererService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../meshRenderer/RecordMeshRendererMainService.js";

function _restoreTypeArrays(currentMeshRecord, targetMeshRecord) {
  var match = currentMeshRecord[/* drawModes */2] === targetMeshRecord[/* drawModes */2] && currentMeshRecord[/* isRenders */3] === targetMeshRecord[/* isRenders */3];
  if (match) {
    return /* tuple */[
            currentMeshRecord,
            targetMeshRecord
          ];
  } else {
    RecordMeshRendererMainService$Wonderjs.setAllTypeArrDataToDefault(currentMeshRecord[/* index */0], /* tuple */[
          BufferMeshRendererService$Wonderjs.getDefaultDrawMode(/* () */0),
          BufferMeshRendererService$Wonderjs.getDefaultIsRender(/* () */0)
        ], /* tuple */[
          currentMeshRecord[/* drawModes */2],
          currentMeshRecord[/* isRenders */3]
        ]);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentMeshRecord[/* drawModes */2],
          0
        ], /* tuple */[
          targetMeshRecord[/* drawModes */2],
          0
        ], targetMeshRecord[/* drawModes */2].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentMeshRecord[/* isRenders */3],
          0
        ], /* tuple */[
          targetMeshRecord[/* isRenders */3],
          0
        ], targetMeshRecord[/* isRenders */3].length);
    return /* tuple */[
            currentMeshRecord,
            targetMeshRecord
          ];
  }
}

function restore(currentState, targetState) {
  var currentMeshRecord = RecordMeshRendererMainService$Wonderjs.getRecord(currentState);
  var targetMeshRecord = RecordMeshRendererMainService$Wonderjs.getRecord(targetState);
  var match = _restoreTypeArrays(currentMeshRecord, targetMeshRecord);
  var targetMeshRecord$1 = match[1];
  var currentMeshRecord$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* meshRendererRecord */24] = /* record */[
    /* index */targetMeshRecord$1[/* index */0],
    /* buffer */targetMeshRecord$1[/* buffer */1],
    /* drawModes */currentMeshRecord$1[/* drawModes */2],
    /* isRenders */currentMeshRecord$1[/* isRenders */3],
    /* basicMaterialRenderGameObjectMap */targetMeshRecord$1[/* basicMaterialRenderGameObjectMap */4],
    /* lightMaterialRenderGameObjectMap */targetMeshRecord$1[/* lightMaterialRenderGameObjectMap */5],
    /* gameObjectMap */targetMeshRecord$1[/* gameObjectMap */6],
    /* disposedIndexArray */targetMeshRecord$1[/* disposedIndexArray */7]
  ];
  return newrecord;
}

export {
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
