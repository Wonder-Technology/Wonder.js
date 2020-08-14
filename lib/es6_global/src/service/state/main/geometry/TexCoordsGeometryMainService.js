

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as RecordGeometryMainService$Wonderjs from "./RecordGeometryMainService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getTexCoords(index, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), match[/* texCoords */3], match[/* texCoordsInfos */8]);
}

function setTexCoordsByTypeArray(index, data, state) {
  var record = RecordGeometryMainService$Wonderjs.getRecord(state);
  var texCoords = record[/* texCoords */3];
  var texCoordsOffset = record[/* texCoordsOffset */12];
  record[/* texCoordsOffset */12] = ReallocatedPointsGeometryService$Wonderjs.setFloat32PointData(/* tuple */[
        BufferGeometryService$Wonderjs.getInfoIndex(index),
        record[/* texCoordsInfos */8],
        texCoordsOffset,
        data.length
      ], (function (param) {
          return TypeArrayService$Wonderjs.fillFloat32ArrayWithOffset(texCoords, data, param);
        }));
  return state;
}

function hasTexCoords(index, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.hasPointData(BufferGeometryService$Wonderjs.getInfoIndex(index), match[/* texCoordsInfos */8]);
}

export {
  getTexCoords ,
  setTexCoordsByTypeArray ,
  hasTexCoords ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
