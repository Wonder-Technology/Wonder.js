let unsafeGetAndCheck = (key: int, map: array(Js.Nullable.t('a))) =>
  Array.unsafe_get(map, key)
  |> WonderCommonlib.SparseMapType.nullableToNotNullable
  |> WonderLog.Contract.ensureCheck(
       data =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|data exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 data
                 |> Js.Nullable.return
                 |> Js.Nullable.toOption
                 |> assertExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );