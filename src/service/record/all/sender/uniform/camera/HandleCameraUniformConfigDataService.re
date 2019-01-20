let addCameraSendData =
    ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch (field) {
  | "vMatrix" =>
    HandleUniformShaderNoCachableService.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      GetCameraDataGetRenderDataSubService.getCameraVMatrixData,
    )
  | "pMatrix" =>
    HandleUniformShaderNoCachableService.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      GetCameraDataGetRenderDataSubService.getCameraPMatrixData,
    )
  | "position" =>
    HandleUniformShaderCachableService.addUniformSendDataByType(
      (uniformCacheMap, name, pos, type_),
      sendDataArrTuple,
      GetCameraDataGetRenderDataSubService.getCameraPositionData,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addCameraSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };