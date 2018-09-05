let createJobHandleMap = handleList =>
  WonderCommonlib.HashMapService.fromList(handleList);

let concatJobHandleMaps = (handleMap1, handleMap2) =>
  HashMapService.entries(handleMap1)
  |> Js.Array.concat(HashMapService.entries(handleMap2))
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. resultHandleMap, (key, value)) =>
         resultHandleMap |> WonderCommonlib.HashMapService.set(key, value),
       WonderCommonlib.HashMapService.createEmpty(),
     );