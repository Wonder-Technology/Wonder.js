

import * as Sinon from "./../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_option from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as FakeGlWorkerTool$Wonderjs from "../../../tool/FakeGlWorkerTool.js";
import * as InitLightMaterialJobTool$Wonderjs from "../../../../../tool/job/no_worker/init/InitLightMaterialJobTool.js";

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

export {
  prepareForJudgeGLSLNotExec ,
  prepareForJudgeGLSL ,
  
}
/* Sinon Not a pure module */
