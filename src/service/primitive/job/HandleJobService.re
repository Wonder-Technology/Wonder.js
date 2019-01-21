let createJobHandleMap = handleList =>
  WonderCommonlib.MutableHashMapService.fromList(handleList);

let concatJobHandleMaps = (handleMap1, handleMap2) =>
  WonderCommonlib.MutableHashMapService.entries(handleMap1)
  |> Js.Array.concat(
       WonderCommonlib.MutableHashMapService.entries(handleMap2),
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. resultHandleMap, (key, value)) =>
         resultHandleMap
         |> WonderCommonlib.MutableHashMapService.set(key, value),
       WonderCommonlib.MutableHashMapService.createEmpty(),
     );