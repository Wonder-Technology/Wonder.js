let getName = (id, nameMap) =>
  nameMap |> WonderCommonlib.SparseMapService.get(id);

let unsafeGetName = (id, nameMap) =>
  getName(id, nameMap) |> OptionService.unsafeGet;

let setName = (id, name, nameMap) =>
  nameMap |> WonderCommonlib.SparseMapService.set(id, name);