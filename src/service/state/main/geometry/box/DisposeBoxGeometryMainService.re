open BoxGeometryType;

open GeometryType;

open StateDataMainType;

open DisposeComponentService;

let isAlive = (geometry, {disposedIndexArray}: boxGeometryRecord) =>
  DisposeComponentService.isAlive(geometry, disposedIndexArray);

let _disposeData =
    (
      geometry,
      {disposedIndexArray, gameObjectMap, groupCountMap} as boxGeometryRecord,
    ) => {
  ...boxGeometryRecord,
  disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry),
  gameObjectMap: gameObjectMap |> disposeSparseMapData(geometry),
  groupCountMap: groupCountMap |> disposeSparseMapData(geometry),
};

let handleBatchDisposeComponent =
  (. geometryArray: array(geometry), state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                geometryArray,
                isAlive,
                state |> RecordBoxGeometryMainService.getRecord,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    let boxGeometryRecord = state |> RecordBoxGeometryMainService.getRecord;
    /* let geometryNeedDisposeVboBufferArr = [||]; */
    let (geometryNeedDisposeVboBufferArr, boxGeometryRecord) =
      geometryArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. (geometryNeedDisposeVboBufferArr, boxGeometryRecord), geometry) =>
             switch (
               GroupBoxGeometryService.isGroupGeometry(
                 geometry,
                 boxGeometryRecord,
               )
             ) {
             | false => (
                 geometryNeedDisposeVboBufferArr
                 |> ArrayService.push(geometry),
                 _disposeData(geometry, boxGeometryRecord),
               )
             | true => (
                 geometryNeedDisposeVboBufferArr,
                 GroupBoxGeometryService.decreaseGroupCount(
                   geometry,
                   boxGeometryRecord,
                 ),
               )
             },
           ([||], boxGeometryRecord),
         );
    ({...state, boxGeometryRecord}, geometryNeedDisposeVboBufferArr);
  };