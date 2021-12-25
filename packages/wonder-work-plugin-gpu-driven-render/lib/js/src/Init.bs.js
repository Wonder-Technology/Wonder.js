'use strict';


function buildBindGroupLayoutForMaterialBuffer(param) {
  return 1;
}

function buildBindGroupLayoutForOtherBuffers(param) {
  return 1;
}

function getShaderData(shaderName) {
  return 1;
}

function getPipelineState(getDepthWriteEnabledFunc, material) {
  return 1;
}

function getShaderName(materialType) {
  return 1;
}

function _createRenderPipeline(param) {
  return 1;
}

function _groupByShaderDataAndPipelineState(allMaterialData) {
  return 1;
}

function _getRenderPipeline(map, specificMaterial) {
  return 1;
}

function _setRenderPipeline(map, specificMaterial, renderPipeline) {
  return 1;
}

function _createRenderPipelineMap(param) {
  return 1;
}

function createAllRenderPipelines(allMaterialData) {
  return 1;
}

function createVertexBuffer(maxGeometryCount, maxGeometryPointCount) {
  return 1;
}

function createIndexBuffer(maxGeometryCount, maxGeometryPointCount) {
  return 1;
}

function createInstanceBuffer(maxInstanceCount) {
  return 1;
}

function createIndirectBuffer(maxInstanceCount) {
  return 1;
}

function createAllMaterialBuffers(allMaterialData) {
  return 1;
}

function createCameraBuffer(param) {
  return 1;
}

function _getBindGroupForMaterialBuffer(map, specificMaterial) {
  return 1;
}

function _setBindGroupForMaterialBuffer(map, specificMaterial, bindGroup) {
  return 1;
}

function createAllBindGroups(allMaterialTypes, param, materialBufferMap) {
  return 1;
}

exports.buildBindGroupLayoutForMaterialBuffer = buildBindGroupLayoutForMaterialBuffer;
exports.buildBindGroupLayoutForOtherBuffers = buildBindGroupLayoutForOtherBuffers;
exports.getShaderData = getShaderData;
exports.getPipelineState = getPipelineState;
exports.getShaderName = getShaderName;
exports._createRenderPipeline = _createRenderPipeline;
exports._groupByShaderDataAndPipelineState = _groupByShaderDataAndPipelineState;
exports._getRenderPipeline = _getRenderPipeline;
exports._setRenderPipeline = _setRenderPipeline;
exports._createRenderPipelineMap = _createRenderPipelineMap;
exports.createAllRenderPipelines = createAllRenderPipelines;
exports.createVertexBuffer = createVertexBuffer;
exports.createIndexBuffer = createIndexBuffer;
exports.createInstanceBuffer = createInstanceBuffer;
exports.createIndirectBuffer = createIndirectBuffer;
exports.createAllMaterialBuffers = createAllMaterialBuffers;
exports.createCameraBuffer = createCameraBuffer;
exports._getBindGroupForMaterialBuffer = _getBindGroupForMaterialBuffer;
exports._setBindGroupForMaterialBuffer = _setBindGroupForMaterialBuffer;
exports.createAllBindGroups = createAllBindGroups;
/* No side effect */
