

let create = () => JobEntity.create("update_pass_for_render")

let _updateCommonBufferData = ((commonBuffer, commonBufferData)) => {
  let totalSampleCount = PassRTRepo.getTotalSampleCount()

  TypeArrayRTRepoUtils.setUint32_1(1, totalSampleCount, commonBufferData)->Result.tap(() => {
    WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubUint32Data(
      0,
      commonBufferData,
      commonBuffer->UniformBufferVO.value,
    )

    PassRTRepo.setCommonBufferData((commonBuffer, commonBufferData))
  })
}

let exec = () =>
  PassRTRepo.getCommonBufferData()
  ->OptionSt.get
  ->Result.bind(((commonBuffer, commonBufferData)) =>
    _updateCommonBufferData((commonBuffer, commonBufferData))
  )
  ->WonderBsMost.Most.just
