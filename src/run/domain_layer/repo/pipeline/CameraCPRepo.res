let getCameraBufferData = () =>
  CPRepo.getCamera().cameraBufferData->OptionSt.map(((buffer, typeArr)) => (
    buffer->UniformBufferVO.create,
    typeArr,
  ))

let setCameraBufferData = ((cameraBuffer, typeArr)) =>
  CPRepo.setCamera({
    ...CPRepo.getCamera(),
    cameraBufferData: (cameraBuffer->UniformBufferVO.value, typeArr)->Some,
  })
