

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as IndicesTypeGeometryType$Wonderjs from "../../../record/all/geometry/IndicesTypeGeometryType.js";
import * as RecordGeometryMainService$Wonderjs from "./RecordGeometryMainService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getIndicesType(index, state) {
  var record = RecordGeometryMainService$Wonderjs.getRecord(state);
  var indicesTypeMap = record[/* indicesTypeMap */17];
  return IndicesTypeGeometryType$Wonderjs.getIndicesType(index, indicesTypeMap);
}

function unsafeGetIndicesType(index, state) {
  return OptionService$Wonderjs.unsafeGet(getIndicesType(index, state));
}

function setIndicesType(index, indicesType, state) {
  var record = RecordGeometryMainService$Wonderjs.getRecord(state);
  var indicesTypeMap = record[/* indicesTypeMap */17];
  record[/* indicesTypeMap */17] = IndicesTypeGeometryType$Wonderjs.setIndicesType(index, indicesType, indicesTypeMap);
  return state;
}

function getIndices(index, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.getUint16PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), match[/* indices */5], match[/* indicesInfos */10]);
}

function setIndicesByUint16Array(index, data, state) {
  var state$1 = setIndicesType(index, /* Short */0, state);
  var record = RecordGeometryMainService$Wonderjs.getRecord(state$1);
  var indices = record[/* indices */5];
  var indicesOffset = record[/* indicesOffset */14];
  record[/* indicesOffset */14] = ReallocatedPointsGeometryService$Wonderjs.setUint16PointData(/* tuple */[
        BufferGeometryService$Wonderjs.getInfoIndex(index),
        record[/* indicesInfos */10],
        indicesOffset,
        data.length
      ], (function (param) {
          return TypeArrayService$Wonderjs.fillUint16ArrayWithOffset(indices, data, param);
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

export {
  getIndicesType ,
  unsafeGetIndicesType ,
  setIndicesType ,
  getIndices ,
  setIndicesByUint16Array ,
  getIndices32 ,
  setIndicesByUint32Array ,
  hasIndices ,
  
}
/* OptionService-Wonderjs Not a pure module */
