
let getOrCreateHashMap = (map) =>
  switch map {
  | None => WonderCommonlib.MutableHashMapService.createEmpty()
  | Some(map) => map
  };
