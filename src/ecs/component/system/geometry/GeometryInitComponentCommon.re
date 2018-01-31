open GeometryType;

open StateDataType;

open GeometryGetStateDataCommon;

let _isInit = (index: int, state: StateDataType.state) =>
  switch (getGeometryData(state).isInitMap |> WonderCommonlib.SparseMapSystem.get(index)) {
  | None => false
  | Some(bool) => bool
  };

let _markIsInit = (index: int, isInit: bool, state: StateDataType.state) => {
  getGeometryData(state).isInitMap |> WonderCommonlib.SparseMapSystem.set(index, isInit);
  state
};

let initGeometry = (index: int, state: StateDataType.state) =>
  if (_isInit(index, state)) {
    state
  } else {
    let {computeDataFuncMap} = getGeometryData(state);
    switch (computeDataFuncMap |> WonderCommonlib.SparseMapSystem.get(index)) {
    | None => state
    | Some(computeDataFunc) =>
      let {vertices, normals, indices}: geometryComputeData = computeDataFunc(index, state);
      /* TODO compute normals */
      state
      |> GeometryOperateVerticesCommon.setVerticesWithArray(index, vertices)
      |> GeometryOperateNormalsCommon.setNormalsWithArray(index, normals)
      |> GeometryOperateIndicesCommon.setIndicesWithArray(index, indices)
      |> _markIsInit(index, true)
    }
  };

let handleInitComponent = (index: int, state: StateDataType.state) => initGeometry(index, state);