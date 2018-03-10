open GeometryType;

open StateDataType;

open GeometryGetStateDataCommon;

open ComponentDisposeComponentCommon;

let isAlive = (geometry: geometry, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(geometry, getGeometryData(state).disposedIndexArray);

let _disposeData = (geometry: geometry, state: StateDataType.state) => {
  let {
        verticesMap,
        normalsMap,
        indicesMap,
        configDataMap,
        isInitMap,
        computeDataFuncMap,
        groupCountMap,
        gameObjectMap
      } as data =
    getGeometryData(state);
  let state =
    VboBufferDisposeSystem.disposeGeometryBufferData(geometry, state)
    |> GeometryTypeArrayPoolCommon.addTypeArrayToPool(
         geometry,
         ConfigMemoryService.getMaxTypeArrayPoolSize(state.memoryConfig),
         (verticesMap, normalsMap, indicesMap)
       );
  {
    ...state,
    geometryData: {
      ...data,
      groupCountMap: groupCountMap |> WonderCommonlib.SparseMapSystem.set(geometry, 0),
      verticesMap: verticesMap |> disposeSparseMapData(geometry),
      normalsMap: normalsMap |> disposeSparseMapData(geometry),
      indicesMap: indicesMap |> disposeSparseMapData(geometry),
      configDataMap: configDataMap |> disposeSparseMapData(geometry),
      isInitMap: isInitMap |> disposeSparseMapData(geometry),
      computeDataFuncMap: computeDataFuncMap |> disposeSparseMapData(geometry),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(geometry)
    }
  }
};

let handleDisposeComponent = (geometry: geometry, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAlive(geometry, isAlive, state)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  let {disposedIndexArray} as data = getGeometryData(state);
  switch (GeometryGroupCommon.isGroupGeometry(geometry, state)) {
  | false =>
    let state = VboBufferSystem.addGeometryBufferToPool(geometry, state) |> _disposeData(geometry);
    {
      ...state,
      geometryData: {
        ...data,
        disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry)
      }
    }
  | true => GeometryGroupCommon.decreaseGroupCount(geometry, state)
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      geometryArray: array(geometry),
      isGameObjectDisposedMap: array(bool),
      state: StateDataType.state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                ComponentDisposeComponentCommon.checkComponentShouldAliveWithBatchDispose(
                  geometryArray,
                  isAlive,
                  state
                )
              )
            )
          ),
        StateData.stateData.isDebug
      );
      let {disposedIndexArray} as data = getGeometryData(state);
      geometryArray
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, geometry) =>
               switch (GeometryGroupCommon.isGroupGeometry(geometry, state)) {
               | false =>
                 let state =
                   VboBufferSystem.addGeometryBufferToPool(geometry, state)
                   |> _disposeData(geometry);
                 {
                   ...state,
                   geometryData: {
                     ...getGeometryData(state),
                     disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry)
                   }
                 }
               | true => GeometryGroupCommon.decreaseGroupCount(geometry, state)
               }
           ),
           state
         )
    }
  );

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length == 0;