
let getOrCreateHashMap = (map) =>
  switch map {
  | None => WonderCommonlib.HashMapSystem.createEmpty()
  | Some(map) => map
  };
