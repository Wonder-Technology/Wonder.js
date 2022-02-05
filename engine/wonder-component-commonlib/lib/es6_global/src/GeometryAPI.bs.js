

import * as TangentsGeometryService$WonderComponentCommonlib from "./geometry/TangentsGeometryService.bs.js";
import * as CreatePlaneGeometryService$WonderComponentCommonlib from "./geometry/CreatePlaneGeometryService.bs.js";
import * as CreateSphereGeometryService$WonderComponentCommonlib from "./geometry/CreateSphereGeometryService.bs.js";
import * as CreateTriangleGeometryService$WonderComponentCommonlib from "./geometry/CreateTriangleGeometryService.bs.js";

var createTriangleGeometry = CreateTriangleGeometryService$WonderComponentCommonlib.create;

var createSphereGeometry = CreateSphereGeometryService$WonderComponentCommonlib.create;

var createPlaneGeometry = CreatePlaneGeometryService$WonderComponentCommonlib.create;

var computeTangents = TangentsGeometryService$WonderComponentCommonlib.computeTangents;

export {
  createTriangleGeometry ,
  createSphereGeometry ,
  createPlaneGeometry ,
  computeTangents ,
  
}
/* CreatePlaneGeometryService-WonderComponentCommonlib Not a pure module */
