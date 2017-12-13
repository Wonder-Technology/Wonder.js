open GeometryType;

open GeometryStateCommon;

open Contract;

/* let isDefaultGroup = (group) => group === 0;

   let getGroup = (geometry: geometry, state: StateDataType.state) =>
     switch (getGeometryData(state).groupMap |> WonderCommonlib.SparseMapSystem.get(geometry)) {
     | None => 0
     | Some(group) => group
     };

   let setGroup = (geometry: geometry, group: int, state: StateDataType.state) => {
     requireCheck(
       () =>
         Contract.Operators.(
           test(
             "group should in [1, 63]",
             () => {
               group >= 1;
               group <= 63
             }
           )
         )
     );
     getGeometryData(state).groupMap |> WonderCommonlib.SparseMapSystem.set(geometry, group);
     state
   }; */
let getGroupCount = (geometry: geometry, state: StateDataType.state) =>
  switch (getGeometryData(state).groupCountMap |> WonderCommonlib.SparseMapSystem.get(geometry)) {
  | None => 0
  | Some(count) => count
  };

let isGroupGeometry = (geometry: geometry, state: StateDataType.state) =>
  getGroupCount(geometry, state) > 0;

let increaseGroupCount =
  [@bs]
  (
    (geometry: geometry, state: StateDataType.state) => {
      getGeometryData(state).groupCountMap
      |> WonderCommonlib.SparseMapSystem.set(geometry, getGroupCount(geometry, state) |> succ);
      state
    }
  );

let decreaseGroupCount = (geometry: geometry, state: StateDataType.state) => {
  getGeometryData(state).groupCountMap
  |> WonderCommonlib.SparseMapSystem.set(geometry, getGroupCount(geometry, state) |> pred);
  state
};