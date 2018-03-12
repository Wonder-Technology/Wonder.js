let setDefaultColor = (index: int, colorMap) =>
  colorMap |> WonderCommonlib.SparseMapSystem.set(index, [|1., 1., 1.|]);

let unsafeGetColor = (material, colorMap) =>
  colorMap |> WonderCommonlib.SparseMapSystem.unsafeGet(material);

let setColor = (material, color: array(float), colorMap) =>
  colorMap |> WonderCommonlib.SparseMapSystem.set(material, color);