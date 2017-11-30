open GeometryType;

open StateDataType;

open GeometryStateUtils;

open Contract;

let isAlive = (geometry: geometry, state: StateDataType.state) => {
  let {mappedIndexMap, disposedIndexMap} = GeometryStateUtils.getGeometryData(state);
  disposedIndexMap |> WonderCommonlib.SparseMapSystem.has(geometry) ?
    false : mappedIndexMap |> WonderCommonlib.SparseMapSystem.get(geometry) |> Js.Option.isSome
};

let _isNotUsedGeometry = (geometry: geometry, state: StateDataType.state) =>
  GeometryGroupUtils.getGroupCount(geometry, state) == 0;

let handleDisposeComponent = (geometry: geometry, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentUtils.checkComponentShouldAlive(geometry, isAlive, state)
      )
  );
  switch (GeometryGroupUtils.isGroupGeometry(geometry, state)) {
  | false =>
    let state = VboBufferSystem.addBufferToPool(geometry, state);
    let {disposedIndexMap, disposeCount} as data = getGeometryData(state);
    disposedIndexMap |> WonderCommonlib.SparseMapSystem.set(geometry, true) |> ignore;
    data.disposeCount = succ(disposeCount);
    if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
      data.disposeCount = 0;
      CpuMemorySystem.reAllocateGeometry(state)
    } else {
      state
    }
  | true => GeometryGroupUtils.decreaseGroupCount(geometry, state)
  }
};

let handleBatchDisposeComponent =
    (geometryArray: array(geometry), gameObjectUidMap, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        geometryArray
        |> WonderCommonlib.ArraySystem.forEach(
             [@bs]
             (
               (geometry) =>
                 ComponentDisposeComponentUtils.checkComponentShouldAlive(geometry, isAlive, state)
             )
           )
      )
  );
  let {disposedIndexMap, disposeCount} as data = getGeometryData(state);
  geometryArray
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, geometry) =>
           switch (GeometryGroupUtils.isGroupGeometry(geometry, state)) {
           | false =>
             disposedIndexMap |> WonderCommonlib.SparseMapSystem.set(geometry, true) |> ignore;
             let state = VboBufferSystem.addBufferToPool(geometry, state);
             data.disposeCount = disposeCount + (geometryArray |> Js.Array.length);
             if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
               data.disposeCount = 0;
               CpuMemorySystem.reAllocateGeometry(state)
             } else {
               state
             }
           | true => GeometryGroupUtils.decreaseGroupCount(geometry, state)
           }
       ),
       state
     )
};

let isNotDisposed = ({index, mappedIndex, disposeCount}) =>
  index == mappedIndex && disposeCount == 0;