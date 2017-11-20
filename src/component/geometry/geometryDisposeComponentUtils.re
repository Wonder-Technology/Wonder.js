open GeometryType;

open StateDataType;

open GeometryStateUtils;

open Contract;

let _isDisposeTooMany = (disposeCount: int, state: StateDataType.state) =>
  disposeCount >= state.memoryConfig.maxDisposeCount;

/* let handleDisposeComponent =
   (geometry: geometry, gameObjectUid: string, state: StateDataType.state) => { */
let handleDisposeComponent = (geometry:geometry, gameObjectUid: string, state: StateDataType.state) => {
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
  disposedIndexMap |> WonderCommonlib.HashMapSystem.set(Js.Int.toString(geometry), true) |> ignore;
  data.disposeCount = succ(disposeCount);
  if (_isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    /* todo handle vbo buffer */
    CpuMemorySystem.reAllocateGeometry(state)
  } else {
    state
  }
};