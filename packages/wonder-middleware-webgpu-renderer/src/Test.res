open Init

open Update

type states

let getAllMaterialData = (): array<(specificMaterial, getDepthWriteEnabledFunc)> => {
  //TODO implement
  Obj.magic(1)
}

let getAllMaterialDataForCreateAllMaterialBuffers = (): array<(maxMaterialCount, materialType)> => {
  //TODO implement
  Obj.magic(1)
}

let getAllMaterialTypes = (): array<materialType> => {
  //TODO implement
  Obj.magic(1)
}

type state = {
  vertexBuffer: IWebGPUForJs.Buffer.t,
  indexBuffer: IWebGPUForJs.Buffer.t,
  cameraBuffer: IWebGPUForJs.Buffer.t,
  indirectBuffer: IWebGPUForJs.Buffer.t,
  instanceBuffer: IWebGPUForJs.Buffer.t,
  materialBufferMap: materialBufferMap,
  bindGroupForMaterialBufferMap: bindGroupForMaterialBufferMap,
  bindGroupForOtherBuffers: bindGroupForOtherBuffers,
  batches: option<array<batch>>,
}

let initJobExec = (state: state): state => {
  let renderPipelineMap = getAllMaterialData()->createAllRenderPipelines

  let maxGeometryCount = 10
  let maxGeometryPointCount = 100
  let maxInstanceCount = 10

  let vertexBuffer = createVertexBuffer(maxGeometryCount, maxGeometryPointCount)
  let indexBuffer = createIndexBuffer(maxGeometryCount, maxGeometryPointCount)
  let instanceBuffer = createInstanceBuffer(maxInstanceCount)
  let indirectBuffer = createIndirectBuffer(maxInstanceCount)
  let cameraBuffer = createCameraBuffer()
  let materialBufferMap = getAllMaterialDataForCreateAllMaterialBuffers()->createAllMaterialBuffers

  let (bindGroupForMaterialBufferMap, bindGroupForOtherBuffers) = createAllBindGroups(
    getAllMaterialTypes(),
    (vertexBuffer, indexBuffer, cameraBuffer, indirectBuffer, instanceBuffer),
    materialBufferMap,
  )

  {
    vertexBuffer: vertexBuffer,
    indexBuffer: indexBuffer,
    cameraBuffer: cameraBuffer,
    indirectBuffer: indirectBuffer,
    instanceBuffer: instanceBuffer,
    materialBufferMap: materialBufferMap,
    bindGroupForMaterialBufferMap: bindGroupForMaterialBufferMap,
    bindGroupForOtherBuffers: bindGroupForOtherBuffers,
    batches: None,
  }
}

let getAllVerticesData = (): array<(vertices, index)> => {
  //TODO implement
  Obj.magic(1)
}

let getAllIndicesData = (): array<(indices, index)> => {
  //TODO implement
  Obj.magic(1)
}

let getAllRenderObjectData = (): array<(geometry, specificMaterial)> => {
  //TODO implement
  Obj.magic(1)
}

let getAllMaterialDataForUpdate = (): array<(specificMaterial, updateMateiralBufferDataFunc)> => {
  //TODO implement
  Obj.magic(1)
}

// TODO handle new geometry, material, transform
// TODO handle reinit material
let updateJobExec = (
  {
    vertexBuffer,
    indexBuffer,
    cameraBuffer,
    indirectBuffer,
    instanceBuffer,
    materialBufferMap,
    bindGroupForMaterialBufferMap,
    bindGroupForOtherBuffers,
  } as state: state,
): state => {
  let maxGeometryPointCount = 100

  let vertexBuffer = updateVertexBuffer(vertexBuffer, getAllVerticesData(), maxGeometryPointCount)
  let indexBuffer = updateIndexBuffer(indexBuffer, getAllIndicesData(), maxGeometryPointCount)
  let cameraBuffer = updateCameraBuffer(cameraBuffer, Obj.magic(1), Obj.magic(1))
  let materialBufferMap = updateAllMaterialBuffers(materialBufferMap, getAllMaterialDataForUpdate())
  let vertexBuffer = updateVertexBuffer(vertexBuffer, getAllVerticesData(), maxGeometryPointCount)

  let batches = getAllRenderObjectData()->buildBatches(indirectBuffer)

  let indirectBuffer = updateIndirectBuffer(indirectBuffer, batches)
  let instanceBuffer = updateInstanceBuffer(instanceBuffer, Obj.magic(1), batches)

  {
    vertexBuffer: vertexBuffer,
    indexBuffer: indexBuffer,
    cameraBuffer: cameraBuffer,
    indirectBuffer: indirectBuffer,
    instanceBuffer: instanceBuffer,
    materialBufferMap: materialBufferMap,
    bindGroupForMaterialBufferMap: bindGroupForMaterialBufferMap,
    bindGroupForOtherBuffers: bindGroupForOtherBuffers,
    batches: batches->Some,
  }
}

let execJobExec = (
  {
    vertexBuffer,
    indexBuffer,
    cameraBuffer,
    indirectBuffer,
    instanceBuffer,
    materialBufferMap,
    bindGroupForMaterialBufferMap,
    bindGroupForOtherBuffers,
    batches,
  } as state: state,
): state => {
  open Render

  execBatches(batches->WonderCommonlib.OptionSt.getExn, buildRenderPassState())

  state
}
