

import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionTool$Wonderjs from "../atom/OptionTool.js";
import * as GPUDetectTool$Wonderjs from "../gpu/GPUDetectTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as SourceInstanceAPI$Wonderjs from "../../../../src/api/SourceInstanceAPI.js";

function addSourceInstance(gameObject, state) {
  var match = SourceInstanceAPI$Wonderjs.createSourceInstance(state);
  var sourceInstance = match[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectSourceInstanceComponent(gameObject, sourceInstance, match[0]);
  return /* tuple */[
          state$1,
          sourceInstance
        ];
}

function setGPUDetectDataAllowHardwareInstance(sandbox, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gpuDetectRecord */5];
  newrecord[/* gpuDetectRecord */5] = /* record */[
    /* extensionInstancedArrays */{
      drawElementsInstancedANGLE: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
      vertexAttribDivisorANGLE: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
    },
    /* extensionElementIndexUint */init[/* extensionElementIndexUint */1],
    /* precision */init[/* precision */2],
    /* maxTextureUnit */init[/* maxTextureUnit */3]
  ];
  return newrecord;
}

function setGPUDetectDataAllowBatchInstance(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gpuDetectRecord */5];
  newrecord[/* gpuDetectRecord */5] = /* record */[
    /* extensionInstancedArrays */undefined,
    /* extensionElementIndexUint */init[/* extensionElementIndexUint */1],
    /* precision */init[/* precision */2],
    /* maxTextureUnit */init[/* maxTextureUnit */3]
  ];
  return newrecord;
}

function getExtensionInstancedArrays(state) {
  return OptionTool$Wonderjs.unsafeGet(GPUDetectTool$Wonderjs.getRecord(state)[/* extensionInstancedArrays */0]);
}

export {
  addSourceInstance ,
  setGPUDetectDataAllowHardwareInstance ,
  setGPUDetectDataAllowBatchInstance ,
  getExtensionInstancedArrays ,
  
}
/* Sinon Not a pure module */
