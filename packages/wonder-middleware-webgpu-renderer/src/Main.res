type attributeName = string

type attributeFormat = [#float32x3]

type attributeLocationData = {
  location: int,
  offset: int,
  type_: attributeFormat,
}

type vertexBufferArrayStride = int

type bindGroupSet = int

type visibility = [#vertex | #framgent]

type bufferBindingType = [#uniform | #storage | #"read-only-storage"]

type buffer = {type_: bufferBindingType}

type bindGroupLayoutData = {
  binding: int,
  visibility: visibility,
  buffer: option<buffer>,
}

type shaderData = {
  vertexWGSL: string,
  fragmentWGSL: string,
  vertexBufferArrayStride: vertexBufferArrayStride,
  allVertexAttributeData: array<(attributeName, attributeLocationData)>,
  allBindGroupLayoutData: array<(bindGroupSet, bindGroupLayoutData)>,
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

// type material = int
type material

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

type renderPipelineDataMap<'renderPipelineData> = WonderCommonlib.ImmutableHashMap.t<
  materialType,
  WonderCommonlib.ImmutableHashMap.t<material, 'renderPipelineData>,
>

type renderPipelineUid = int

let _groupByShaderDataAndPipelineState = (
  allMaterialData: array<(material, materialType, getDepthWriteEnabledFunc)>,
): // ): array<(shaderData, pipelineState)> => {
(
  renderPipelineDataMap<renderPipelineUid>,
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

type renderPipelineMap = renderPipelineDataMap<renderPipeline>

let _getRenderPipeline = (
  map: renderPipelineMap,
  material: material,
  materialType: materialType,
): renderPipeline => {
  //TODO implement
  Obj.magic(1)
}

let _setRenderPipeline = (
  map: renderPipelineMap,
  material: material,
  materialType: materialType,
  renderPipeline,
): renderPipelineMap => {
  //TODO implement
  Obj.magic(1)
}

let _createRenderPipelineMap = ((
  renderPipelineUidMap: renderPipelineDataMap<renderPipelineUid>,
  renderPipelineDataMap: WonderCommonlib.ImmutableHashMap.t<
    renderPipelineUid,
    (shaderData, pipelineState),
  >,
)): renderPipelineMap => {
  //TODO implement
  Obj.magic(1)
}

let createRenderPipelinesWithMaterial = (
  allMaterialData: array<(material, materialType, getDepthWriteEnabledFunc)>,
): renderPipelineMap => {
  allMaterialData->_groupByShaderDataAndPipelineState->_createRenderPipelineMap
}
