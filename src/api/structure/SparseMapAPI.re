let createSparseMap = () => WonderCommonlib.SparseMapService.createEmpty();

let unsafeGetSparseMapValue = (key: int, map) =>
  WonderCommonlib.SparseMapService.unsafeGet(key, map);

let getSparseMapValue = (key: int, map) =>
  WonderCommonlib.SparseMapService.get(key, map);

let setSparseMapValue = (key: int, value, map) =>
  WonderCommonlib.SparseMapService.set(key, value, map);

let mergeSparseMaps = mapArr => SparseMapService.mergeSparseMaps(mapArr);