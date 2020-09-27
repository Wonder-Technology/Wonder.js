'use strict';

var LoadWebGPUDoService$Wonderjs = require("../../domain_layer/domain/webgpu/core/service/LoadWebGPUDoService.bs.js");
var TextureArrayWebGPUDoService$Wonderjs = require("../../domain_layer/domain/webgpu/core/service/TextureArrayWebGPUDoService.bs.js");

var load = LoadWebGPUDoService$Wonderjs.load;

var getTextureArrayLayerSize = TextureArrayWebGPUDoService$Wonderjs.getTextureArrayLayerSize;

exports.load = load;
exports.getTextureArrayLayerSize = getTextureArrayLayerSize;
/* LoadWebGPUDoService-Wonderjs Not a pure module */
