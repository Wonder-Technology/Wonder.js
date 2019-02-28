let isEmpty = WonderCommonlib.NullService.isEmpty;

let isNotEmpty = value => !WonderCommonlib.NullService.isEmpty(value);

let fastGet = (key: int, map) => {
  let value = WonderCommonlib.MutableSparseMapService.unsafeGet(key, map);

  (isNotEmpty(value), value);
};