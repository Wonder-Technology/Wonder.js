'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var TestTool$Wonderjs = require("../../../TestTool.js");
var FakeGlTool$Wonderjs = require("../../../gl/FakeGlTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var BoxGeometryTool$Wonderjs = require("../../../service/geometry/BoxGeometryTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var InitRenderJobTool$Wonderjs = require("./InitRenderJobTool.js");
var LightMaterialTool$Wonderjs = require("../../../service/material/LightMaterialTool.js");

function initWithJobConfig(sandbox, noWorkerJobRecord) {
  return TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, noWorkerJobRecord, undefined, undefined, /* () */0);
}

function prepareGameObject(sandbox, state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
  var geometry = match$1[1];
  var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
  var gameObject = match$2[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$2[0]));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material
        ];
}

function prepareGameObjectWithMap(sandbox, diffuseMap, specularMap, state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = LightMaterialTool$Wonderjs.setMaps(material, diffuseMap, specularMap, match[0]);
  var match$2 = BoxGeometryTool$Wonderjs.createBoxGeometry(match$1[0]);
  var geometry = match$2[1];
  var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
  var gameObject = match$3[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0]));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material
        ];
}

function prepareGameObjectWithCreatedMap(sandbox, state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = LightMaterialTool$Wonderjs.createAndSetMaps(material, match[0]);
  var match$2 = BoxGeometryTool$Wonderjs.createBoxGeometry(match$1[0]);
  var geometry = match$2[1];
  var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
  var gameObject = match$3[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0]));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material
        ];
}

var exec = InitRenderJobTool$Wonderjs.exec;

function prepareForJudgeGLSLNotExec(prepareGameObjectFunc, sandbox, state) {
  var match = Curry._2(prepareGameObjectFunc, sandbox, state);
  var shaderSource = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(shaderSource), undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
  return /* tuple */[
          state$1,
          shaderSource,
          match[1]
        ];
}

function prepareForJudgeGLSL(prepareGameObjectFunc, sandbox, state) {
  var match = prepareForJudgeGLSLNotExec(prepareGameObjectFunc, sandbox, state);
  var state$1 = InitRenderJobTool$Wonderjs.exec(match[0]);
  return /* tuple */[
          state$1,
          match[1]
        ];
}

exports.initWithJobConfig = initWithJobConfig;
exports.prepareGameObject = prepareGameObject;
exports.prepareGameObjectWithMap = prepareGameObjectWithMap;
exports.prepareGameObjectWithCreatedMap = prepareGameObjectWithCreatedMap;
exports.exec = exec;
exports.prepareForJudgeGLSLNotExec = prepareForJudgeGLSLNotExec;
exports.prepareForJudgeGLSL = prepareForJudgeGLSL;
/* Sinon Not a pure module */
