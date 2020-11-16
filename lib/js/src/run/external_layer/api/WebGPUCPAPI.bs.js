'use strict';

var WebGPUCPApService$Wonderjs = require("../../application_layer/WebGPUCPApService.bs.js");

function getTextureArrayLayerSize(param) {
  return WebGPUCPApService$Wonderjs.getTextureArrayLayerSize(undefined);
}

var setTextureArrayLayerSize = WebGPUCPApService$Wonderjs.setTextureArrayLayerSize;

exports.getTextureArrayLayerSize = getTextureArrayLayerSize;
exports.setTextureArrayLayerSize = setTextureArrayLayerSize;
/* WebGPUCPApService-Wonderjs Not a pure module */
