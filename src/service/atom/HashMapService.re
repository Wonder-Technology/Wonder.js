let entries = Js.Dict.entries;

let copy = (map) =>
  map
  |> entries
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((newMap, (key, value)) => newMap |> WonderCommonlib.HashMapService.set(key, value)),
       WonderCommonlib.HashMapService.createEmpty()
     );