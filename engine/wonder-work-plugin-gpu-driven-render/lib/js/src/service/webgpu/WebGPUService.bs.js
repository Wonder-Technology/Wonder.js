'use strict';

var POContainer$WonderWorkPluginGpuDrivenRender = require("../../data/POContainer.bs.js");

function getWebGPU(param) {
  return POContainer$WonderWorkPluginGpuDrivenRender.unsafeGetPO(undefined).webgpu;
}

function setWebGPU(webgpu) {
  return POContainer$WonderWorkPluginGpuDrivenRender.setPO({
              webgpu: webgpu
            });
}

exports.getWebGPU = getWebGPU;
exports.setWebGPU = setWebGPU;
/* No side effect */
