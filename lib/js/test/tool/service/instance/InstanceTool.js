'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var OptionTool$Wonderjs = require("../atom/OptionTool.js");
var GPUDetectTool$Wonderjs = require("../gpu/GPUDetectTool.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var SourceInstanceAPI$Wonderjs = require("../../../../src/api/SourceInstanceAPI.js");

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

exports.addSourceInstance = addSourceInstance;
exports.setGPUDetectDataAllowHardwareInstance = setGPUDetectDataAllowHardwareInstance;
exports.setGPUDetectDataAllowBatchInstance = setGPUDetectDataAllowBatchInstance;
exports.getExtensionInstancedArrays = getExtensionInstancedArrays;
/* Sinon Not a pure module */
