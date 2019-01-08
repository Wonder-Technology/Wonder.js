let addAmbientLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch (field) {
  | "send" =>
    HandleUniformShaderCachableFunctionService.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendAmbientLightUniformSendRenderDataService.send,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addAmbientLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let addDirectionLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch (field) {
  | "send" =>
    HandleUniformShaderCachableFunctionService.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendDirectionLightUniformSendRenderDataService.send,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addDirectionLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let addPointLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch (field) {
  | "send" =>
    HandleUniformShaderCachableFunctionService.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendPointLightUniformSendRenderDataService.send,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addPointLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };