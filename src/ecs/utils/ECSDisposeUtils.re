let buildMapFromArray = (array, map) => {
  array
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs] ((value) => map |> WonderCommonlib.SparseMapSystem.set(value, true) |> ignore)
     );
  map
};