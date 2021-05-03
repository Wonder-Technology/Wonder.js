

import * as Caml_obj from "./../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as GeometryAPI$Wonderjs from "../../../../src/api/geometry/GeometryAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as RecordGeometryMainService$Wonderjs from "../../../../src/service/state/main/geometry/RecordGeometryMainService.js";
import * as DisposeGeometryMainService$Wonderjs from "../../../../src/service/state/main/geometry/DisposeGeometryMainService.js";
import * as ComputeBoxPointsGeometryService$Wonderjs from "../../../../src/service/record/main/geometry/ComputeBoxPointsGeometryService.js";

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

export {
  createBoxGeometry ,
  getFacesData ,
  getBoxGeometryVertices ,
  getBoxGeometryTexCoords ,
  getBoxGeometryNormals ,
  getBoxGeometryIndices ,
  createGameObject ,
  getDefaultVertices ,
  isGeometryDisposed ,
  isBoxGeometry ,
  
}
/* GeometryAPI-Wonderjs Not a pure module */
