
let unsafeGetUniformSendData = (shaderIndex: int, map) =>
  map
  |> WonderCommonlib.MutableSparseMapService.unsafeGet(shaderIndex)
  |> WonderLog.Contract.ensureCheck(
       (sendData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|uniform send record exist|j}, ~actual={j|not|j}),
                 () => sendData |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );