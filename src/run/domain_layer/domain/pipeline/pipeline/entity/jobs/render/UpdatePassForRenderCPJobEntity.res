let create = () => JobEntity.create("update_pass_for_render")

let _updateCommonBufferData = ((commonBuffer, commonBufferData)) => {
  let totalSampleCount = PassCPRepo.getTotalSampleCount()

  TypeArrayCPRepoUtils.setUint32_1(1, totalSampleCount, commonBufferData)->Result.tap(() => {
    WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubUint32Data(
      0,
      commonBufferData,
      commonBuffer->UniformBufferVO.value,
    )

    PassCPRepo.setCommonBufferData((commonBuffer, commonBufferData))
  })
}

let exec = () =>
  PassCPRepo.getCommonBufferData()
  ->OptionSt.get
  ->Result.bind(((commonBuffer, commonBufferData)) =>
    _updateCommonBufferData((commonBuffer, commonBufferData))
  )
  ->WonderBsMost.Most.just
