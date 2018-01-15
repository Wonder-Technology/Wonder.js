let getUniformSendData = (shaderIndex: int, map) =>
  map
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> WonderLog.Contract.ensureCheck(
       (sendData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|uniform send data exist|j}, ~actual={j|not|j}),
                 () => sendData |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     );