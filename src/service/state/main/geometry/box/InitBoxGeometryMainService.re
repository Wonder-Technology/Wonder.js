open StateDataMainType;

open GeometryType;

open BoxGeometryType;

let _isInit = (index: int, isInitMap) =>
  switch (isInitMap |> WonderCommonlib.SparseMapService.get(index)) {
  | None => false
  | Some(bool) => bool
  };

let _markIsInit = (index: int, isInit: bool, state: StateDataMainType.state) => {
  let {isInitMap} = state |> RecordBoxGeometryMainService.getRecord;
  isInitMap |> WonderCommonlib.SparseMapService.set(index, isInit) |> ignore;
  state
};

let initGeometry = (index: int, state: StateDataMainType.state) => {
  let {isInitMap, computeDataFuncMap} as boxGeometryRecord =
    state |> RecordBoxGeometryMainService.getRecord;
  if (_isInit(index, isInitMap)) {
    state
  } else {
    /* let {computeDataFuncMap} = state |> RecordBoxGeometryMainService.getRecord; */
    switch (computeDataFuncMap |> WonderCommonlib.SparseMapService.get(index)) {
    | None => state
    | Some(computeDataFunc) =>
      let {vertices, normals, indices}: geometryComputeData =
        computeDataFunc(index, boxGeometryRecord);
      state
      |> VerticesBoxGeometryMainService.setVertices(index, vertices)
      |> NormalsBoxGeometryMainService.setNormals(index, normals)
      |> IndicesBoxGeometryMainService.setIndices(index, indices)
      |> _markIsInit(index, true)
    }
  }
};

let init = (state: StateDataMainType.state) => {
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
              () =>
                DisposeBoxGeometryMainService.isNotDisposed(
                  state |> RecordBoxGeometryMainService.getRecord
                )
                |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let {index} = state |> RecordBoxGeometryMainService.getRecord;
  ArrayService.range(0, index - 1)
  |> ReduceStateMainService.reduceState(
       [@bs] ((state, geometryIndex: int) => initGeometry(geometryIndex, state)),
       state
     )
};

let handleInitComponent = (index: int, state: StateDataMainType.state) =>
  initGeometry(index, state);