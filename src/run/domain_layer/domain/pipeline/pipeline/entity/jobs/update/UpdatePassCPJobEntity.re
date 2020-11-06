let create = () => JobEntity.create("update_pass");

let _updateCommonBufferData = ((commonBuffer, commonBufferData)) => {
  let sampleCount = PassCPRepo.getSampleCount();

  TypeArrayCPRepoUtils.setUint32_1(0, sampleCount, commonBufferData)
  ->Result.tap(() => {
      WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubUint32Data(
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
