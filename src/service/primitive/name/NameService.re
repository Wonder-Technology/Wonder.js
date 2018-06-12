let unsafeGetName = (id, nameMap) =>
  nameMap
  |> WonderCommonlib.SparseMapService.get(id)
  |> OptionService.unsafeGet;

let setName = (id, name, nameMap) =>
  nameMap |> WonderCommonlib.SparseMapService.set(id, name);