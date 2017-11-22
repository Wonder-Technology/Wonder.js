open GeometryType;

open GeometryStateUtils;

open GeometryOperateDataUtils;

let initGeometry = (index: int, state: StateDataType.state) => {
  let geometryData = getGeometryData(state);
  /* let mapedIndex =
     GeometryIndexUtils.getMappedIndex(
       Js.Int.toString(index),
       GeometryIndexUtils.getMappedIndexMap(state)
     ); */
  switch (
    geometryData.computeDataFuncMap |> WonderCommonlib.HashMapSystem.get(Js.Int.toString(index))
  ) {
  | None => state
  | Some(computeDataFunc) =>
    let {vertices, indices}: geometryComputeData = computeDataFunc(index, state);
    /* todo compute normals */
    state |> setVertices(index, vertices) |> setIndices(index, indices)
  }
};

let handleInitComponent = (index: int, state: StateDataType.state) =>
  initGeometry(index, state);