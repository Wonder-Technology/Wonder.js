open GeometryType;

open StateDataType;

open GeometryStateSystem;

open GeometryOperateDataSystem;

let _isInit = (index: int, state: StateDataType.state) =>
  switch (getGeometryData(state).isInitMap |> WonderCommonlib.SparseMapSystem.get(index)) {
  | None => false
  | Some(bool) => bool
  };

let _markIsInit = (index: int, isInit: bool, state: StateDataType.state) => {
  getGeometryData(state).isInitMap |> WonderCommonlib.SparseMapSystem.set(index, isInit);
  state
};

let initGeometry = (index: int, mappedIndex: int, state: StateDataType.state) =>
  if (_isInit(index, state)) {
    state
  } else {
    let {computeDataFuncMap} = getGeometryData(state);
    switch (computeDataFuncMap |> WonderCommonlib.SparseMapSystem.get(mappedIndex)) {
    | None => state
    | Some(computeDataFunc) =>
      let {vertices, indices}: geometryComputeData = computeDataFunc(mappedIndex, state);
      /* todo compute normals */
      state
      |> setVertices(mappedIndex, vertices)
      |> setIndices(mappedIndex, indices)
      |> _markIsInit(index, true)
    }
  };

let handleInitComponent = (index: int, mappedIndex: int, state: StateDataType.state) =>
  initGeometry(index, mappedIndex, state);