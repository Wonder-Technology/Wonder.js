open StateDataType;

open GeometryType;

open BoxGeometryType;

let _isInit = (index: int, state: StateDataType.state) =>
  switch (state.boxGeometryRecord.isInitMap |> WonderCommonlib.SparseMapSystem.get(index)) {
  | None => false
  | Some(bool) => bool
  };

let _markIsInit = (index: int, isInit: bool, state: StateDataType.state) => {
  state.boxGeometryRecord.isInitMap |> WonderCommonlib.SparseMapSystem.set(index, isInit);
  state
};

let initGeometry = (index: int, state: StateDataType.state) =>
  if (_isInit(index, state)) {
    state
  } else {
    let {computeDataFuncMap} = state.boxGeometryRecord;
    switch (computeDataFuncMap |> WonderCommonlib.SparseMapSystem.get(index)) {
    | None => state
    | Some(computeDataFunc) =>
      let {vertices, normals, indices}: geometryComputeData =
        computeDataFunc(index, state.boxGeometryRecord);
      state
      |> VerticesGeometryService.setVerticesWithArray(index, vertices)
      |> NormalsGeometryService.setNormalsWithArray(index, normals)
      |> IndicesGeometryService.setIndicesWithArray(index, indices)
      |> _markIsInit(index, true)
    }
  };

let init = (state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not dispose any geometry before init|j},
                ~actual={j|not|j}
              ),
              () => DisposeGeometryService.isNotDisposed(state) |> assertTrue
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  let {index} = state.boxGeometryRecord;
  ArraySystem.range(0, index - 1)
  |> ArraySystem.reduceState(
       [@bs] ((state, geometryIndex: int) => initGeometry(geometryIndex, state)),
       state
     )
};

let handleInitComponent = (index: int, state: StateDataType.state) => initGeometry(index, state);