


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

export {
  buildBindGroupLayoutForMaterialBuffer ,
  buildBindGroupLayoutForOtherBuffers ,
  getShaderData ,
  getPipelineState ,
  getShaderName ,
  _createRenderPipeline ,
  _groupByShaderDataAndPipelineState ,
  _getRenderPipeline ,
  _setRenderPipeline ,
  _createRenderPipelineMap ,
  createAllRenderPipelines ,
  createVertexBuffer ,
  createIndexBuffer ,
  createInstanceBuffer ,
  createIndirectBuffer ,
  createAllMaterialBuffers ,
  createCameraBuffer ,
  _getBindGroupForMaterialBuffer ,
  _setBindGroupForMaterialBuffer ,
  createAllBindGroups ,
  
}
/* No side effect */
