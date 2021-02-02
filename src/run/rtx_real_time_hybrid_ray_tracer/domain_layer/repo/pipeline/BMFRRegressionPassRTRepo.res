// let getTmdBufferData = () =>
//   RTRepo.getBMFRRegressionPass().tmdBufferData->OptionSt.map(((buffer, bufferSize)) => (
//     buffer->StorageBufferVO.create,
//     bufferSize,
//   ))

// let setTmdBufferData = ((buffer, bufferSize)) =>
//   RTRepo.setBMFRRegressionPass({
//     ...RTRepo.getBMFRRegressionPass(),
//     tmdBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
//   })

// let getOutBufferData = () =>
//   RTRepo.getBMFRRegressionPass().tmdBufferData->OptionSt.map(((buffer, bufferSize)) => (
//     buffer->StorageBufferVO.create,
//     bufferSize,
//   ))

// let setOutBufferData = ((buffer, bufferSize)) =>
//   RTRepo.setBMFRRegressionPass({
//     ...RTRepo.getBMFRRegressionPass(),
//     tmdBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
//   })

let getFrameIndex = () => RTRepo.getBMFRRegressionPass().frameIndex

let setFrameIndex = frameIndex =>
  RTRepo.setBMFRRegressionPass({
    ...RTRepo.getBMFRRegressionPass(),
    frameIndex: frameIndex,
  })

let getCommonBufferData = () =>
  RTRepo.getBMFRRegressionPass().commonBufferData->OptionSt.map(((buffer, typeArr)) => (
    buffer->UniformBufferVO.create,
    typeArr,
  ))

let setCommonBufferData = ((buffer, typeArr)) =>
  RTRepo.setBMFRRegressionPass({
    ...RTRepo.getBMFRRegressionPass(),
    commonBufferData: (buffer->UniformBufferVO.value, typeArr)->Some,
  })

let getStaticBindGroupData = () => RTRepo.getBMFRRegressionPass().staticBindGroupData

let setStaticBindGroupData = (setSlot, bindGroup) =>
  RTRepo.setBMFRRegressionPass({
    ...RTRepo.getBMFRRegressionPass(),
    staticBindGroupData: {setSlot: setSlot, bindGroup: bindGroup}->Some,
  })

let getPipeline = () => RTRepo.getBMFRRegressionPass().pipeline

let setPipeline = pipeline =>
  RTRepo.setBMFRRegressionPass({
    ...RTRepo.getBMFRRegressionPass(),
    pipeline: pipeline->Some,
  })
