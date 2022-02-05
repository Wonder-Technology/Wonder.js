

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypeGeometry from "../../../../../../node_modules/wonder-component-type-geometry/lib/es6_global/index.bs.js";
import * as ConfigUtils$WonderComponentGeometry from "../config/ConfigUtils.bs.js";
import * as IndicesUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/IndicesUtils.bs.js";
import * as NormalsUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/NormalsUtils.bs.js";
import * as TangentsUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/TangentsUtils.bs.js";
import * as VerticesUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/VerticesUtils.bs.js";
import * as TexCoordsUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/geometry/TexCoordsUtils.bs.js";

function getData(state, param, param$1) {
  var vertices = state.vertices;
  var texCoords = state.texCoords;
  var normals = state.normals;
  var tangents = state.tangents;
  var indices = state.indices;
  var verticesInfos = state.verticesInfos;
  var texCoordsInfos = state.texCoordsInfos;
  var normalsInfos = state.normalsInfos;
  var tangentsInfos = state.tangentsInfos;
  var indicesInfos = state.indicesInfos;
  var isDebug = ConfigUtils$WonderComponentGeometry.getIsDebug(state);
  if (param$1 === Index$WonderComponentTypeGeometry.dataName.vertices) {
    return VerticesUtils$WonderComponentWorkerUtils.getVertices(vertices, verticesInfos, isDebug, param);
  } else if (param$1 === Index$WonderComponentTypeGeometry.dataName.normals) {
    return NormalsUtils$WonderComponentWorkerUtils.getNormals(normals, normalsInfos, isDebug, param);
  } else if (param$1 === Index$WonderComponentTypeGeometry.dataName.texCoords) {
    return TexCoordsUtils$WonderComponentWorkerUtils.getTexCoords(texCoords, texCoordsInfos, isDebug, param);
  } else if (param$1 === Index$WonderComponentTypeGeometry.dataName.tangents) {
    return TangentsUtils$WonderComponentWorkerUtils.getTangents(tangents, tangentsInfos, isDebug, param);
  } else if (param$1 === Index$WonderComponentTypeGeometry.dataName.indices) {
    return IndicesUtils$WonderComponentWorkerUtils.getIndices(indices, indicesInfos, isDebug, param);
  } else if (param$1 === Index$WonderComponentTypeGeometry.dataName.vertices) {
    return VerticesUtils$WonderComponentWorkerUtils.getVertices(vertices, verticesInfos, isDebug, param);
  } else if (param$1 === Index$WonderComponentTypeGeometry.dataName.indicesCount) {
    return IndicesUtils$WonderComponentWorkerUtils.getIndicesCount(indicesInfos, isDebug, param);
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$1, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
