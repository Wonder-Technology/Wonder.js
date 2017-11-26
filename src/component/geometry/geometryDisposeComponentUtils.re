open GeometryType;

open StateDataType;

open GeometryStateUtils;

open Contract;

let isAlive = (geometry: geometry, state: StateDataType.state) => {
  let {mappedIndexMap, disposedIndexMap} = GeometryStateUtils.getGeometryData(state);
  disposedIndexMap |> SparseMapSystem.has(geometry) ?
    false :
    mappedIndexMap
    |> SparseMapSystem.get((geometry))
    |> Js.Option.isSome
};

let handleDisposeComponent = (geometry: geometry, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentUtils.checkComponentShouldAlive(geometry, isAlive, state)
      )
  );
  let {disposedIndexMap, disposeCount} as data = getGeometryData(state);
  disposedIndexMap |> SparseMapSystem.set(geometry, true) |> ignore;
  let state = VboBufferSystem.addBufferToPool(geometry, state);
  data.disposeCount = succ(disposeCount);
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGeometry(state)
  } else {
    state
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
         (state, geometry) => {
           disposedIndexMap |> SparseMapSystem.set(geometry, true) |> ignore;
           VboBufferSystem.addBufferToPool(geometry, state)
         }
       ),
       state
     )
  |> ignore;
  data.disposeCount = disposeCount + (geometryArray |> Js.Array.length);
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGeometry(state)
  } else {
    state
  }
};

let isNotDisposed = ({index, mappedIndex, disposeCount}) =>
  index == mappedIndex && disposeCount == 0;