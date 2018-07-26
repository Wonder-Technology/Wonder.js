

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "../geometry/custom/RecordCustomGeometryMainService.js";

function _restoreTypeArrays(customGeometryPointCount, currentCustomGeometryRecord, targetCustomGeometryRecord) {
  var match = currentCustomGeometryRecord[/* vertices */2] === targetCustomGeometryRecord[/* vertices */2] && currentCustomGeometryRecord[/* normals */4] === targetCustomGeometryRecord[/* normals */4] && currentCustomGeometryRecord[/* indices */5] === targetCustomGeometryRecord[/* indices */5];
  if (match) {
    return /* tuple */[
            currentCustomGeometryRecord,
            targetCustomGeometryRecord
          ];
  } else {
    RecordCustomGeometryMainService$Wonderjs.setAllTypeArrDataToDefault(currentCustomGeometryRecord[/* index */0], customGeometryPointCount, /* tuple */[
          currentCustomGeometryRecord[/* vertices */2],
          currentCustomGeometryRecord[/* texCoords */3],
          currentCustomGeometryRecord[/* normals */4],
          currentCustomGeometryRecord[/* indices */5]
        ]);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentCustomGeometryRecord[/* vertices */2],
          0
        ], /* tuple */[
          targetCustomGeometryRecord[/* vertices */2],
          0
        ], targetCustomGeometryRecord[/* vertices */2].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentCustomGeometryRecord[/* texCoords */3],
          0
        ], /* tuple */[
          targetCustomGeometryRecord[/* texCoords */3],
          0
        ], targetCustomGeometryRecord[/* texCoords */3].length);
    TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
          currentCustomGeometryRecord[/* normals */4],
          0
        ], /* tuple */[
          targetCustomGeometryRecord[/* normals */4],
          0
        ], targetCustomGeometryRecord[/* normals */4].length);
    TypeArrayService$Wonderjs.fillUint16ArrayWithUint16Array(/* tuple */[
          currentCustomGeometryRecord[/* indices */5],
          0
        ], /* tuple */[
          targetCustomGeometryRecord[/* indices */5],
          0
        ], targetCustomGeometryRecord[/* indices */5].length);
    return /* tuple */[
            currentCustomGeometryRecord,
            targetCustomGeometryRecord
          ];
  }
}

function restore(currentState, targetState) {
  var currentCustomGeometryRecord = RecordCustomGeometryMainService$Wonderjs.getRecord(currentState);
  var targetCustomGeometryRecord = RecordCustomGeometryMainService$Wonderjs.getRecord(targetState);
  var match = _restoreTypeArrays(BufferSettingService$Wonderjs.getCustomGeometryPointCount(currentState[/* settingRecord */0]), currentCustomGeometryRecord, targetCustomGeometryRecord);
  var targetCustomGeometryRecord$1 = match[1];
  var currentCustomGeometryRecord$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* customGeometryRecord */23] = /* record */[
    /* index */targetCustomGeometryRecord$1[/* index */0],
    /* buffer */currentCustomGeometryRecord$1[/* buffer */1],
    /* vertices */currentCustomGeometryRecord$1[/* vertices */2],
    /* texCoords */currentCustomGeometryRecord$1[/* texCoords */3],
    /* normals */currentCustomGeometryRecord$1[/* normals */4],
    /* indices */currentCustomGeometryRecord$1[/* indices */5],
    /* verticesInfos */targetCustomGeometryRecord$1[/* verticesInfos */6],
    /* texCoordsInfos */targetCustomGeometryRecord$1[/* texCoordsInfos */7],
    /* normalsInfos */targetCustomGeometryRecord$1[/* normalsInfos */8],
    /* indicesInfos */targetCustomGeometryRecord$1[/* indicesInfos */9],
    /* verticesOffset */targetCustomGeometryRecord$1[/* verticesOffset */10],
    /* texCoordsOffset */targetCustomGeometryRecord$1[/* texCoordsOffset */11],
    /* normalsOffset */targetCustomGeometryRecord$1[/* normalsOffset */12],
    /* indicesOffset */targetCustomGeometryRecord$1[/* indicesOffset */13],
    /* disposeCount */targetCustomGeometryRecord$1[/* disposeCount */14],
    /* gameObjectMap */targetCustomGeometryRecord$1[/* gameObjectMap */15],
    /* groupCountMap */targetCustomGeometryRecord$1[/* groupCountMap */16],
    /* disposedIndexArray */targetCustomGeometryRecord$1[/* disposedIndexArray */17],
    /* disposedIndexMap */targetCustomGeometryRecord$1[/* disposedIndexMap */18],
    /* aliveIndexArray */targetCustomGeometryRecord$1[/* aliveIndexArray */19]
  ];
  return newrecord;
}

export {
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
