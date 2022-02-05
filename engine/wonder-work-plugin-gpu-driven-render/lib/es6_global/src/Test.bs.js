

import * as OptionSt$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Init$WonderWorkPluginGpuDrivenRender from "./Init.bs.js";
import * as Render$WonderWorkPluginGpuDrivenRender from "./Render.bs.js";
import * as Update$WonderWorkPluginGpuDrivenRender from "./Update.bs.js";

function getAllMaterialData(param) {
  return 1;
}

function getAllMaterialDataForCreateAllMaterialBuffers(param) {
  return 1;
}

function getAllMaterialTypes(param) {
  return 1;
}

function initJobExec(state) {
  Init$WonderWorkPluginGpuDrivenRender.createAllRenderPipelines(1);
  var vertexBuffer = Init$WonderWorkPluginGpuDrivenRender.createVertexBuffer(10, 100);
  var indexBuffer = Init$WonderWorkPluginGpuDrivenRender.createIndexBuffer(10, 100);
  var instanceBuffer = Init$WonderWorkPluginGpuDrivenRender.createInstanceBuffer(10);
  var indirectBuffer = Init$WonderWorkPluginGpuDrivenRender.createIndirectBuffer(10);
  var cameraBuffer = Init$WonderWorkPluginGpuDrivenRender.createCameraBuffer(undefined);
  var materialBufferMap = Init$WonderWorkPluginGpuDrivenRender.createAllMaterialBuffers(1);
  var match = Init$WonderWorkPluginGpuDrivenRender.createAllBindGroups(1, [
        vertexBuffer,
        indexBuffer,
        cameraBuffer,
        indirectBuffer,
        instanceBuffer
      ], materialBufferMap);
  return {
          vertexBuffer: vertexBuffer,
          indexBuffer: indexBuffer,
          cameraBuffer: cameraBuffer,
          indirectBuffer: indirectBuffer,
          instanceBuffer: instanceBuffer,
          materialBufferMap: materialBufferMap,
          bindGroupForMaterialBufferMap: match[0],
          bindGroupForOtherBuffers: match[1],
          batches: undefined
        };
}

function getAllVerticesData(param) {
  return 1;
}

function getAllIndicesData(param) {
  return 1;
}

function getAllRenderObjectData(param) {
  return 1;
}

function getAllMaterialDataForUpdate(param) {
  return 1;
}

function updateJobExec(state) {
  var indirectBuffer = state.indirectBuffer;
  var vertexBuffer = Update$WonderWorkPluginGpuDrivenRender.updateVertexBuffer(state.vertexBuffer, 1, 100);
  var indexBuffer = Update$WonderWorkPluginGpuDrivenRender.updateIndexBuffer(state.indexBuffer, 1, 100);
  var cameraBuffer = Update$WonderWorkPluginGpuDrivenRender.updateCameraBuffer(state.cameraBuffer, 1, 1);
  var materialBufferMap = Update$WonderWorkPluginGpuDrivenRender.updateAllMaterialBuffers(state.materialBufferMap, 1);
  var vertexBuffer$1 = Update$WonderWorkPluginGpuDrivenRender.updateVertexBuffer(vertexBuffer, 1, 100);
  var batches = Update$WonderWorkPluginGpuDrivenRender.buildBatches(1, indirectBuffer);
  var indirectBuffer$1 = Update$WonderWorkPluginGpuDrivenRender.updateIndirectBuffer(indirectBuffer, batches);
  var instanceBuffer = Update$WonderWorkPluginGpuDrivenRender.updateInstanceBuffer(state.instanceBuffer, 1, batches);
  return {
          vertexBuffer: vertexBuffer$1,
          indexBuffer: indexBuffer,
          cameraBuffer: cameraBuffer,
          indirectBuffer: indirectBuffer$1,
          instanceBuffer: instanceBuffer,
          materialBufferMap: materialBufferMap,
          bindGroupForMaterialBufferMap: state.bindGroupForMaterialBufferMap,
          bindGroupForOtherBuffers: state.bindGroupForOtherBuffers,
          batches: batches
        };
}

function execJobExec(state) {
  Render$WonderWorkPluginGpuDrivenRender.execBatches(OptionSt$WonderCommonlib.getExn(state.batches), Render$WonderWorkPluginGpuDrivenRender.buildRenderPassState(undefined));
  return state;
}

export {
  getAllMaterialData ,
  getAllMaterialDataForCreateAllMaterialBuffers ,
  getAllMaterialTypes ,
  initJobExec ,
  getAllVerticesData ,
  getAllIndicesData ,
  getAllRenderObjectData ,
  getAllMaterialDataForUpdate ,
  updateJobExec ,
  execJobExec ,
  
}
/* No side effect */
