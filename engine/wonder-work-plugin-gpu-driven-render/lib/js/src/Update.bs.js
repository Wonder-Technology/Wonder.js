'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");

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

exports.updateVertexBuffer = updateVertexBuffer;
exports.updateIndexBuffer = updateIndexBuffer;
exports.updateCameraBuffer = updateCameraBuffer;
exports.updateAllMaterialBuffers = updateAllMaterialBuffers;
exports._group = _group;
exports.getRenderBundle = getRenderBundle;
exports.setRenderBundle = setRenderBundle;
exports._createRenderBundleAndRecord = _createRenderBundleAndRecord;
exports._buildIndirectOffset = _buildIndirectOffset;
exports.createRenderBundles = createRenderBundles;
exports._buildBatch = _buildBatch;
exports.buildBatches = buildBatches;
exports.updateIndirectBuffer = updateIndirectBuffer;
exports.updateInstanceBuffer = updateInstanceBuffer;
/* No side effect */
