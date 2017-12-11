open GeometryType;

open StateDataType;

open GeometryStateCommon;

open Contract;

let isAlive = (geometry: geometry, state: StateDataType.state) =>
  ! (getGeometryData(state).disposedIndexMap |> WonderCommonlib.SparseMapSystem.has(geometry));

let handleDisposeComponent = (geometry: geometry, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentCommon.checkComponentShouldAlive(geometry, isAlive, state)
      )
  );
  switch (GeometryGroupCommon.isGroupGeometry(geometry, state)) {
  | false =>
    let state = VboBufferSystem.addBufferToPool(geometry, state);
    let {disposedIndexMap} as data = getGeometryData(state);
    disposedIndexMap |> WonderCommonlib.SparseMapSystem.set(geometry, true) |> ignore;
    state
  | true => GeometryGroupCommon.decreaseGroupCount(geometry, state)
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (geometryArray: array(geometry), gameObjectUidMap: array(bool), state: StateDataType.state) => {
      requireCheck(
        () =>
          Contract.Operators.(
            geometryArray
            |> WonderCommonlib.ArraySystem.forEach(
                 [@bs]
                 (
                   (geometry) =>
                     ComponentDisposeComponentCommon.checkComponentShouldAlive(
                       geometry,
                       isAlive,
                       state
                     )
                 )
               )
          )
      );
      let {disposedIndexMap} as data = getGeometryData(state);
      geometryArray
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, geometry) =>
               switch (GeometryGroupCommon.isGroupGeometry(geometry, state)) {
               | false =>
                 disposedIndexMap |> WonderCommonlib.SparseMapSystem.set(geometry, true) |> ignore;
                 let state = VboBufferSystem.addBufferToPool(geometry, state);
                 state
               | true => GeometryGroupCommon.decreaseGroupCount(geometry, state)
               }
           ),
           state
         )
    }
  );

let isNotDisposed = ({disposedIndexMap}) => disposedIndexMap |> SparseMapSystem.length === 0;