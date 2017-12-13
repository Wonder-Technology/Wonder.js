open MaterialType;

open StateDataType;

let unsafeGetColor = (material: material, state: StateDataType.state) =>
  MaterialStateCommon.getMaterialData(state).colorMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(material);