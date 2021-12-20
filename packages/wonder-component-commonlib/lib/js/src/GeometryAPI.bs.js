'use strict';

var TangentsGeometryService$WonderComponentCommonlib = require("./geometry/TangentsGeometryService.bs.js");
var CreatePlaneGeometryService$WonderComponentCommonlib = require("./geometry/CreatePlaneGeometryService.bs.js");
var CreateSphereGeometryService$WonderComponentCommonlib = require("./geometry/CreateSphereGeometryService.bs.js");
var CreateTriangleGeometryService$WonderComponentCommonlib = require("./geometry/CreateTriangleGeometryService.bs.js");

var createTriangleGeometry = CreateTriangleGeometryService$WonderComponentCommonlib.create;

var createSphereGeometry = CreateSphereGeometryService$WonderComponentCommonlib.create;

var createPlaneGeometry = CreatePlaneGeometryService$WonderComponentCommonlib.create;

var computeTangents = TangentsGeometryService$WonderComponentCommonlib.computeTangents;

exports.createTriangleGeometry = createTriangleGeometry;
exports.createSphereGeometry = createSphereGeometry;
exports.createPlaneGeometry = createPlaneGeometry;
exports.computeTangents = computeTangents;
/* CreatePlaneGeometryService-WonderComponentCommonlib Not a pure module */
