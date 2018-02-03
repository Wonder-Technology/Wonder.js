let checkNotExceedMaxCount = (maxCount, resultTuple) =>
  resultTuple
  |> WonderLog.Contract.ensureCheck(
       ((state, index)) => {
         open WonderLog;
         open Contract;
         open Operators;
         let maxIndex = maxCount - 1;
         test(
           Log.buildAssertMessage(
             ~expect={j|index: $index <= maxIndex: $maxIndex|j},
             ~actual={j|not|j}
           ),
           () => assertLte(Int, index, maxIndex)
         )
       },
       StateData.stateData.isDebug
     );