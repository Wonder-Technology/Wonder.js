

let getAccumulationPixelBufferData = () =>
  RTRepo.getAccumulationPass().accumulationPixelBufferData->OptionSt.map(((buffer, bufferSize)) => (
    buffer->StorageBufferVO.create,
    bufferSize,
  ))

let setAccumulationPixelBufferData = ((buffer, bufferSize)) =>
  RTRepo.setAccumulationPass({
    ...RTRepo.getAccumulationPass(),
    accumulationPixelBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
  })

let getStaticBindGroupData = () => RTRepo.getAccumulationPass().staticBindGroupData

let setStaticBindGroupData = (setSlot, bindGroup) =>
  RTRepo.setAccumulationPass({
    ...RTRepo.getAccumulationPass(),
    staticBindGroupData: {setSlot: setSlot, bindGroup: bindGroup}->Some,
  })

let getPipeline = () => RTRepo.getAccumulationPass().pipeline

let setPipeline = pipeline =>
  RTRepo.setAccumulationPass({
    ...RTRepo.getAccumulationPass(),
    pipeline: pipeline->Some,
  })
