open GeometryType;

open StateDataType;

open GeometryGetStateDataCommon;

open Contract;

open ComponentDisposeComponentCommon;

let isAlive = (geometry: geometry, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(geometry, getGeometryData(state).disposedIndexArray);

let _disposeData = (geometry: geometry, state: StateDataType.state) => {
  let {
    verticesMap,
    indicesMap,
    configDataMap,
    isInitMap,
    computeDataFuncMap,
    groupCountMap,
    gameObjectMap
  } =
    getGeometryData(state);
  let state =
    VboBufferDisposeSystem.disposeGeometryBufferData(geometry, state)
    |> GeometryTypeArrayPoolCommon.addTypeArrayToPool(
         geometry,
         MemoryConfigSystem.getMaxTypeArrayPoolSize(state),
         (verticesMap, indicesMap)
       );
  groupCountMap |> WonderCommonlib.SparseMapSystem.set(geometry, 0) |> ignore;
  disposeSparseMapData(geometry, verticesMap) |> ignore;
  disposeSparseMapData(geometry, indicesMap) |> ignore;
  disposeSparseMapData(geometry, configDataMap) |> ignore;
  disposeSparseMapData(geometry, isInitMap) |> ignore;
  disposeSparseMapData(geometry, computeDataFuncMap) |> ignore;
  disposeSparseMapData(geometry, groupCountMap) |> ignore;
  disposeSparseMapData(geometry, gameObjectMap) |> ignore;
  state
};

let handleDisposeComponent = (geometry: geometry, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentCommon.checkComponentShouldAlive(geometry, isAlive, state)
      )
  );
  let {disposedIndexArray} = getGeometryData(state);
  switch (GeometryGroupCommon.isGroupGeometry(geometry, state)) {
  | false =>
    let state = VboBufferSystem.addGeometryBufferToPool(geometry, state) |> _disposeData(geometry);
    disposedIndexArray |> Js.Array.push(geometry) |> ignore;
    state
  | true => GeometryGroupCommon.decreaseGroupCount(geometry, state)
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (geometryArray: array(geometry), gameObjectUidMap: array(bool), state: StateDataType.state) => {
      requireCheck(
        () =>
          Contract.Operators.(
            geometryArray
            |> WonderCommonlib.ArraySystem.forEach(
                 [@bs]
                 (
                   (geometry) =>
                     ComponentDisposeComponentCommon.checkComponentShouldAlive(
                       geometry,
                       isAlive,
                       state
                     )
                 )
               )
          )
      );
      let {disposedIndexArray} as data = getGeometryData(state);
      geometryArray
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, geometry) =>
               switch (GeometryGroupCommon.isGroupGeometry(geometry, state)) {
               | false =>
                 disposedIndexArray |> Js.Array.push(geometry) |> ignore;
                 VboBufferSystem.addGeometryBufferToPool(geometry, state) |> _disposeData(geometry)
               | true => GeometryGroupCommon.decreaseGroupCount(geometry, state)
               }
           ),
           state
         )
    }
  );

let isNotDisposed = ({disposedIndexArray}) => disposedIndexArray |> Js.Array.length == 0;