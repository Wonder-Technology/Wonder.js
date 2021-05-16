

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as TestTool$Wonderjs from "../../../TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../gl/FakeGlTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as BoxGeometryTool$Wonderjs from "../../../service/geometry/BoxGeometryTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as InitRenderJobTool$Wonderjs from "./InitRenderJobTool.js";

function initWithJobConfigWithoutBuildFakeDom(sandbox, noWorkerJobRecord) {
  return TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, noWorkerJobRecord, undefined, /* () */0);
}

function initWithJobConfig(sandbox, noWorkerJobRecord) {
  return TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, noWorkerJobRecord, undefined, undefined, /* () */0);
}

function prepareGameObject(sandbox, state) {
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
  var geometry = match$1[1];
  var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
  var gameObject = match$2[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$2[0]));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material
        ];
}

var exec = InitRenderJobTool$Wonderjs.exec;

function _prepareForJudgeGLSLNotExec(sandbox, prepareGameObjectFunc, state) {
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

function prepareForJudgeGLSLNotExec(sandbox, state) {
  return _prepareForJudgeGLSLNotExec(sandbox, prepareGameObject, state);
}

function prepareForJudgeGLSL(sandbox, state) {
  var match = _prepareForJudgeGLSLNotExec(sandbox, prepareGameObject, state);
  var state$1 = InitRenderJobTool$Wonderjs.exec(match[0]);
  return /* tuple */[
          state$1,
          match[1]
        ];
}

export {
  initWithJobConfigWithoutBuildFakeDom ,
  initWithJobConfig ,
  prepareGameObject ,
  exec ,
  _prepareForJudgeGLSLNotExec ,
  prepareForJudgeGLSLNotExec ,
  prepareForJudgeGLSL ,
  
}
/* Sinon Not a pure module */
