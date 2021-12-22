open Init

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

let initJobExec = (states): states => {
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

  states
}
