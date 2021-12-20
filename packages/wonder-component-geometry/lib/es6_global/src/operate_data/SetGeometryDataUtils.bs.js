

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypeGeometry from "../../../../../../node_modules/wonder-component-type-geometry/lib/es6_global/index.bs.js";
import * as IndicesUtils$WonderComponentGeometry from "./IndicesUtils.bs.js";
import * as NormalsUtils$WonderComponentGeometry from "./NormalsUtils.bs.js";
import * as TangentsUtils$WonderComponentGeometry from "./TangentsUtils.bs.js";
import * as VerticesUtils$WonderComponentGeometry from "./VerticesUtils.bs.js";
import * as TexCoordsUtils$WonderComponentGeometry from "./TexCoordsUtils.bs.js";

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

export {
  setData ,
  
}
/* No side effect */
