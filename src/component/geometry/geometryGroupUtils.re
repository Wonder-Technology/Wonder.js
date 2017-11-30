open GeometryType;

open GeometryStateUtils;

let getGroup = (geometry: geometry, state: StateDataType.state) =>
  switch (getGeometryData(state).groupMap |> WonderCommonlib.SparseMapSystem.get(geometry)) {
  | None => "default"
  | Some(group) => group
  };

let setGroup = (geometry: geometry, group: string, state: StateDataType.state) => {
  getGeometryData(state).groupMap |> WonderCommonlib.SparseMapSystem.set(geometry, group);
  state
};