

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as HasNormalsService$Wonderjs from "../../../primitive/geometry/HasNormalsService.js";
import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as RecordGeometryMainService$Wonderjs from "./RecordGeometryMainService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function getNormals(index, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  return ReallocatedPointsGeometryService$Wonderjs.getFloat32PointData(BufferGeometryService$Wonderjs.getInfoIndex(index), match[/* normals */4], match[/* normalsInfos */9]);
}

function hasNormals(index, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  return HasNormalsService$Wonderjs.hasNormals(index, match[/* normalsInfos */9]);
}

function setNormalsByTypeArray(index, data, state) {
  var record = RecordGeometryMainService$Wonderjs.getRecord(state);
  var normals = record[/* normals */4];
  var normalsOffset = record[/* normalsOffset */13];
  record[/* normalsOffset */13] = ReallocatedPointsGeometryService$Wonderjs.setFloat32PointData(/* tuple */[
        BufferGeometryService$Wonderjs.getInfoIndex(index),
        record[/* normalsInfos */9],
        normalsOffset,
        data.length
      ], (function (param) {
          return TypeArrayService$Wonderjs.fillFloat32ArrayWithOffset(normals, data, param);
        }));
  return state;
}

export {
  getNormals ,
  hasNormals ,
  setNormalsByTypeArray ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
