open GeometryType;

open GeometryStateUtils;

let getDataGroup = (geometry: geometry, state: StateDataType.state) =>
  switch (getGeometryData(state).dataGroupMap |> WonderCommonlib.SparseMapSystem.get(geometry)) {
  | None => "default"
  | Some(group) => group
  };

let setDataGroup = (geometry: geometry, dataGroup: string, state: StateDataType.state) => {
  getGeometryData(state).dataGroupMap |> WonderCommonlib.SparseMapSystem.set(geometry, dataGroup);
  state
};