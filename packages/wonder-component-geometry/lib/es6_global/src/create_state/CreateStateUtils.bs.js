

import * as CreateMapComponentUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/CreateMapComponentUtils.bs.js";
import * as BufferGeometryUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/BufferGeometryUtils.bs.js";
import * as CreateTypeArrayGeometryUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/CreateTypeArrayGeometryUtils.bs.js";

function _initBufferData(geometryPointCount, geometryCount) {
  var buffer = BufferGeometryUtils$WonderComponentWorkerUtils.createBuffer(geometryPointCount, geometryCount);
  return [
          buffer,
          CreateTypeArrayGeometryUtils$WonderComponentWorkerUtils.createTypeArrays(buffer, geometryPointCount, geometryCount)
        ];
}

function createStateWithSharedArrayBufferData(param, param$1) {
  var geometryCount = param[2];
  var vertices = param$1.vertices;
  var texCoords = param$1.texCoords;
  var normals = param$1.normals;
  var tangents = param$1.tangents;
  var indices = param$1.indices;
  var verticesInfos = param$1.verticesInfos;
  var texCoordsInfos = param$1.texCoordsInfos;
  var normalsInfos = param$1.normalsInfos;
  var tangentsInfos = param$1.tangentsInfos;
  var indicesInfos = param$1.indicesInfos;
  return {
          config: {
            isDebug: param[0],
            geometryCount: geometryCount,
            geometryPointCount: param[1]
          },
          maxIndex: 0,
          buffer: param$1.buffer,
          vertices: vertices,
          texCoords: texCoords,
          normals: normals,
          tangents: tangents,
          indices: indices,
          verticesInfos: verticesInfos,
          texCoordsInfos: texCoordsInfos,
          normalsInfos: normalsInfos,
          tangentsInfos: tangentsInfos,
          indicesInfos: indicesInfos,
          verticesOffset: 0,
          texCoordsOffset: 0,
          normalsOffset: 0,
          tangentsOffset: 0,
          indicesOffset: 0,
          gameObjectsMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(geometryCount),
          gameObjectGeometryMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(geometryCount)
        };
}

function createState(isDebug, geometryPointCount, geometryCount) {
  var match = _initBufferData(geometryPointCount, geometryCount);
  var match$1 = match[1];
  return createStateWithSharedArrayBufferData([
              isDebug,
              geometryPointCount,
              geometryCount
            ], {
              buffer: match[0],
              vertices: match$1[0],
              texCoords: match$1[1],
              normals: match$1[2],
              tangents: match$1[3],
              indices: match$1[4],
              verticesInfos: match$1[5],
              texCoordsInfos: match$1[6],
              normalsInfos: match$1[7],
              tangentsInfos: match$1[8],
              indicesInfos: match$1[9]
            });
}

export {
  _initBufferData ,
  createStateWithSharedArrayBufferData ,
  createState ,
  
}
/* No side effect */
