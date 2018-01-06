open MaterialType;

open MaterialStateCommon;

let getGroupCount = (material: material, state: StateDataType.state) =>
  GroupUtils.getGroupCount(material, getMaterialData(state).groupCountMap);

let isGroupMaterial = (material: material, state: StateDataType.state) =>
  GroupUtils.isGroupComponent(material, getMaterialData(state).groupCountMap);

let increaseGroupCount =
  [@bs]
  (
    (material: material, state: StateDataType.state) => {
      GroupUtils.increaseGroupCount(material, getMaterialData(state).groupCountMap) |> ignore;
      state
    }
  );

let decreaseGroupCount = (material: material, state: StateDataType.state) => {
  GroupUtils.decreaseGroupCount(material, getMaterialData(state).groupCountMap) |> ignore;
  state
};