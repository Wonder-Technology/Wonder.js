

let getCameraBufferData = () =>
  RTRepo.getCamera().cameraBufferData->OptionSt.map(((buffer, typeArr)) => (
    buffer->UniformBufferVO.create,
    typeArr,
  ))

let setCameraBufferData = ((cameraBuffer, typeArr)) =>
  RTRepo.setCamera({
    ...RTRepo.getCamera(),
    cameraBufferData: (cameraBuffer->UniformBufferVO.value, typeArr)->Some,
  })
