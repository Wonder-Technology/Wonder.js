
let buildMapFromArray = (array, map) => {
  array
  |> WonderCommonlib.ArrayService.forEach(
       [@bs] ((value) => map |> WonderCommonlib.SparseMapService.set(value, true) |> ignore)
     );
  map
};