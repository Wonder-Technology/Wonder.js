

import * as BufferGeometryService$Wonderjs from "../../main/geometry/BufferGeometryService.js";

function createTypeArrays(buffer, geometryPointCount, geometryCount) {
  return /* tuple */[
          new Float32Array(buffer, BufferGeometryService$Wonderjs.getVerticesOffset(geometryPointCount), BufferGeometryService$Wonderjs.getVertexLength(geometryPointCount)),
          new Float32Array(buffer, BufferGeometryService$Wonderjs.getTexCoordsOffset(geometryPointCount), BufferGeometryService$Wonderjs.getTexCoordsLength(geometryPointCount)),
          new Float32Array(buffer, BufferGeometryService$Wonderjs.getNormalsOffset(geometryPointCount), BufferGeometryService$Wonderjs.getVertexLength(geometryPointCount)),
          new Uint16Array(buffer, BufferGeometryService$Wonderjs.getIndicesOffset(geometryPointCount), BufferGeometryService$Wonderjs.getIndicesLength(geometryPointCount)),
          new Uint32Array(buffer, BufferGeometryService$Wonderjs.getIndices32Offset(geometryPointCount), BufferGeometryService$Wonderjs.getIndices32Length(geometryPointCount)),
          new Uint32Array(buffer, BufferGeometryService$Wonderjs.getVerticesInfosOffset(geometryPointCount), BufferGeometryService$Wonderjs.getVerticesInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryService$Wonderjs.getTexCoordsInfosOffset(geometryPointCount, geometryCount), BufferGeometryService$Wonderjs.getTexCoordsInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryService$Wonderjs.getNormalsInfosOffset(geometryPointCount, geometryCount), BufferGeometryService$Wonderjs.getNormalsInfosLength(geometryCount)),
          new Uint32Array(buffer, BufferGeometryService$Wonderjs.getIndicesInfosOffset(geometryPointCount, geometryCount), BufferGeometryService$Wonderjs.getIndicesInfosLength(geometryCount))
        ];
}

export {
  createTypeArrays ,
  
}
/* BufferGeometryService-Wonderjs Not a pure module */
