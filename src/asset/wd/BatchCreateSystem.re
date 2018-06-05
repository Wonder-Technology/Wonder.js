open StateDataMainType;

open WDType;

let _checkNotExceedMaxCountByIndex = (maxCount, indexArr) => {
  Array.unsafe_get(indexArr, (indexArr |> Js.Array.length) - 1)
  |> BufferService.checkNotExceedMaxCountByIndex(maxCount)
  |> ignore;
  indexArr;
};

let _checkNotDisposedBefore = disposedIndexArray =>
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not disposed before|j},
                ~actual={j|do|j},
              ),
              () =>
              disposedIndexArray |> Js.Array.length == 0
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

let _batchCreateGameObject = ({gameObjects}, {gameObjectRecord} as state) => {
  let {count}: gameObjects = gameObjects;
  let {uid, aliveUidArray}: GameObjectType.gameObjectRecord = gameObjectRecord;
  let uidArr = ArrayService.range(uid, uid + count - 1);
  (
    {
      ...state,
      gameObjectRecord: {
        ...gameObjectRecord,
        uid: uid + count,
        aliveUidArray: aliveUidArray |> Js.Array.concat(uidArr),
      },
    },
    uidArr,
  );
};

let _setDefaultChildren = (indexArr, childMap) =>
  indexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. childMap, index) =>
         WonderCommonlib.SparseMapService.set(
           index,
           WonderCommonlib.ArrayService.createEmpty(),
           childMap,
         ),
       childMap,
     );

let _initTransformDataWhenCreate =
    (
      indexArr,
      (
        {
          childMap,
          localToWorldMatrices,
          localPositions,
          defaultLocalToWorldMatrix,
          defaultLocalPosition,
        }: TransformType.transformRecord
      ) as transformRecord,
    ) => {
  ...transformRecord,
  childMap: childMap |> _setDefaultChildren(indexArr),
};

let _batchCreateTransform = ({transforms}, {settingRecord} as state) => {
  _checkNotDisposedBefore(
    RecordTransformMainService.getRecord(state).disposedIndexArray,
  );
  let ({index, disposedIndexArray}: TransformType.transformRecord) as transformRecord =
    RecordTransformMainService.getRecord(state);
  let newIndex = index + (transforms |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(
         BufferSettingService.getTransformCount(settingRecord),
       );
  transformRecord.index = newIndex;
  let transformRecord =
    _initTransformDataWhenCreate(indexArr, transformRecord);
  state.transformRecord =
    Some(
      indexArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. transformRecord, index) =>
             transformRecord |> DirtyTransformService.mark(index, true),
           transformRecord,
         ),
    );
  (state, indexArr);
};

let _batchCreateCustomGeometry =
    ({customGeometrys}, {settingRecord} as state) => {
  _checkNotDisposedBefore(
    RecordCustomGeometryMainService.getRecord(state).disposedIndexArray,
  );
  let ({index, aliveIndexArray}: CustomGeometryType.customGeometryRecord) as customGeometryRecord =
    RecordCustomGeometryMainService.getRecord(state);
  let newIndex = index + (customGeometrys |> Js.Array.length);
  let indexArr =
    ArrayService.range(index, newIndex - 1)
    |> _checkNotExceedMaxCountByIndex(
         BufferSettingService.getCustomGeometryCount(settingRecord),
       );
  state.customGeometryRecord =
    Some({
      ...customGeometryRecord,
      index: newIndex,
      aliveIndexArray: aliveIndexArray |> Js.Array.concat(indexArr),
    });
  (state, indexArr);
};

let batchCreate = (wdRecord, state) => {
  let (state, gameObjectArr) = _batchCreateGameObject(wdRecord, state);
  let (state, transformArr) = _batchCreateTransform(wdRecord, state);
  let (state, customGeometryArr) =
    _batchCreateCustomGeometry(wdRecord, state);
  (state, gameObjectArr, (transformArr, customGeometryArr));
};