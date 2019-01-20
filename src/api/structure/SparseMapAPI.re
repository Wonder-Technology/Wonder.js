let createSparseMap = () => WonderCommonlib.MutableSparseMapService.createEmpty();

let unsafeGetSparseMapValue = (key: int, map) =>
  WonderCommonlib.MutableSparseMapService.unsafeGet(key, map);

let getSparseMapValue = (key: int, map) =>
  WonderCommonlib.MutableSparseMapService.get(key, map);

let setSparseMapValue = (key: int, value, map) =>
  WonderCommonlib.MutableSparseMapService.set(key, value, map);

let mergeSparseMaps = mapArr => WonderCommonlib.MutableSparseMapService.mergeSparseMaps(mapArr);