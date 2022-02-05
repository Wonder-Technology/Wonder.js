

import * as POContainer$WonderWorkPluginGpuDrivenRender from "../../data/POContainer.bs.js";

function getWebGPU(param) {
  return POContainer$WonderWorkPluginGpuDrivenRender.unsafeGetPO(undefined).webgpu;
}

function setWebGPU(webgpu) {
  return POContainer$WonderWorkPluginGpuDrivenRender.setPO({
              webgpu: webgpu
            });
}

export {
  getWebGPU ,
  setWebGPU ,
  
}
/* No side effect */
