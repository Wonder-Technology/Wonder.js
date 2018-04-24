
let getOrCreateHashMap = (map) =>
  switch map {
  | None => WonderCommonlib.HashMapService.createEmpty()
  | Some(map) => map
  };
