

import * as TypeArrayService$Wonderjs from "../../../../primitive/buffer/TypeArrayService.js";
import * as BufferCustomGeometryService$Wonderjs from "../../../../record/main/geometry/custom/BufferCustomGeometryService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "./RecordCustomGeometryMainService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getVertices(index, state) {
  var match = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferCustomGeometryService$Wonderjs.getInfoIndex(index), match[/* vertices */2], match[/* verticesInfos */6]);
}

function setVerticesByTypeArray(index, data, state) {
  var record = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  var vertices = record[/* vertices */2];
  var verticesOffset = record[/* verticesOffset */10];
  record[/* verticesOffset */10] = ReallocatedPointsGeometryService$Wonderjs.setFloat32PointData(/* tuple */[
        BufferCustomGeometryService$Wonderjs.getInfoIndex(index),
        record[/* verticesInfos */6],
        verticesOffset,
        data.length
      ], (function (param) {
          return TypeArrayService$Wonderjs.fillFloat32ArrayWithOffset(vertices, data, param);
        }));
  return state;
}

export {
  getVertices ,
  setVerticesByTypeArray ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
