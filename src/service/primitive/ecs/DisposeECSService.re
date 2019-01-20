
let buildMapFromArray = (array, map) => {
  array
  |> WonderCommonlib.ArrayService.forEach(
       [@bs] ((value) => map |> WonderCommonlib.MutableSparseMapService.set(value, true) |> ignore)
     );
  map
};