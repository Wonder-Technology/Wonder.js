open GeometryType;

open GeometryStateUtils;

open GeometryOperateDataUtils;

let initGeometry = (index: int, state: StateDataType.state) => {
  let geometryData = getGeometryData(state);
  let mapedIndex =
    GeometryIndexUtils.getIndexFromIndexMap(
      Js.Int.toString(index),
      GeometryIndexUtils.getIndexMap(state)
    );
  switch (
    geometryData.computeDataFuncMap |> WonderCommonlib.HashMapSystem.get(Js.Int.toString(mapedIndex))
  ) {
  | None => state
  | Some(computeDataFunc) =>
    let {vertices, indices}: geometryComputeData = computeDataFunc(mapedIndex, state);
    /* todo compute normals */
    state |> setVertices(mapedIndex, vertices) |> setIndices(mapedIndex, indices)
  }
};

let handleInitComponent = (index: int, gameObjectUid: string, state: StateDataType.state) =>
  initGeometry(index, state);