let getDefaultCount = () => 0;

let unsafeGetCount = (material, textureCountMap) =>
  textureCountMap |> WonderCommonlib.SparseMapService.unsafeGet(material);

let setCount = (material, count, textureCountMap) =>
  textureCountMap |> WonderCommonlib.SparseMapService.set(material, count);