

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as RecordGeometryMainService$Wonderjs from "../geometry/RecordGeometryMainService.js";

function _restoreTypeArrays(geometryPointCount, currentGeometryRecord, targetGeometryRecord) {
  var match = RecordGeometryMainService$Wonderjs.setAllInfosDataToDefault(currentGeometryRecord[/* index */0], /* tuple */[
        currentGeometryRecord[/* verticesInfos */7],
        currentGeometryRecord[/* texCoordsInfos */8],
        currentGeometryRecord[/* normalsInfos */9],
        currentGeometryRecord[/* indicesInfos */10]
      ]);
  TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
        match[0],
        0
      ], /* tuple */[
        targetGeometryRecord[/* verticesInfos */7],
        0
      ], targetGeometryRecord[/* verticesInfos */7].length);
  TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
        match[2],
        0
      ], /* tuple */[
        targetGeometryRecord[/* normalsInfos */9],
        0
      ], targetGeometryRecord[/* normalsInfos */9].length);
  TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
        match[1],
        0
      ], /* tuple */[
        targetGeometryRecord[/* texCoordsInfos */8],
        0
      ], targetGeometryRecord[/* texCoordsInfos */8].length);
  TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
        match[3],
        0
      ], /* tuple */[
        targetGeometryRecord[/* indicesInfos */10],
        0
      ], targetGeometryRecord[/* indicesInfos */10].length);
  return /* tuple */[
          currentGeometryRecord,
          targetGeometryRecord
        ];
}

function restore(currentState, targetState) {
  var currentGeometryRecord = RecordGeometryMainService$Wonderjs.getRecord(currentState);
  var targetGeometryRecord = RecordGeometryMainService$Wonderjs.getRecord(targetState);
  var match = _restoreTypeArrays(BufferSettingService$Wonderjs.getGeometryPointCount(currentState[/* settingRecord */0]), currentGeometryRecord, targetGeometryRecord);
  var currentGeometryRecord$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  var newrecord$1 = Caml_array.caml_array_dup(match[1]);
  newrecord[/* geometryRecord */23] = (newrecord$1[/* verticesInfos */7] = currentGeometryRecord$1[/* verticesInfos */7], newrecord$1[/* texCoordsInfos */8] = currentGeometryRecord$1[/* texCoordsInfos */8], newrecord$1[/* normalsInfos */9] = currentGeometryRecord$1[/* normalsInfos */9], newrecord$1[/* indicesInfos */10] = currentGeometryRecord$1[/* indicesInfos */10], newrecord$1);
  return newrecord;
}

export {
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
