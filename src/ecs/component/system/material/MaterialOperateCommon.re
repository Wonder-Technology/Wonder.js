open MaterialType;

open StateDataType;

let unsafeGetColor = (material, colorMap) =>
  colorMap |> WonderCommonlib.SparseMapSystem.unsafeGet(material);

let setColor = (material, color: array(float), colorMap) =>
  colorMap |> WonderCommonlib.SparseMapSystem.set(material, color);