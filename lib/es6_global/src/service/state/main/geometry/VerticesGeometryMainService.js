

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as RecordGeometryMainService$Wonderjs from "./RecordGeometryMainService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getVertices(index, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), match[/* vertices */2], match[/* verticesInfos */7]);
}

function setVerticesByTypeArray(index, data, state) {
  var record = RecordGeometryMainService$Wonderjs.getRecord(state);
  var vertices = record[/* vertices */2];
  var verticesOffset = record[/* verticesOffset */11];
  record[/* verticesOffset */11] = ReallocatedPointsGeometryService$Wonderjs.setFloat32PointData(/* tuple */[
        BufferGeometryService$Wonderjs.getInfoIndex(index),
        record[/* verticesInfos */7],
        verticesOffset,
        data.length
      ], (function (param) {
          return TypeArrayService$Wonderjs.fillFloat32ArrayWithOffset(vertices, data, param);
        }));
  return state;
}

function hasVertices(index, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.hasPointData(BufferGeometryService$Wonderjs.getInfoIndex(index), match[/* verticesInfos */7]);
}

export {
  getVertices ,
  setVerticesByTypeArray ,
  hasVertices ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
