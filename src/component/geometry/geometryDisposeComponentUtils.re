open GeometryType;

open StateDataType;

open GeometryStateUtils;

open Contract;

let handleDisposeComponent =
    (geometry: geometry, gameObjectUid: string, state: StateDataType.state) => {
  /* todo refactor: duplicate */
  requireCheck(
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
     );
  let {disposedIndexArray} as geometryData = getGeometryData(state);
     disposedIndexArray |> Js.Array.push(geometry) |> ignore;
  /* let {disposeCount} as geometryData = getGeometryData(state);
  geometryData.disposeCount = succ(disposeCount); */
  state
};