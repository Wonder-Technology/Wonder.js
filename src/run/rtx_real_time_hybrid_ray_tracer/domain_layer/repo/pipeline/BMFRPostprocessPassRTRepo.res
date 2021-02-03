// let getPrevNoisyBufferData = () =>
//   RTRepo.getBMFRPostprocessPass().prevNoisyBufferData->OptionSt.map(((buffer, bufferSize)) => (
//     buffer->StorageBufferVO.create,
//     bufferSize,
//   ))

// let setPrevNoisyBufferData = ((buffer, bufferSize)) =>
//   RTRepo.setBMFRPostprocessPass({
//     ...RTRepo.getBMFRPostprocessPass(),
//     prevNoisyBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
//   })

// let getPrevPositionBufferData = () =>
//   RTRepo.getBMFRPostprocessPass().prevPositionBufferData->OptionSt.map(((buffer, bufferSize)) => (
//     buffer->StorageBufferVO.create,
//     bufferSize,
//   ))

// let setPrevPositionBufferData = ((buffer, bufferSize)) =>
//   RTRepo.setBMFRPostprocessPass({
//     ...RTRepo.getBMFRPostprocessPass(),
//     prevPositionBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
//   })

// let getPrevNormalBufferData = () =>
//   RTRepo.getBMFRPostprocessPass().prevNormalBufferData->OptionSt.map(((buffer, bufferSize)) => (
//     buffer->StorageBufferVO.create,
//     bufferSize,
//   ))

// let setPrevNormalBufferData = ((buffer, bufferSize)) =>
//   RTRepo.setBMFRPostprocessPass({
//     ...RTRepo.getBMFRPostprocessPass(),
//     prevNormalBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
//   })

let getStaticBindGroupData = () => RTRepo.getBMFRPostprocessPass().staticBindGroupData

let setStaticBindGroupData = (setSlot, bindGroup) =>
  RTRepo.setBMFRPostprocessPass({
    ...RTRepo.getBMFRPostprocessPass(),
    staticBindGroupData: {setSlot: setSlot, bindGroup: bindGroup}->Some,
  })

let getPipeline = () => RTRepo.getBMFRPostprocessPass().pipeline

let setPipeline = pipeline =>
  RTRepo.setBMFRPostprocessPass({
    ...RTRepo.getBMFRPostprocessPass(),
    pipeline: pipeline->Some,
  })
