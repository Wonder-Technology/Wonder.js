

import * as Log$OrillusionCommonlib from "../../../../../../node_modules/orillusion-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$OrillusionCommonlib from "../../../../../../node_modules/orillusion-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$OrillusionComponentTypeGeometryWorker from "../../../../../../node_modules/orillusion-component-type-geometry-worker/lib/es6_global/index.bs.js";
import * as IndicesUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/geometry/IndicesUtils.bs.js";
import * as NormalsUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/geometry/NormalsUtils.bs.js";
import * as TangentsUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/geometry/TangentsUtils.bs.js";
import * as VerticesUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/geometry/VerticesUtils.bs.js";
import * as ConfigUtils$OrillusionComponentGeometryWorker from "../config/ConfigUtils.bs.js";
import * as TexCoordsUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/geometry/TexCoordsUtils.bs.js";

function getData(state, geometry, dataName) {
  var indicesInfos = state.indicesInfos;
  var verticesInfos = state.verticesInfos;
  var vertices = state.vertices;
  var isDebug = ConfigUtils$OrillusionComponentGeometryWorker.getIsDebug(state);
  if (dataName === Index$OrillusionComponentTypeGeometryWorker.dataName.vertices) {
    return VerticesUtils$OrillusionComponentWorkerUtils.getVertices(vertices, verticesInfos, isDebug, geometry);
  } else if (dataName === Index$OrillusionComponentTypeGeometryWorker.dataName.normals) {
    return NormalsUtils$OrillusionComponentWorkerUtils.getNormals(state.normals, state.normalsInfos, isDebug, geometry);
  } else if (dataName === Index$OrillusionComponentTypeGeometryWorker.dataName.texCoords) {
    return TexCoordsUtils$OrillusionComponentWorkerUtils.getTexCoords(state.texCoords, state.texCoordsInfos, isDebug, geometry);
  } else if (dataName === Index$OrillusionComponentTypeGeometryWorker.dataName.tangents) {
    return TangentsUtils$OrillusionComponentWorkerUtils.getTangents(state.tangents, state.tangentsInfos, isDebug, geometry);
  } else if (dataName === Index$OrillusionComponentTypeGeometryWorker.dataName.indices) {
    return IndicesUtils$OrillusionComponentWorkerUtils.getIndices(state.indices, indicesInfos, isDebug, geometry);
  } else if (dataName === Index$OrillusionComponentTypeGeometryWorker.dataName.vertices) {
    return VerticesUtils$OrillusionComponentWorkerUtils.getVertices(vertices, verticesInfos, isDebug, geometry);
  } else if (dataName === Index$OrillusionComponentTypeGeometryWorker.dataName.indicesCount) {
    return IndicesUtils$OrillusionComponentWorkerUtils.getIndicesCount(indicesInfos, isDebug, geometry);
  } else {
    return Exception$OrillusionCommonlib.throwErr(Log$OrillusionCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
