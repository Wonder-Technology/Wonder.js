'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypeGeometry = require("wonder-component-type-geometry/lib/js/index.bs.js");
var IndicesUtils$WonderComponentGeometry = require("./IndicesUtils.bs.js");
var NormalsUtils$WonderComponentGeometry = require("./NormalsUtils.bs.js");
var TangentsUtils$WonderComponentGeometry = require("./TangentsUtils.bs.js");
var VerticesUtils$WonderComponentGeometry = require("./VerticesUtils.bs.js");
var TexCoordsUtils$WonderComponentGeometry = require("./TexCoordsUtils.bs.js");

function setData(state, geometry, dataName, dataValue) {
  if (dataName === Index$WonderComponentTypeGeometry.dataName.vertices) {
    return VerticesUtils$WonderComponentGeometry.setVertices(state, geometry, dataValue);
  } else if (dataName === Index$WonderComponentTypeGeometry.dataName.normals) {
    return NormalsUtils$WonderComponentGeometry.setNormals(state, geometry, dataValue);
  } else if (dataName === Index$WonderComponentTypeGeometry.dataName.texCoords) {
    return TexCoordsUtils$WonderComponentGeometry.setTexCoords(state, geometry, dataValue);
  } else if (dataName === Index$WonderComponentTypeGeometry.dataName.tangents) {
    return TangentsUtils$WonderComponentGeometry.setTangents(state, geometry, dataValue);
  } else if (dataName === Index$WonderComponentTypeGeometry.dataName.indices) {
    return IndicesUtils$WonderComponentGeometry.setIndices(state, geometry, dataValue);
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.setData = setData;
/* No side effect */
