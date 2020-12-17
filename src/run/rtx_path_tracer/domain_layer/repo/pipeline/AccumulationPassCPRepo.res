

let getAccumulationPixelBufferData = () =>
  CPRepo.getAccumulationPass().accumulationPixelBufferData->OptionSt.map(((buffer, bufferSize)) => (
    buffer->StorageBufferVO.create,
    bufferSize,
  ))

let setAccumulationPixelBufferData = ((buffer, bufferSize)) =>
  CPRepo.setAccumulationPass({
    ...CPRepo.getAccumulationPass(),
    accumulationPixelBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
  })

let getStaticBindGroupData = () => CPRepo.getAccumulationPass().staticBindGroupData

let setStaticBindGroupData = (setSlot, bindGroup) =>
  CPRepo.setAccumulationPass({
    ...CPRepo.getAccumulationPass(),
    staticBindGroupData: {setSlot: setSlot, bindGroup: bindGroup}->Some,
  })

let getPipeline = () => CPRepo.getAccumulationPass().pipeline

let setPipeline = pipeline =>
  CPRepo.setAccumulationPass({
    ...CPRepo.getAccumulationPass(),
    pipeline: pipeline->Some,
  })
