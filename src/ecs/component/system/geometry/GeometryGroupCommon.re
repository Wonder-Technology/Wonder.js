open GeometryType;

open GeometryGetStateDataCommon;

let getGroupCount = (geometry: geometry, state: StateDataType.state) =>
  GroupUtils.getGroupCount(geometry, getGeometryData(state).groupCountMap);

let isGroupGeometry = (geometry: geometry, state: StateDataType.state) =>
  GroupUtils.isGroupComponent(geometry, getGeometryData(state).groupCountMap);

let increaseGroupCount =
  [@bs]
  (
    (geometry: geometry, state: StateDataType.state) => {
      GroupUtils.increaseGroupCount(geometry, getGeometryData(state).groupCountMap) |> ignore;
      state
    }
  );

let decreaseGroupCount = (geometry: geometry, state: StateDataType.state) => {
  GroupUtils.decreaseGroupCount(geometry, getGeometryData(state).groupCountMap) |> ignore;
  state
};