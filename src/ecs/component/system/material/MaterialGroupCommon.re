open MaterialType;

open MaterialStateCommon;

open Contract;

let getGroupCount = (material: material, state: StateDataType.state) =>
  switch (getMaterialData(state).groupCountMap |> WonderCommonlib.SparseMapSystem.get(material)) {
  | None => 0
  | Some(count) => count
  };

let isGroupMaterial = (material: material, state: StateDataType.state) =>
  getGroupCount(material, state) > 0;

let increaseGroupCount =
  [@bs]
  (
    (material: material, state: StateDataType.state) => {
      getMaterialData(state).groupCountMap
      |> WonderCommonlib.SparseMapSystem.set(material, getGroupCount(material, state) |> succ);
      state
    }
  );

let decreaseGroupCount = (material: material, state: StateDataType.state) => {
  getMaterialData(state).groupCountMap
  |> WonderCommonlib.SparseMapSystem.set(material, getGroupCount(material, state) |> pred);
  state
};