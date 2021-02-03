open Js.Typed_array

// TODO refactor: move commonBufferData to bmfr pass po
// TODO refactor: rename UpdateBMFRRegressionPassRTJobEntity  to UpdateBMFRPassRTJobEntity

let create = () => JobEntity.create("update_bmfr_regression_pass")

let _updateFrameIndex = () => {
  BMFRRegressionPassRTRepo.getFrameIndex()->succ->BMFRRegressionPassRTRepo.setFrameIndex
}

let _updateCommonBufferData = ((commonBuffer, commonBufferData)) => {
  let frameIndex = BMFRRegressionPassRTRepo.getFrameIndex()

  TypeArrayRTRepoUtils.setUint32_1(0, frameIndex, commonBufferData)->Result.tap(() => {
    WebGPUCoreDpRunAPI.unsafeGet().buffer.setSubUint32Data(
      0,
      commonBufferData,
      commonBuffer->UniformBufferVO.value,
    )

    BMFRRegressionPassRTRepo.setCommonBufferData((commonBuffer, commonBufferData))
  })
}

let _updateAllBufferData = ((commonBuffer, commonBufferData)) => {
  _updateFrameIndex()
  _updateCommonBufferData((commonBuffer, commonBufferData))
}

let exec = () =>
  BMFRRegressionPassRTRepo.getCommonBufferData()
  ->OptionSt.get
  ->Result.bind(((commonBuffer, commonBufferData)) =>
    _updateAllBufferData((commonBuffer, commonBufferData))
  )
  ->WonderBsMost.Most.just
