'use strict';

var Main$WonderMiddlewareWebgpuRenderer = require("./Main.bs.js");

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
  Main$WonderMiddlewareWebgpuRenderer.createAllRenderPipelines(1);
  var vertexBuffer = Main$WonderMiddlewareWebgpuRenderer.createVertexBuffer(10, 100);
  var indexBuffer = Main$WonderMiddlewareWebgpuRenderer.createIndexBuffer(10, 100);
  var instanceBuffer = Main$WonderMiddlewareWebgpuRenderer.createInstanceBuffer(10);
  var indirectBuffer = Main$WonderMiddlewareWebgpuRenderer.createIndirectBuffer(10);
  var cameraBuffer = Main$WonderMiddlewareWebgpuRenderer.createCameraBuffer(undefined);
  var materialBufferMap = Main$WonderMiddlewareWebgpuRenderer.createAllMaterialBuffers(1);
  Main$WonderMiddlewareWebgpuRenderer.createAllBindGroups(1, [
        vertexBuffer,
        indexBuffer,
        cameraBuffer,
        indirectBuffer,
        instanceBuffer
      ], materialBufferMap);
  return states;
}

exports.getAllMaterialData = getAllMaterialData;
exports.getAllMaterialDataForCreateAllMaterialBuffers = getAllMaterialDataForCreateAllMaterialBuffers;
exports.getAllMaterialTypes = getAllMaterialTypes;
exports.initJobExec = initJobExec;
/* No side effect */
