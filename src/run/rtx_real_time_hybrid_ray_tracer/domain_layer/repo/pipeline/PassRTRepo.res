let getSampleCount = () => RTRepo.getPass().sampleCount

let setSampleCount = sampleCount => RTRepo.setPass({...RTRepo.getPass(), sampleCount: sampleCount})

let getTotalSampleCount = () => RTRepo.getPass().totalSampleCount

let setTotalSampleCount = totalSampleCount =>
  RTRepo.setPass({...RTRepo.getPass(), totalSampleCount: totalSampleCount})

let getPixelBufferData = () =>
  RTRepo.getPass().pixelBufferData->OptionSt.map(((buffer, bufferSize)) => (
    buffer->StorageBufferVO.create,
    bufferSize,
  ))

let setPixelBufferData = ((buffer, bufferSize)) =>
  RTRepo.setPass({
    ...RTRepo.getPass(),
    pixelBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
  })

let getCommonBufferData = () =>
  RTRepo.getPass().commonBufferData->OptionSt.map(((buffer, typeArr)) => (
    buffer->UniformBufferVO.create,
    typeArr,
  ))

let setCommonBufferData = ((buffer, typeArr)) =>
  RTRepo.setPass({
    ...RTRepo.getPass(),
    commonBufferData: (buffer->UniformBufferVO.value, typeArr)->Some,
  })

let getResolutionBufferData = () =>
  RTRepo.getPass().resolutionBufferData->OptionSt.map(((buffer, typeArr)) => (
    buffer->UniformBufferVO.create,
    typeArr,
  ))

let setResolutionBufferData = ((buffer, typeArr)) =>
  RTRepo.setPass({
    ...RTRepo.getPass(),
    resolutionBufferData: (buffer->UniformBufferVO.value, typeArr)->Some,
  })

let getBMFRDataBufferData = () =>
  RTRepo.getPass().bmfrDataBufferData->OptionSt.map(((buffer, bufferSize)) => (
    buffer->StorageBufferVO.create,
    bufferSize,
  ))

let setBMFRDataBufferData = ((buffer, bufferSize)) =>
  RTRepo.setPass({
    ...RTRepo.getPass(),
    bmfrDataBufferData: (buffer->StorageBufferVO.value, bufferSize)->Some,
  })
