let getName = (id, nameMap) =>
  nameMap |> WonderCommonlib.MutableSparseMapService.get(id);

let unsafeGetName = (id, nameMap) =>
  getName(id, nameMap) |> OptionService.unsafeGet;

let setName = (id, name, nameMap) =>
  nameMap |> WonderCommonlib.MutableSparseMapService.set(id, name);