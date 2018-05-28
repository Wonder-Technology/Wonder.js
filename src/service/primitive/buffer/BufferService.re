let checkNotExceedMaxCountByIndex = (maxCount, index) =>
  index
  |> WonderLog.Contract.ensureCheck(
       (index) => {
         open WonderLog;
         open Contract;
         open Operators;
         let maxIndex = maxCount - 1;
         test(
           Log.buildAssertMessage(
             ~expect={j|index: $index <= maxIndex: $maxIndex|j},
             ~actual={j|not|j}
           ),
           /* () => assertLte(Int, index, maxIndex) */
           () => index <= maxIndex
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let checkNotExceedMaxCount = (maxCount, resultTuple) => {
  let (_, index) = resultTuple;
  checkNotExceedMaxCountByIndex(maxCount, index) |> ignore;
  resultTuple
};