'use strict';

var Log$OrillusionCommonlib = require("orillusion-commonlib/lib/js/src/log/Log.bs.js");
var Exception$OrillusionCommonlib = require("orillusion-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$OrillusionComponentTypeGeometryWorker = require("orillusion-component-type-geometry-worker/lib/js/index.bs.js");
var IndicesUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/geometry/IndicesUtils.bs.js");
var NormalsUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/geometry/NormalsUtils.bs.js");
var TangentsUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/geometry/TangentsUtils.bs.js");
var VerticesUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/geometry/VerticesUtils.bs.js");
var ConfigUtils$OrillusionComponentGeometryWorker = require("../config/ConfigUtils.bs.js");
var TexCoordsUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/geometry/TexCoordsUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
