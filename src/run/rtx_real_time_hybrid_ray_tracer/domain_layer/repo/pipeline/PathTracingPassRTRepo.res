

open PathTracingPassRTPOType

let getSceneDescBufferData = () =>
  RTRepo.getRayTracingPass().sceneDescBufferData->OptionSt.map(((buffer, bufferSize, typeArr)) => (
    buffer->StorageBufferVO.create,
    bufferSize,
    typeArr,
  ))

let setSceneDescBufferData = ((buffer, bufferSize, typeArr)) =>
  RTRepo.setRayTracingPass({
    ...RTRepo.getRayTracingPass(),
    sceneDescBufferData: (buffer->StorageBufferVO.value, bufferSize, typeArr)->Some,
  })

let getPointIndexBufferData = () =>
  RTRepo.getRayTracingPass().pointIndexBufferData->OptionSt.map(((buffer, bufferSize, typeArr)) => (
    buffer->StorageBufferVO.create,
    bufferSize,
    typeArr,
  ))

let setPointIndexBufferData = ((buffer, bufferSize, typeArr)) =>
  RTRepo.setRayTracingPass({
    ...RTRepo.getRayTracingPass(),
    pointIndexBufferData: (buffer->StorageBufferVO.value, bufferSize, typeArr)->Some,
  })

let getVertexBufferData = () =>
  RTRepo.getRayTracingPass().vertexBufferData->OptionSt.map(((buffer, bufferSize, typeArr)) => (
    buffer->StorageBufferVO.create,
    bufferSize,
    typeArr,
  ))

let setVertexBufferData = ((buffer, bufferSize, typeArr)) =>
  RTRepo.setRayTracingPass({
    ...RTRepo.getRayTracingPass(),
    vertexBufferData: (buffer->StorageBufferVO.value, bufferSize, typeArr)->Some,
  })

let getIndexBufferData = () =>
  RTRepo.getRayTracingPass().indexBufferData->OptionSt.map(((buffer, bufferSize)) => (
    buffer->StorageBufferVO.create,
    bufferSize,
  ))

let setIndexBufferData = ((buffer, bufferSize)) =>
  RTRepo.setRayTracingPass({
    ...RTRepo.getRayTracingPass(),
    indexBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
  })

let getBSDFMaterialBufferData = () =>
  RTRepo.getRayTracingPass().bsdfMaterialBufferData->OptionSt.map(((
    buffer,
    bufferSize,
    typeArr,
  )) => (buffer->StorageBufferVO.create, bufferSize, typeArr))

let setBSDFMaterialBufferData = ((buffer, bufferSize, typeArr)) =>
  RTRepo.setRayTracingPass({
    ...RTRepo.getRayTracingPass(),
    bsdfMaterialBufferData: (buffer->StorageBufferVO.value, bufferSize, typeArr)->Some,
  })

let getShaderBindingTable = () => RTRepo.getRayTracingPass().shaderBindingTable

let setShaderBindingTable = shaderBindingTable =>
  RTRepo.setRayTracingPass({
    ...RTRepo.getRayTracingPass(),
    shaderBindingTable: shaderBindingTable->Some,
  })

let addStaticBindGroupData = (setSlot, bindGroup) => {
  let {staticBindGroupDataList} as po = RTRepo.getRayTracingPass()

  RTRepo.setRayTracingPass({
    ...po,
    staticBindGroupDataList: list{
      {setSlot: setSlot, bindGroup: bindGroup},
      ...staticBindGroupDataList,
    },
  })
}

let getAllStaticBindGroupData = () => RTRepo.getRayTracingPass().staticBindGroupDataList

let getPipeline = () => RTRepo.getRayTracingPass().pipeline

let setPipeline = pipeline =>
  RTRepo.setRayTracingPass({
    ...RTRepo.getRayTracingPass(),
    pipeline: pipeline->Some,
  })

let getCameraBindGroupLayout = () => RTRepo.getRayTracingPass().cameraBindGroupLayout

let setCameraBindGroupLayout = bindGroupLayout =>
  RTRepo.setRayTracingPass({
    ...RTRepo.getRayTracingPass(),
    cameraBindGroupLayout: bindGroupLayout->Some,
  })

let getDirectionLightBindGroupLayout = () =>
  RTRepo.getRayTracingPass().directionLightBindGroupLayout

let setDirectionLightBindGroupLayout = bindGroupLayout =>
  RTRepo.setRayTracingPass({
    ...RTRepo.getRayTracingPass(),
    directionLightBindGroupLayout: bindGroupLayout->Some,
  })
