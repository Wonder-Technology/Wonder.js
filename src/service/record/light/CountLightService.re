let getLightCount = (count, maxCount) =>
  count
  |> WonderLog.Contract.ensureCheck(
       (count) => {
         open WonderLog;
         open Contract;
         open Operators;
         let maxCount = RecordDirectionLightService.getBufferMaxCount();
         test(
           Log.buildAssertMessage(
             ~expect={j|light count: $count <= max buffer count: $maxCount|j},
             ~actual={j|not|j}
           ),
           () => assertLte(Int, count, maxCount)
         )
       },
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );