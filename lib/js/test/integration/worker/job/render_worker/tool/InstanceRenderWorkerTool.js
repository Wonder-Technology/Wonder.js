'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var OptionTool$Wonderjs = require("../../../../../tool/service/atom/OptionTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../../tool/service/state/RenderWorkerStateTool.js");

function _setGPUDetectDataAllowHardwareInstance(sandbox, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gpuDetectRecord */3];
  newrecord[/* gpuDetectRecord */3] = /* record */[
    /* extensionInstancedArrays */{
      drawElementsInstancedANGLE: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
      vertexAttribDivisorANGLE: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
    },
    /* precision */init[/* precision */1],
    /* maxTextureUnit */init[/* maxTextureUnit */2]
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

exports._setGPUDetectDataAllowHardwareInstance = _setGPUDetectDataAllowHardwareInstance;
exports.setGPUDetectDataAllowHardwareInstance = setGPUDetectDataAllowHardwareInstance;
exports.getExtensionInstancedArrays = getExtensionInstancedArrays;
/* Sinon Not a pure module */
