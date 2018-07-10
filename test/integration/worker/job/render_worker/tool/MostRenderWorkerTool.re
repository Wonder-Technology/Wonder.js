let concatStreamFuncArray = (dataForfirstStreamFunc, stateData, streamFuncArr) =>
  streamFuncArr
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. stream1, streamFunc2) =>
         stream1
         |> WonderBsMost.Most.concatMap(e => streamFunc2(e, stateData)),
       streamFuncArr[0](
         Some(dataForfirstStreamFunc |> Obj.magic),
         stateData,
       ),
     );