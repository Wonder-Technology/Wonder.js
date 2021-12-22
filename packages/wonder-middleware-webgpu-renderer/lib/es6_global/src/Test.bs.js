

import * as Init$WonderMiddlewareWebgpuRenderer from "./Init.bs.js";

function getAllMaterialData(param) {
  return 1;
}

function getAllMaterialDataForCreateAllMaterialBuffers(param) {
  return 1;
}

function getAllMaterialTypes(param) {
  return 1;
}

function initJobExec(states) {
  Init$WonderMiddlewareWebgpuRenderer.createAllRenderPipelines(1);
  var vertexBuffer = Init$WonderMiddlewareWebgpuRenderer.createVertexBuffer(10, 100);
  var indexBuffer = Init$WonderMiddlewareWebgpuRenderer.createIndexBuffer(10, 100);
  var instanceBuffer = Init$WonderMiddlewareWebgpuRenderer.createInstanceBuffer(10);
  var indirectBuffer = Init$WonderMiddlewareWebgpuRenderer.createIndirectBuffer(10);
  var cameraBuffer = Init$WonderMiddlewareWebgpuRenderer.createCameraBuffer(undefined);
  var materialBufferMap = Init$WonderMiddlewareWebgpuRenderer.createAllMaterialBuffers(1);
  Init$WonderMiddlewareWebgpuRenderer.createAllBindGroups(1, [
        vertexBuffer,
        indexBuffer,
        cameraBuffer,
        indirectBuffer,
        instanceBuffer
      ], materialBufferMap);
  return states;
}

export {
  getAllMaterialData ,
  getAllMaterialDataForCreateAllMaterialBuffers ,
  getAllMaterialTypes ,
  initJobExec ,
  
}
/* No side effect */
