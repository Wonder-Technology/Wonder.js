open GeometryType;

open StateDataType;

open GeometryGetStateDataCommon;

let getGroupCount = (geometry: geometry, state: StateDataType.state) =>
  GroupUtils.getGroupCount(geometry, getGeometryData(state).groupCountMap);

let isGroupGeometry = (geometry: geometry, state: StateDataType.state) =>
  GroupUtils.isGroupComponent(geometry, getGeometryData(state).groupCountMap);

let increaseGroupCount =
  [@bs]
  (
    (geometry: geometry, state: StateDataType.state) => {
      let {groupCountMap} as data = getGeometryData(state);
      {
        ...state,
        geometryData: {
          ...data,
          groupCountMap: groupCountMap |> GroupUtils.increaseGroupCount(geometry)
        }
      }
    }
  );

let decreaseGroupCount = (geometry: geometry, state: StateDataType.state) => {
  let {groupCountMap} as data = getGeometryData(state);
  {
    ...state,
    geometryData: {
      ...data,
      groupCountMap: groupCountMap |> GroupUtils.decreaseGroupCount(geometry)
    }
  }
};