'use strict';

var CreateTypeArrayGeometryUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/geometry/CreateTypeArrayGeometryUtils.bs.js");

function createState(isDebug, geometryPointCount, geometryCount, buffer) {
  var match = CreateTypeArrayGeometryUtils$OrillusionComponentWorkerUtils.createTypeArrays(buffer, geometryPointCount, geometryCount);
  return {
          config: {
            isDebug: isDebug
          },
          vertices: match[0],
          texCoords: match[1],
          normals: match[2],
          tangents: match[3],
          indices: match[4],
          verticesInfos: match[5],
          texCoordsInfos: match[6],
          normalsInfos: match[7],
          tangentsInfos: match[8],
          indicesInfos: match[9]
        };
}

exports.createState = createState;
/* No side effect */
