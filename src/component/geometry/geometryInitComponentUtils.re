open GeometryType;

open StateDataType;

open GeometryStateUtils;

open GeometryOperateDataUtils;

let initGeometry = (mappedIndex: int, state: StateDataType.state) => {
  let {isClonedMap, computeDataFuncMap} = getGeometryData(state);
  GeometryCloneComponentUtils.isCloned(Js.Int.toString(mappedIndex), isClonedMap) ?
    state :
    (
      switch (computeDataFuncMap |> WonderCommonlib.HashMapSystem.get(Js.Int.toString(mappedIndex))) {
      | None => state
      | Some(computeDataFunc) =>
        let {vertices, indices}: geometryComputeData = computeDataFunc(mappedIndex, state);
        /* todo compute normals */
        state |> setVertices(mappedIndex, vertices) |> setIndices(mappedIndex, indices)
      }
    )
};

let handleInitComponent = (mappedIndex: int, state: StateDataType.state) =>
  initGeometry(mappedIndex, state);