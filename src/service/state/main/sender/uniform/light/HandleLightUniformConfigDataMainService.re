
let addAmbientLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch field {
  | "send" =>
    HandleUniformShaderCachableFunctionMainService.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendAmbientLightHandle.send
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addAmbientLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let addDirectionLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch field {
  | "send" =>
    HandleUniformShaderCachableFunctionMainService.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendDirectionLightHandle.send
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addDirectionLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let addPointLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch field {
  | "send" =>
    HandleUniformShaderCachableFunctionMainService.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendPointLightHandle.send
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addPointLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

