'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var InitLightMaterialJobTool$Wonderjs = require("../../../../../tool/job/no_worker/init/InitLightMaterialJobTool.js");

function prepareForJudgeGLSLNotExec(sandbox, state) {
  var match = InitLightMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state);
  var shaderSource = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(shaderSource), undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
  return /* tuple */[
          state$1,
          shaderSource,
          match[1]
        ];
}

function prepareForJudgeGLSL(sandbox, state) {
  return prepareForJudgeGLSLNotExec(sandbox, state)[1];
}

exports.prepareForJudgeGLSLNotExec = prepareForJudgeGLSLNotExec;
exports.prepareForJudgeGLSL = prepareForJudgeGLSL;
/* Sinon Not a pure module */
