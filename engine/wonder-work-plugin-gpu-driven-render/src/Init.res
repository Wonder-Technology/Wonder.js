// let getWebGPUExn = (): IWebGPUForJs.webgpu => {
//   //TODO implement
//   Obj.magic(1)
// }

// let setWebGPU = (webgpu: IWebGPUForJs.webgpu): unit => {
//   //TODO implement
//   Obj.magic(1)
// }

type attributeName = string

type attributeFormat = [#float32x3]

type attributeLocationData = {
  location: int,
  offset: int,
  type_: attributeFormat,
}

type vertexBufferArrayStride = int

// type bindGroupSet = int

// type visibility = [#vertex | #framgent]

// type bufferBindingType = [#uniform | #storage | #"read-only-storage"]

// type buffer = {type_: bufferBindingType}

// type bindGroupLayoutData = {
//   binding: int,
//   visibility: visibility,
//   buffer: option<buffer>,
// }

type shaderData = {
  vertexWGSL: string,
  fragmentWGSL: string,
  vertexBufferArrayStride: vertexBufferArrayStride,
  allVertexAttributeData: array<(attributeName, attributeLocationData)>,
  /* bind group layout is fixed: set 0 for material buffer data, set 1 for other data(e.g. geometry, ...) */
  //   allBindGroupLayoutData: array<(bindGroupSet, bindGroupLayoutData)>,
}

let buildBindGroupLayoutForMaterialBuffer = (): IWebGPUForJs.BindGroupLayout.t => {
  //TODO implement
  Obj.magic(1)
}

let buildBindGroupLayoutForOtherBuffers = (): IWebGPUForJs.BindGroupLayout.t => {
  //TODO implement
  Obj.magic(1)
}

type shaderName = string

let getShaderData = (shaderName: shaderName): shaderData => {
  //TODO implement
  Obj.magic(1)
}

type depthStencilState = {depthWriteEnabled: bool}

// type colorTargetState = {
// blend
// }

type pipelineState = {depthStencilState: depthStencilState}

type material = int

// e.g. PBR(diffuseColor), Phong(diffuseColor, shininess)
type materialType

type getDepthWriteEnabledFunc = material => bool

let getPipelineState = (
  getDepthWriteEnabledFunc: getDepthWriteEnabledFunc,
  material: material,
): pipelineState => {
  //TODO implement
  Obj.magic(1)
}

let getShaderName = (materialType: materialType): shaderName => {
  //TODO implement
  Obj.magic(1)
}

type renderPipelineName = string

type renderPipeline

let _createRenderPipeline = ((
  shaderData: shaderData,
  pipelineState: pipelineState,
)): renderPipeline => {
  //TODO implement
  Obj.magic(1)
}

type specificMaterial = (material, materialType)

type specificMaterialDataMap<'renderPipelineData> = WonderCommonlib.ImmutableHashMap.t<
  materialType,
  WonderCommonlib.ImmutableHashMap.t<material, 'renderPipelineData>,
>

type renderPipelineUid = int

let _groupByShaderDataAndPipelineState = (
  allMaterialData: array<(specificMaterial, getDepthWriteEnabledFunc)>,
): // ): array<(shaderData, pipelineState)> => {
(
  specificMaterialDataMap<renderPipelineUid>,
  WonderCommonlib.ImmutableHashMap.t<renderPipelineUid, (shaderData, pipelineState)>,
) => {
  //   allMaterialData->WonderCommonlib.ArraySt.reduceOneParam(
  //     (. map, (material, materialType, getDepthWriteEnabledFunc)) => {
  //       getShaderName(materialType)->getShaderData
  //       getPipelineState(getDepthWriteEnabledFunc, material)
  //     },
  //     WonderCommonlib.ImmutableHashMap.createEmpty(),
  //   )

  //TODO implement
  Obj.magic(1)
}

// type renderPipelineMap = WonderCommonlib.ImmutableHashMap.t<
//   materialType,
//   WonderCommonlib.ImmutableHashMap.t<material, renderPipeline>,
// >

type renderPipelineMap = specificMaterialDataMap<renderPipeline>

let _getRenderPipeline = (
  map: renderPipelineMap,
  specificMaterial: specificMaterial,
): renderPipeline => {
  //TODO implement
  Obj.magic(1)
}

let _setRenderPipeline = (
  map: renderPipelineMap,
  specificMaterial: specificMaterial,
  renderPipeline: renderPipeline,
): renderPipelineMap => {
  //TODO implement
  Obj.magic(1)
}

let _createRenderPipelineMap = ((
  renderPipelineUidMap: specificMaterialDataMap<renderPipelineUid>,
  specificMaterialDataMap: WonderCommonlib.ImmutableHashMap.t<
    renderPipelineUid,
    (shaderData, pipelineState),
  >,
)): renderPipelineMap => {
  //TODO implement
  Obj.magic(1)
}

let createAllRenderPipelines = (
  allMaterialData: array<(specificMaterial, getDepthWriteEnabledFunc)>,
): renderPipelineMap => {
  allMaterialData->_groupByShaderDataAndPipelineState->_createRenderPipelineMap
}

let createVertexBuffer = (
  maxGeometryCount: int,
  maxGeometryPointCount: int,
): IWebGPUForJs.Buffer.t => {
  //TODO implement
  Obj.magic(1)
}

let createIndexBuffer = (
  maxGeometryCount: int,
  maxGeometryPointCount: int,
): IWebGPUForJs.Buffer.t => {
  //TODO implement
  Obj.magic(1)
}

let createInstanceBuffer = (maxInstanceCount: int): IWebGPUForJs.Buffer.t => {
  //TODO implement
  Obj.magic(1)
}

let createIndirectBuffer = (maxInstanceCount: int): IWebGPUForJs.Buffer.t => {
  //TODO implement
  Obj.magic(1)
}

type maxMaterialCount = int

type materialBufferMap = WonderCommonlib.ImmutableHashMap.t<materialType, IWebGPUForJs.Buffer.t>

let createAllMaterialBuffers = (
  allMaterialData: array<(maxMaterialCount, materialType)>,
): materialBufferMap => {
  //TODO implement
  Obj.magic(1)
}

let createCameraBuffer = (): IWebGPUForJs.Buffer.t => {
  //TODO implement
  Obj.magic(1)
}

// type bindGroupForMaterialBufferMap = specificMaterialDataMap<IWebGPUForJs.BindGroup.t>
type bindGroupForMaterialBufferMap = WonderCommonlib.ImmutableHashMap.t<
  materialType,
  IWebGPUForJs.BindGroup.t,
>

type bindGroupForOtherBuffers = IWebGPUForJs.BindGroup.t

let _getBindGroupForMaterialBuffer = (
  map: renderPipelineMap,
  specificMaterial: specificMaterial,
): IWebGPUForJs.BindGroup.t => {
  //TODO implement
  Obj.magic(1)
}

let _setBindGroupForMaterialBuffer = (
  map: bindGroupForMaterialBufferMap,
  specificMaterial: specificMaterial,
  bindGroup: IWebGPUForJs.BindGroup.t,
): bindGroupForMaterialBufferMap => {
  //TODO implement
  Obj.magic(1)
}

let createAllBindGroups = (
  allMaterialTypes: array<materialType>,
  (
    vertexBuffer: IWebGPUForJs.Buffer.t,
    indexBuffer: IWebGPUForJs.Buffer.t,
    cameraBuffer: IWebGPUForJs.Buffer.t,
    indirectBuffer: IWebGPUForJs.Buffer.t,
    instanceBuffer: IWebGPUForJs.Buffer.t,
  ),
  materialBufferMap: materialBufferMap,
): (bindGroupForMaterialBufferMap, bindGroupForOtherBuffers) => {
  //TODO implement
  Obj.magic(1)
}
