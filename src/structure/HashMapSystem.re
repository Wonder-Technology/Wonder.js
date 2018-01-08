let entries = Js.Dict.entries;

let copy = (map) =>
  map
  |> entries
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs] ((newMap, (key, value)) => newMap |> WonderCommonlib.HashMapSystem.set(key, value)),
       WonderCommonlib.HashMapSystem.createEmpty()
     );