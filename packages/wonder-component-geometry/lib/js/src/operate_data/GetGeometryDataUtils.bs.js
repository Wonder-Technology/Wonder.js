'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypeGeometry = require("wonder-component-type-geometry/lib/js/index.bs.js");
var ConfigUtils$WonderComponentGeometry = require("../config/ConfigUtils.bs.js");
var IndicesUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/IndicesUtils.bs.js");
var NormalsUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/NormalsUtils.bs.js");
var TangentsUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/TangentsUtils.bs.js");
var VerticesUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/VerticesUtils.bs.js");
var TexCoordsUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/TexCoordsUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
