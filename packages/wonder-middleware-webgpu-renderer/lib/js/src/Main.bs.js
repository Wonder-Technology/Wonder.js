'use strict';


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

function _getRenderPipeline(map, material, materialType) {
  return 1;
}

function _setRenderPipeline(map, material, materialType, renderPipeline) {
  return 1;
}

function _createRenderPipelineMap(param) {
  return 1;
}

function createRenderPipelinesWithMaterial(allMaterialData) {
  return 1;
}

exports.getShaderData = getShaderData;
exports.getPipelineState = getPipelineState;
exports.getShaderName = getShaderName;
exports._createRenderPipeline = _createRenderPipeline;
exports._groupByShaderDataAndPipelineState = _groupByShaderDataAndPipelineState;
exports._getRenderPipeline = _getRenderPipeline;
exports._setRenderPipeline = _setRenderPipeline;
exports._createRenderPipelineMap = _createRenderPipelineMap;
exports.createRenderPipelinesWithMaterial = createRenderPipelinesWithMaterial;
/* No side effect */
