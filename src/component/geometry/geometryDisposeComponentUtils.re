open GeometryType;

open StateDataType;

open GeometryStateUtils;

open Contract;

/* let handleDisposeComponent =
   (geometry: geometry, gameObjectUid: string, state: StateDataType.state) => { */
let handleDisposeComponent = (geometry: geometry, state: StateDataType.state) => {
  /* todo refactor: duplicate */
  /* todo check */
  /* requireCheck(
       () =>
         Contract.Operators.(
           test(
             "shouldn't dispose before",
             () => {
               let {disposedIndexArray} = getGeometryData(state);
               disposedIndexArray |> Js.Array.includes(geometry) |> assertFalse
             }
           )
         )
     ); */
  let {disposedIndexMap, disposeCount} as data = getGeometryData(state);
  let geometryIndexStr = Js.Int.toString(geometry);
  disposedIndexMap |> WonderCommonlib.HashMapSystem.set(geometryIndexStr, true) |> ignore;
  let state = VboBufferSystem.addBufferToPool(geometryIndexStr, state);
  data.disposeCount = succ(disposeCount);
  if (MemoryUtils.isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    /* todo handle vbo buffer */
    CpuMemorySystem.reAllocateGeometry(state)
  } else {
    state
  }
};

let isNotDisposed = ({index, mappedIndex, disposeCount}) =>
  index == mappedIndex && disposeCount == 0;