

import * as ComputeCylinderPointsGeometryService$Wonderjs from "./ComputeCylinderPointsGeometryService.js";

function compute($staropt$star, $staropt$star$1, $staropt$star$2, radius, height, radialSegments, heightSegments, param) {
  var openEnded = $staropt$star !== undefined ? $staropt$star : false;
  var thetaStart = $staropt$star$1 !== undefined ? $staropt$star$1 : 0.0;
  var thetaLength = $staropt$star$2 !== undefined ? $staropt$star$2 : 2 * Math.PI;
  return ComputeCylinderPointsGeometryService$Wonderjs.compute(openEnded, thetaStart, thetaLength, 0, radius, height, radialSegments, heightSegments, /* () */0);
}

export {
  compute ,
  
}
/* No side effect */
