let addCameraSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "vMatrix" =>
    HandleUniformShaderNoCachableService.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      OperateRenderMainService.getCameraVMatrixData
    )
  | "pMatrix" =>
    HandleUniformShaderNoCachableService.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      OperateRenderMainService.getCameraPMatrixData
    )
  | "position" =>
    HandleUniformShaderCachableService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      OperateRenderMainService.getCameraPositionData
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addCameraSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };