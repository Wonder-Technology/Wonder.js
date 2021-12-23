

import * as OptionSt$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Init$WonderMiddlewareWebgpuRenderer from "./Init.bs.js";
import * as Render$WonderMiddlewareWebgpuRenderer from "./Render.bs.js";
import * as Update$WonderMiddlewareWebgpuRenderer from "./Update.bs.js";

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
  Init$WonderMiddlewareWebgpuRenderer.createAllRenderPipelines(1);
  var vertexBuffer = Init$WonderMiddlewareWebgpuRenderer.createVertexBuffer(10, 100);
  var indexBuffer = Init$WonderMiddlewareWebgpuRenderer.createIndexBuffer(10, 100);
  var instanceBuffer = Init$WonderMiddlewareWebgpuRenderer.createInstanceBuffer(10);
  var indirectBuffer = Init$WonderMiddlewareWebgpuRenderer.createIndirectBuffer(10);
  var cameraBuffer = Init$WonderMiddlewareWebgpuRenderer.createCameraBuffer(undefined);
  var materialBufferMap = Init$WonderMiddlewareWebgpuRenderer.createAllMaterialBuffers(1);
  var match = Init$WonderMiddlewareWebgpuRenderer.createAllBindGroups(1, [
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
  var vertexBuffer = Update$WonderMiddlewareWebgpuRenderer.updateVertexBuffer(state.vertexBuffer, 1, 100);
  var indexBuffer = Update$WonderMiddlewareWebgpuRenderer.updateIndexBuffer(state.indexBuffer, 1, 100);
  var cameraBuffer = Update$WonderMiddlewareWebgpuRenderer.updateCameraBuffer(state.cameraBuffer, 1, 1);
  var materialBufferMap = Update$WonderMiddlewareWebgpuRenderer.updateAllMaterialBuffers(state.materialBufferMap, 1);
  var vertexBuffer$1 = Update$WonderMiddlewareWebgpuRenderer.updateVertexBuffer(vertexBuffer, 1, 100);
  var batches = Update$WonderMiddlewareWebgpuRenderer.buildBatches(1, indirectBuffer);
  var indirectBuffer$1 = Update$WonderMiddlewareWebgpuRenderer.updateIndirectBuffer(indirectBuffer, batches);
  var instanceBuffer = Update$WonderMiddlewareWebgpuRenderer.updateInstanceBuffer(state.instanceBuffer, 1, batches);
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
  Render$WonderMiddlewareWebgpuRenderer.execBatches(OptionSt$WonderCommonlib.getExn(state.batches), Render$WonderMiddlewareWebgpuRenderer.buildRenderPassState(undefined));
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
