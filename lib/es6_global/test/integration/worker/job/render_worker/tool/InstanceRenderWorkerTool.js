

import * as Sinon from "./../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionTool$Wonderjs from "../../../../../tool/service/atom/OptionTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../../tool/service/state/RenderWorkerStateTool.js";

function _setGPUDetectDataAllowHardwareInstance(sandbox, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gpuDetectRecord */3];
  newrecord[/* gpuDetectRecord */3] = /* record */[
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

function setGPUDetectDataAllowHardwareInstance(sandbox) {
  RenderWorkerStateTool$Wonderjs.setState(_setGPUDetectDataAllowHardwareInstance(sandbox, RenderWorkerStateTool$Wonderjs.createState(/* () */0)));
  return /* () */0;
}

function getExtensionInstancedArrays(state) {
  return OptionTool$Wonderjs.unsafeGet(state[/* gpuDetectRecord */3][/* extensionInstancedArrays */0]);
}

export {
  _setGPUDetectDataAllowHardwareInstance ,
  setGPUDetectDataAllowHardwareInstance ,
  getExtensionInstancedArrays ,
  
}
/* Sinon Not a pure module */
