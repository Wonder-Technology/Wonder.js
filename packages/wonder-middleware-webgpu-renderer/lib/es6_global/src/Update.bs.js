

import * as Caml_option from "../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as ArraySt$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";

function updateVertexBuffer(vertexBuffer, allVerticesData, maxGeometryPointCount) {
  return 1;
}

function updateIndexBuffer(indexBuffer, allIndicesData, maxGeometryPointCount) {
  return 1;
}

function updateCameraBuffer(cameraBuffer, viewMatrix, projectionMatrix) {
  return 1;
}

function updateAllMaterialBuffers(materialBufferMap, allMaterialData) {
  return 1;
}

function _group(allRenderObjectData) {
  return 1;
}

function getRenderBundle(geometry, specificMaterial) {
  return 1;
}

function setRenderBundle(geometry, specificMaterial, renderBundle) {
  return 1;
}

function _createRenderBundleAndRecord(indirectBuffer, indirectOffset) {
  return 1;
}

function _buildIndirectOffset(batchIndex) {
  return 1;
}

function createRenderBundles(allGroupedRenderObjectData, indirectBuffer) {
  return allGroupedRenderObjectData.map(function (param, batchIndex) {
              var transforms = param[2];
              var specificMaterial = param[1];
              var geometry = param[0];
              return [
                      geometry,
                      specificMaterial,
                      transforms,
                      Caml_option.valFromOption(1)
                    ];
            });
}

function _buildBatch(param) {
  return 1;
}

function buildBatches(allRenderObjectData, indirectBuffer) {
  return ArraySt$WonderCommonlib.map(createRenderBundles(1, indirectBuffer), _buildBatch);
}

function updateIndirectBuffer(indirectBuffer, batches) {
  return 1;
}

function updateInstanceBuffer(instanceBuffer, getLocalToWorldMatrixFunc, batches) {
  return 1;
}

export {
  updateVertexBuffer ,
  updateIndexBuffer ,
  updateCameraBuffer ,
  updateAllMaterialBuffers ,
  _group ,
  getRenderBundle ,
  setRenderBundle ,
  _createRenderBundleAndRecord ,
  _buildIndirectOffset ,
  createRenderBundles ,
  _buildBatch ,
  buildBatches ,
  updateIndirectBuffer ,
  updateInstanceBuffer ,
  
}
/* No side effect */
