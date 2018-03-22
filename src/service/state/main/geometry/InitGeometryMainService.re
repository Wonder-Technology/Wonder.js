open MainStateDataType;

open GeometryType;

open BoxGeometryType;

let _isInit = (index: int, isInitMap) =>
  switch (isInitMap |> WonderCommonlib.SparseMapService.get(index)) {
  | None => false
  | Some(bool) => bool
  };

let _markIsInit = (index: int, isInit: bool, state: MainStateDataType.state) => {
  let {isInitMap} = state |> RecordBoxGeometryMainService.getRecord;
  isInitMap |> WonderCommonlib.SparseMapService.set(index, isInit) |> ignore;
  state
};

let initGeometry = (index: int, mappedIndex, state: MainStateDataType.state) => {
  let {isInitMap, computeDataFuncMap} as boxGeometryRecord =
    state |> RecordBoxGeometryMainService.getRecord;
  if (_isInit(index, isInitMap)) {
    state
  } else {
    /* let {computeDataFuncMap} = state |> RecordBoxGeometryMainService.getRecord; */
    switch (computeDataFuncMap |> WonderCommonlib.SparseMapService.get(mappedIndex)) {
    | None => state
    | Some(computeDataFunc) =>
      let {vertices, normals, indices}: geometryComputeData =
        computeDataFunc(mappedIndex, boxGeometryRecord);
      state
      |> VerticesGeometryMainService.setVertices(mappedIndex, vertices)
      |> NormalsGeometryMainService.setNormals(mappedIndex, normals)
      |> IndicesGeometryMainService.setIndices(mappedIndex, indices)
      |> _markIsInit(index, true)
    }
  }
};

let init = (state: MainStateDataType.state) => {
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
                DisposeGeometryMainService.isNotDisposed(
                  state |> RecordBoxGeometryMainService.getRecord
                )
                |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  let {index, mappedIndexMap} = state |> RecordBoxGeometryMainService.getRecord;
  ArrayService.range(0, index - 1)
  |> ReduceStateMainService.reduceState(
       [@bs]
       (
         (state, geometryIndex: int) =>
           initGeometry(
             geometryIndex,
             MappedIndexService.getMappedIndex(geometryIndex, mappedIndexMap),
             state
           )
       ),
       state
     )
};

let handleInitComponent = (index: int, mappedIndex, state: MainStateDataType.state) =>
  initGeometry(index, mappedIndex, state);