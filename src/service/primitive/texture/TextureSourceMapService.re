let hasSource = (texture, sourceMap) => sourceMap |> WonderCommonlib.SparseMapService.has(texture);

let getSource = (texture, sourceMap) => sourceMap |> WonderCommonlib.SparseMapService.get(texture);

let unsafeGetSource = (texture, sourceMap) =>
  sourceMap |> WonderCommonlib.SparseMapService.unsafeGet(texture);

let setSource = (texture, source, sourceMap) =>
  sourceMap |> WonderCommonlib.SparseMapService.set(texture, source);