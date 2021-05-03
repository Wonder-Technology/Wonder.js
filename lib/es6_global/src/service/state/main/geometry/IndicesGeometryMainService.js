

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as RecordGeometryMainService$Wonderjs from "./RecordGeometryMainService.js";
import * as IndicesTypeAllGeometryService$Wonderjs from "../../../record/all/geometry/IndicesTypeAllGeometryService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getIndicesType(index, state) {
  var record = RecordGeometryMainService$Wonderjs.getRecord(state);
  var indicesTypeMap = record[/* indicesTypeMap */17];
  return IndicesTypeAllGeometryService$Wonderjs.getIndicesType(index, indicesTypeMap);
}

function unsafeGetIndicesType(index, state) {
  var record = RecordGeometryMainService$Wonderjs.getRecord(state);
  var indicesTypeMap = record[/* indicesTypeMap */17];
  return IndicesTypeAllGeometryService$Wonderjs.unsafeGetIndicesType(index, indicesTypeMap);
}

function setIndicesType(index, indicesType, state) {
  var record = RecordGeometryMainService$Wonderjs.getRecord(state);
  var indicesTypeMap = record[/* indicesTypeMap */17];
  record[/* indicesTypeMap */17] = IndicesTypeAllGeometryService$Wonderjs.setIndicesType(index, indicesType, indicesTypeMap);
  return state;
}

function getIndices16(index, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.getUint16PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), match[/* indices16 */5], match[/* indicesInfos */10]);
}

function setIndicesByUint16Array(index, data, state) {
  var state$1 = setIndicesType(index, /* Short */0, state);
  var record = RecordGeometryMainService$Wonderjs.getRecord(state$1);
  var indices16 = record[/* indices16 */5];
  var indices16Offset = record[/* indices16Offset */14];
  record[/* indices16Offset */14] = ReallocatedPointsGeometryService$Wonderjs.setUint16PointData(/* tuple */[
        BufferGeometryService$Wonderjs.getInfoIndex(index),
        record[/* indicesInfos */10],
        indices16Offset,
        data.length
      ], (function (param) {
          return TypeArrayService$Wonderjs.fillUint16ArrayWithOffset(indices16, data, param);
        }));
  return state$1;
}

function getIndices32(index, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.getUint32PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), match[/* indices32 */6], match[/* indicesInfos */10]);
}

function setIndicesByUint32Array(index, data, state) {
  var state$1 = setIndicesType(index, /* Int */1, state);
  var record = RecordGeometryMainService$Wonderjs.getRecord(state$1);
  var indices32 = record[/* indices32 */6];
  var indices32Offset = record[/* indices32Offset */15];
  record[/* indices32Offset */15] = ReallocatedPointsGeometryService$Wonderjs.setUint32PointData(/* tuple */[
        BufferGeometryService$Wonderjs.getInfoIndex(index),
        record[/* indicesInfos */10],
        indices32Offset,
        data.length
      ], (function (param) {
          return TypeArrayService$Wonderjs.fillUint32ArrayWithOffset(indices32, data, param);
        }));
  return state$1;
}

function hasIndices(index, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.hasPointData(BufferGeometryService$Wonderjs.getInfoIndex(index), match[/* indicesInfos */10]);
}

function hasIndices16(geometry, state) {
  var match = unsafeGetIndicesType(geometry, state);
  if (match) {
    return false;
  } else {
    return true;
  }
}

function hasIndices32(geometry, state) {
  var match = unsafeGetIndicesType(geometry, state);
  if (match) {
    return true;
  } else {
    return false;
  }
}

export {
  getIndicesType ,
  unsafeGetIndicesType ,
  setIndicesType ,
  getIndices16 ,
  setIndicesByUint16Array ,
  getIndices32 ,
  setIndicesByUint32Array ,
  hasIndices ,
  hasIndices16 ,
  hasIndices32 ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
