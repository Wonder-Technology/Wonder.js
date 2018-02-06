
let addCameraSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "vMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraVMatrixDataFromState
    )
  | "pMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraPMatrixDataFromState
    )
  | "position" =>
    GLSLSenderConfigDataHandleUniformShaderCachableCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      RenderDataSystem.getCameraPositionDataFromState
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