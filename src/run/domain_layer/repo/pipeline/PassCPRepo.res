let getSampleCount = () => CPRepo.getPass().sampleCount

let setSampleCount = sampleCount => CPRepo.setPass({...CPRepo.getPass(), sampleCount: sampleCount})

let getTotalSampleCount = () => CPRepo.getPass().totalSampleCount

let setTotalSampleCount = totalSampleCount =>
  CPRepo.setPass({...CPRepo.getPass(), totalSampleCount: totalSampleCount})

let getPixelBufferData = () =>
  CPRepo.getPass().pixelBufferData->OptionSt.map(((buffer, bufferSize)) => (
    buffer->StorageBufferVO.create,
    bufferSize,
  ))

let setPixelBufferData = ((buffer, bufferSize)) =>
  CPRepo.setPass({
    ...CPRepo.getPass(),
    pixelBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
  })

let getCommonBufferData = () =>
  CPRepo.getPass().commonBufferData->OptionSt.map(((buffer, typeArr)) => (
    buffer->UniformBufferVO.create,
    typeArr,
  ))

let setCommonBufferData = ((buffer, typeArr)) =>
  CPRepo.setPass({
    ...CPRepo.getPass(),
    commonBufferData: (buffer->UniformBufferVO.value, typeArr)->Some,
  })

let getResolutionBufferData = () =>
  CPRepo.getPass().resolutionBufferData->OptionSt.map(((buffer, typeArr)) => (
    buffer->UniformBufferVO.create,
    typeArr,
  ))

let setResolutionBufferData = ((buffer, typeArr)) =>
  CPRepo.setPass({
    ...CPRepo.getPass(),
    resolutionBufferData: (buffer->UniformBufferVO.value, typeArr)->Some,
  })
