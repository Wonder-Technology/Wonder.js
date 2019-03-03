open StateDataMainType;

open GeometryType;

open DisposeComponentService;

let isAlive = (geometry, disposedIndexArray) =>
  DisposeComponentService.isAlive(geometry, disposedIndexArray);

let isAliveWithRecord = (geometry, {disposedIndexArray}) =>
  isAlive(geometry, disposedIndexArray);

let _disposeData =
    (
      geometry,
      {
        disposeCount,
        disposedIndexArray,
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
    disposeCount: succ(disposeCount),
    nameMap: nameMap |> disposeSparseMapData(geometry),
  };
};

let handleBatchDisposeComponentData =
  (. geometryDataMap, state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                geometryDataMap
                |> WonderCommonlib.MutableSparseMapService.getValidKeys,
                isAliveWithRecord,
                state |> RecordGeometryMainService.getRecord,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

    let geometryRecord = state |> RecordGeometryMainService.getRecord;
    let (geometryNeedDisposeVboBufferArr, geometryRecord) =
      geometryDataMap
      |> WonderCommonlib.MutableSparseMapService.reduceiValid(
           (.
             (geometryNeedDisposeVboBufferArr, geometryRecord),
             gameObjectArr,
             geometry,
           ) => {
             let geometryRecord =
               GroupGeometryService.batchRemoveGameObjects(
                 gameObjectArr,
                 geometry,
                 geometryRecord,
               );

             GroupGeometryService.isGroupGeometry(geometry, geometryRecord) ?
               (geometryNeedDisposeVboBufferArr, geometryRecord) :
               (
                 geometryNeedDisposeVboBufferArr |> ArrayService.push(geometry),
                 _disposeData(geometry, geometryRecord),
               );
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
        isAliveWithRecord,
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