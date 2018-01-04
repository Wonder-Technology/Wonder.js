open MaterialType;

open StateDataType;

open MaterialStateCommon;

let unsafeGetColor = (material: material, state: StateDataType.state) =>
  getMaterialData(state).colorMap |> WonderCommonlib.SparseMapSystem.unsafeGet(material);

let setColor = (material: material, color: array(float), state: StateDataType.state) => {
  getMaterialData(state).colorMap |> WonderCommonlib.SparseMapSystem.set(material, color) |> ignore;
  state
};