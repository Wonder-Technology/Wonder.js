let setDefaultColor = (index: int, colorMap) =>
  colorMap |> WonderCommonlib.SparseMapService.set(index, [|1., 1., 1.|]);

let unsafeGetColor = (material, colorMap) =>
  colorMap |> WonderCommonlib.SparseMapService.unsafeGet(material);

let setColor = (material, color: array(float), colorMap) =>
  colorMap |> WonderCommonlib.SparseMapService.set(material, color);