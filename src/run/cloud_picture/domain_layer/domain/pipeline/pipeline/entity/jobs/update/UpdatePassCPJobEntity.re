let create = () => JobEntity.create("update_pass");

let _updateCommonBufferData = ((commonBuffer, commonBufferData)) => {
  let sampleCount = PassCPRepo.getSampleCount();
  let totalSampleCount = PassCPRepo.getTotalSampleCount();

  ListResult.mergeResults([
    TypeArrayCPRepoUtils.setUint32_1(0, sampleCount, commonBufferData),
    TypeArrayCPRepoUtils.setUint32_1(1, totalSampleCount, commonBufferData),
  ])
  ->Result.tap(() => {
      DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubUint32Data(
        0,
        commonBufferData,
        commonBuffer->UniformBufferVO.value,
      );

      PassCPRepo.setCommonBufferData((commonBuffer, commonBufferData));
    });
};

let _updateAllBufferData = ((commonBuffer, commonBufferData)) => {
  _updateCommonBufferData((commonBuffer, commonBufferData));
};

let exec = () => {
  PassCPRepo.getCommonBufferData()
  ->OptionSt.get
  ->Result.bind(((commonBuffer, commonBufferData)) => {
      _updateAllBufferData((commonBuffer, commonBufferData))
    })
  ->WonderBsMost.Most.just;
};
