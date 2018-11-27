

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as MeshRendererAPI$Wonderjs from "../../../../src/api/MeshRendererAPI.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../src/api/material/BasicMaterialAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../src/api/material/LightMaterialAPI.js";
import * as BufferMeshRendererService$Wonderjs from "../../../../src/service/record/main/meshRenderer/BufferMeshRendererService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../../../../src/service/state/main/meshRenderer/RecordMeshRendererMainService.js";
import * as RenderArrayMeshRendererService$Wonderjs from "../../../../src/service/record/main/meshRenderer/RenderArrayMeshRendererService.js";

function getBasicMaterialRenderArray(state) {
  return RenderArrayMeshRendererService$Wonderjs.getBasicMaterialRenderArray(RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function getLightMaterialRenderArray(state) {
  return RenderArrayMeshRendererService$Wonderjs.getLightMaterialRenderArray(RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function isMeshRenderer(meshRenderer) {
  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* >= */2], Wonder_jest.Expect[/* expect */0](meshRenderer), 0);
}

function createBasicMaterialGameObject(state) {
  var match = MeshRendererAPI$Wonderjs.createMeshRenderer(state);
  var meshRenderer = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var match$2 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match$1[0]);
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, match$2[1], match$2[0]);
  var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, state$1);
  return /* tuple */[
          state$2,
          gameObject,
          meshRenderer
        ];
}

function createLightMaterialGameObject(state) {
  var match = MeshRendererAPI$Wonderjs.createMeshRenderer(state);
  var meshRenderer = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(match$1[0]);
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, match$2[1], match$2[0]);
  var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, state$1);
  return /* tuple */[
          state$2,
          gameObject,
          meshRenderer
        ];
}

var getRecord = RecordMeshRendererMainService$Wonderjs.getRecord;

function getLines() {
  return /* Lines */1;
}

function getPoints() {
  return /* Points */0;
}

function getTriangles() {
  return /* Triangles */4;
}

function getDefaultDrawMode() {
  return BufferMeshRendererService$Wonderjs.getDefaultDrawMode(/* () */0);
}

function getRender() {
  return BufferMeshRendererService$Wonderjs.getRender(/* () */0);
}

function getNotRender() {
  return BufferMeshRendererService$Wonderjs.getNotRender(/* () */0);
}

function getDefaultIsRender() {
  return BufferMeshRendererService$Wonderjs.getDefaultIsRender(/* () */0) === BufferMeshRendererService$Wonderjs.getRender(/* () */0);
}

function getDefaultIsRenderUint8() {
  return BufferMeshRendererService$Wonderjs.getDefaultIsRender(/* () */0);
}

export {
  getBasicMaterialRenderArray ,
  getLightMaterialRenderArray ,
  isMeshRenderer ,
  createBasicMaterialGameObject ,
  createLightMaterialGameObject ,
  getRecord ,
  getLines ,
  getPoints ,
  getTriangles ,
  getDefaultDrawMode ,
  getRender ,
  getNotRender ,
  getDefaultIsRender ,
  getDefaultIsRenderUint8 ,
  
}
/* Wonder_jest Not a pure module */
