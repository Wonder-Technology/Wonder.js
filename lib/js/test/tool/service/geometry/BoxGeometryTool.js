'use strict';

var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var GeometryAPI$Wonderjs = require("../../../../src/api/geometry/GeometryAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var RecordGeometryMainService$Wonderjs = require("../../../../src/service/state/main/geometry/RecordGeometryMainService.js");
var DisposeGeometryMainService$Wonderjs = require("../../../../src/service/state/main/geometry/DisposeGeometryMainService.js");
var ComputeBoxPointsGeometryService$Wonderjs = require("../../../../src/service/record/main/geometry/ComputeBoxPointsGeometryService.js");

var createBoxGeometry = GeometryAPI$Wonderjs.createBoxGeometry;

function getFacesData(param) {
  return /* tuple */[
          5,
          5,
          5,
          1,
          1,
          1
        ];
}

function getBoxGeometryVertices(state) {
  var match = ComputeBoxPointsGeometryService$Wonderjs.generateAllFaces(/* tuple */[
        5,
        5,
        5,
        1,
        1,
        1
      ]);
  return new Float32Array(match[0]);
}

function getBoxGeometryTexCoords(state) {
  var match = ComputeBoxPointsGeometryService$Wonderjs.generateAllFaces(/* tuple */[
        5,
        5,
        5,
        1,
        1,
        1
      ]);
  return new Float32Array(match[1]);
}

function getBoxGeometryNormals(state) {
  var match = ComputeBoxPointsGeometryService$Wonderjs.generateAllFaces(/* tuple */[
        5,
        5,
        5,
        1,
        1,
        1
      ]);
  return new Float32Array(match[2]);
}

function getBoxGeometryIndices(state) {
  var match = ComputeBoxPointsGeometryService$Wonderjs.generateAllFaces(/* tuple */[
        5,
        5,
        5,
        1,
        1,
        1
      ]);
  return new Uint16Array(match[3]);
}

function createGameObject(state) {
  var match = GeometryAPI$Wonderjs.createBoxGeometry(state);
  var geometry = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          geometry
        ];
}

function getDefaultVertices(param) {
  var match = ComputeBoxPointsGeometryService$Wonderjs.generateAllFaces(/* tuple */[
        5,
        5,
        5,
        1,
        1,
        1
      ]);
  return new Float32Array(match[0]);
}

function isGeometryDisposed(geometry, state) {
  return !DisposeGeometryMainService$Wonderjs.isAliveWithRecord(geometry, RecordGeometryMainService$Wonderjs.getRecord(state));
}

function isBoxGeometry(geometry, state) {
  return Caml_obj.caml_equal(GeometryAPI$Wonderjs.getGeometryVertices(geometry, state), getBoxGeometryVertices(state));
}

exports.createBoxGeometry = createBoxGeometry;
exports.getFacesData = getFacesData;
exports.getBoxGeometryVertices = getBoxGeometryVertices;
exports.getBoxGeometryTexCoords = getBoxGeometryTexCoords;
exports.getBoxGeometryNormals = getBoxGeometryNormals;
exports.getBoxGeometryIndices = getBoxGeometryIndices;
exports.createGameObject = createGameObject;
exports.getDefaultVertices = getDefaultVertices;
exports.isGeometryDisposed = isGeometryDisposed;
exports.isBoxGeometry = isBoxGeometry;
/* GeometryAPI-Wonderjs Not a pure module */
