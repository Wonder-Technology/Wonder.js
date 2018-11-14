open StateDataMainType;

open GeometryType;

open DisposeComponentService;

let isAlive = (geometry, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(geometry, disposedIndexArray);

let _disposeData =
    (
      geometry,
      {
        disposeCount,
        disposedIndexArray,
        disposedIndexMap,
        nameMap,
        verticesInfos,
        texCoordsInfos,
        normalsInfos,
        indicesInfos,
      } as geometryRecord,
    ) => {
  let infoIndex = BufferGeometryService.getInfoIndex(geometry);

  {
    ...geometryRecord,
    verticesInfos:
      ReallocatedPointsGeometryService.setInfo(
        infoIndex,
        0,
        0,
        verticesInfos,
      ),
    texCoordsInfos:
      ReallocatedPointsGeometryService.setInfo(
        infoIndex,
        0,
        0,
        texCoordsInfos,
      ),
    normalsInfos:
      ReallocatedPointsGeometryService.setInfo(infoIndex, 0, 0, normalsInfos),
    indicesInfos:
      ReallocatedPointsGeometryService.setInfo(infoIndex, 0, 0, indicesInfos),
    disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry),
    disposedIndexMap:
      disposedIndexMap |> WonderCommonlib.SparseMapService.set(geometry, true),
    disposeCount: succ(disposeCount),
    nameMap: nameMap |> disposeSparseMapData(geometry),
  };
};

let _disposeDataWithGameObject =
    (
      gameObject,
      geometry,
      {
        disposeCount,
        disposedIndexArray,
        disposedIndexMap,
        gameObjectsMap,
        nameMap,
      } as geometryRecord,
    ) => {
  let geometryRecord = _disposeData(geometry, geometryRecord);

  {
    ...geometryRecord,
    gameObjectsMap:
      GameObjectsMapService.removeGameObject(
        gameObject,
        geometry,
        gameObjectsMap,
      ),
  };
};

let handleBatchDisposeComponentData =
  (. geometryDataArray, state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                geometryDataArray
                |> Js.Array.map(((_, geometry)) => geometry),
                isAlive,
                state |> RecordGeometryMainService.getRecord,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    let geometryRecord = state |> RecordGeometryMainService.getRecord;
    let (geometryNeedDisposeVboBufferArr, geometryRecord) =
      geometryDataArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (geometryNeedDisposeVboBufferArr, geometryRecord),
             (gameObject, geometry),
           ) =>
             switch (
               GroupGeometryService.isGroupGeometry(geometry, geometryRecord)
             ) {
             | false => (
                 geometryNeedDisposeVboBufferArr
                 |> ArrayService.push(geometry),
                 _disposeDataWithGameObject(
                   gameObject,
                   geometry,
                   geometryRecord,
                 ),
               )
             | true => (
                 geometryNeedDisposeVboBufferArr,
                 GroupGeometryService.removeGameObject(
                   gameObject,
                   geometry,
                   geometryRecord,
                 ),
               )
             },
           ([||], geometryRecord),
         );
    (
      {...state, geometryRecord: Some(geometryRecord)},
      geometryNeedDisposeVboBufferArr,
    );
  };

let handleBatchDisposeComponent = (geometryHasNoGameObjectArray, state) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
        geometryHasNoGameObjectArray,
        isAlive,
        state |> RecordGeometryMainService.getRecord,
      );
      test(
        Log.buildAssertMessage(
          ~expect={j|geometry has no gameObject|j},
          ~actual={j|has|j},
        ),
        () => {
          let geometryRecord = state |> RecordGeometryMainService.getRecord;

          geometryHasNoGameObjectArray
          |> Js.Array.filter(geometry =>
               GameObjectGeometryService.getGameObjects(
                 geometry,
                 geometryRecord,
               )
               |> Js.Option.isSome
             )
          |> Js.Array.length == 0;
        },
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let geometryRecord = state |> RecordGeometryMainService.getRecord;
  let (geometryNeedDisposeVboBufferArr, geometryRecord) =
    geometryHasNoGameObjectArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (geometryNeedDisposeVboBufferArr, geometryRecord),
           geometryHasNoGameObject,
         ) => (
           geometryNeedDisposeVboBufferArr
           |> ArrayService.push(geometryHasNoGameObject),
           _disposeData(geometryHasNoGameObject, geometryRecord),
         ),
         ([||], geometryRecord),
       );

  {
    ...state,
    geometryRecord: Some(geometryRecord),
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeGeometryVboBuffer(
           geometryNeedDisposeVboBufferArr,
         ),
  };
};

let isNotDisposed = ({disposedIndexArray}) =>
  disposedIndexArray |> Js.Array.length === 0;