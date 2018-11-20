open StateDataMainType;

open TransformType;

open Js.Typed_array;

open BufferTransformService;

open OperateTypeArrayTransformService;

let getRecord = ({transformRecord}) =>
  transformRecord |> OptionService.unsafeGet;

/* let setAllTypeArrDataToDefault =
       (
         count: int,
         (
           defaultLocalToWorldMatrix,
           defaultLocalPosition,
           defaultLocalRotation,
           defaultLocalScale,
         ),
         (
           localToWorldMatrices,
           localPositions,
           localRotations,
           localScales,
           copiedLocalToWorldMatricesForRestore,
           copiedLocalPositionsForRestore,
           copiedLocalRotationsForRestore,
           copiedLocalScalesForRestore,
         ),
       ) =>
     WonderCommonlib.ArrayService.range(0, count - 1)
     |> WonderCommonlib.ArrayService.reduceOneParam(
          (.
            (
              localToWorldMatrices,
              localPositions,
              localRotations,
              localScales,
              copiedLocalToWorldMatricesForRestore,
              copiedLocalPositionsForRestore,
              copiedLocalRotationsForRestore,
              copiedLocalScalesForRestore,
            ),
            index,
          ) => (
            setLocalToWorldMatrix(
              index,
              defaultLocalToWorldMatrix,
              localToWorldMatrices,
            ),
            setLocalPosition(index, defaultLocalPosition, localPositions),
            setLocalRotation(index, defaultLocalRotation, localRotations),
            setLocalScale(index, defaultLocalScale, localScales),
            setLocalToWorldMatrix(
              index,
              defaultLocalToWorldMatrix,
              copiedLocalToWorldMatricesForRestore,
            ),
            setLocalPosition(
              index,
              defaultLocalPosition,
              copiedLocalPositionsForRestore,
            ),
            setLocalRotation(
              index,
              defaultLocalRotation,
              copiedLocalRotationsForRestore,
            ),
            setLocalScale(index, defaultLocalScale, copiedLocalScalesForRestore),
          ),
          (
            localToWorldMatrices,
            localPositions,
            localRotations,
            localScales,
            copiedLocalToWorldMatricesForRestore,
            copiedLocalPositionsForRestore,
            copiedLocalRotationsForRestore,
            copiedLocalScalesForRestore,
          ),
        );

   let _setAllTypeArrDataToDefault =
       (
         count: int,
         defaultDataTuple,
         (
           buffer,
           localToWorldMatrices,
           localPositions,
           localRotations,
           localScales,
           copiedLocalToWorldMatricesForRestore,
           copiedLocalPositionsForRestore,
           copiedLocalRotationsForRestore,
           copiedLocalScalesForRestore,
         ),
       ) => (
     buffer,
     setAllTypeArrDataToDefault(
       count,
       defaultDataTuple,
       (
         localToWorldMatrices,
         localPositions,
         localRotations,
         localScales,
         copiedLocalToWorldMatricesForRestore,
         copiedLocalPositionsForRestore,
         copiedLocalRotationsForRestore,
         copiedLocalScalesForRestore,
       ),
     ),
   ); */

let setAllTypeArrDataToDefault =
    (
      count: int,
      (
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        defaultLocalRotation,
        defaultLocalScale,
      ),
      (localToWorldMatrices, localPositions, localRotations, localScales),
    ) =>
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (localToWorldMatrices, localPositions, localRotations, localScales),
         index,
       ) => (
         setLocalToWorldMatrix(
           index,
           defaultLocalToWorldMatrix,
           localToWorldMatrices,
         ),
         setLocalPosition(index, defaultLocalPosition, localPositions),
         setLocalRotation(index, defaultLocalRotation, localRotations),
         setLocalScale(index, defaultLocalScale, localScales),
       ),
       (localToWorldMatrices, localPositions, localRotations, localScales),
     );

let _setAllTypeArrDataToDefault =
    (
      count: int,
      defaultDataTuple,
      (
        buffer,
        localToWorldMatrices,
        localPositions,
        localRotations,
        localScales,
      ),
    ) => (
  buffer,
  setAllTypeArrDataToDefault(
    count,
    defaultDataTuple,
    (localToWorldMatrices, localPositions, localRotations, localScales),
  ),
);

let _initBufferData = (count, defaultDataTuple) => {
  let buffer = createBuffer(count);
  let (
    localToWorldMatrices,
    localPositions,
    localRotations,
    localScales,
    copiedLocalToWorldMatricesForRestore,
    copiedLocalPositionsForRestore,
    copiedLocalRotationsForRestore,
    copiedLocalScalesForRestore,
  ) =
    CreateTypeArrayTransformService.createTypeArrays(buffer, count);

  (
    (buffer, localToWorldMatrices, localPositions, localRotations, localScales)
    |> _setAllTypeArrDataToDefault(count, defaultDataTuple),
    copiedLocalToWorldMatricesForRestore,
    copiedLocalPositionsForRestore,
    copiedLocalRotationsForRestore,
    copiedLocalScalesForRestore,
  );
};

let _initCopiedBufferData = (count, defaultDataTuple) => {
  let buffer = createCopiedBuffer(count);
  let (localToWorldMatrices, localPositions, localRotations, localScales) =
    CreateTypeArrayTransformService.createTypeArraysForCopiedBuffer(
      buffer,
      count,
    );

  (buffer, localToWorldMatrices, localPositions, localRotations, localScales)
  |> _setAllTypeArrDataToDefault(count, defaultDataTuple);
};

let _createForWorker =
    (
      transformCount,
      (
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        defaultLocalRotation,
        defaultLocalScale,
      ) as defaultDataTuple,
      (
        buffer,
        localToWorldMatrices,
        localPositions,
        localRotations,
        localScales,
        copiedLocalToWorldMatricesForRestore,
        copiedLocalPositionsForRestore,
        copiedLocalRotationsForRestore,
        copiedLocalScalesForRestore,
      ),
      state,
    ) => {
  let (
    copiedBuffer,
    (
      copiedLocalToWorldMatrices,
      copiedLocalPositions,
      copiedLocalRotations,
      copiedLocalScales,
    ),
  ) =
    _initCopiedBufferData(transformCount, defaultDataTuple);
  state.transformRecord =
    Some({
      index: 0,
      buffer,
      localToWorldMatrices,
      localPositions,
      localRotations,
      localScales,
      copiedLocalToWorldMatricesForRestore,
      copiedLocalPositionsForRestore,
      copiedLocalRotationsForRestore,
      copiedLocalScalesForRestore,
      copiedBuffer: Some(copiedBuffer),
      copiedLocalToWorldMatrices: Some(copiedLocalToWorldMatrices),
      copiedLocalPositions: Some(copiedLocalPositions),
      copiedLocalRotations: Some(copiedLocalRotations),
      copiedLocalScales: Some(copiedLocalScales),
      defaultLocalToWorldMatrix,
      defaultLocalPosition,
      defaultLocalRotation,
      defaultLocalScale,
      parentMap: WonderCommonlib.SparseMapService.createEmpty(),
      childMap: WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      dirtyMap: WonderCommonlib.SparseMapService.createEmpty(),
      localToWorldMatrixCacheMap:
        WonderCommonlib.SparseMapService.createEmpty(),
      normalMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      isParentMapDirtyForDeepCopy: true,
      isChildMapForDeepCopy: true,
      isGameObjectMapForDeepCopy: true,
      isDirtyMapForDeepCopy: true,
    });
  state;
};

let _createForNoWorker =
    (
      (
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        defaultLocalRotation,
        defaultLocalScale,
      ),
      (
        buffer,
        localToWorldMatrices,
        localPositions,
        localRotations,
        localScales,
        copiedLocalToWorldMatricesForRestore,
        copiedLocalPositionsForRestore,
        copiedLocalRotationsForRestore,
        copiedLocalScalesForRestore,
      ),
      state,
    ) => {
  state.transformRecord =
    Some({
      index: 0,
      buffer,
      localToWorldMatrices,
      localPositions,
      localRotations,
      localScales,
      copiedLocalToWorldMatricesForRestore,
      copiedLocalPositionsForRestore,
      copiedLocalRotationsForRestore,
      copiedLocalScalesForRestore,
      copiedBuffer: None,
      copiedLocalToWorldMatrices: None,
      copiedLocalPositions: None,
      copiedLocalRotations: None,
      copiedLocalScales: None,
      defaultLocalToWorldMatrix,
      defaultLocalPosition,
      defaultLocalRotation,
      defaultLocalScale,
      parentMap: WonderCommonlib.SparseMapService.createEmpty(),
      childMap: WonderCommonlib.SparseMapService.createEmpty(),
      gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
      dirtyMap: WonderCommonlib.SparseMapService.createEmpty(),
      localToWorldMatrixCacheMap:
        WonderCommonlib.SparseMapService.createEmpty(),
      normalMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      isParentMapDirtyForDeepCopy: true,
      isChildMapForDeepCopy: true,
      isGameObjectMapForDeepCopy: true,
      isDirtyMapForDeepCopy: true,
    });
  state;
};

let create = ({settingRecord} as state) => {
  let transformCount = BufferSettingService.getTransformCount(settingRecord);
  let defaultLocalToWorldMatrix = [|
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
  |];
  let defaultLocalPosition = [|0., 0., 0.|];
  let defaultLocalRotation = [|0., 0., 0., 1.|];
  let defaultLocalScale = [|1., 1., 1.|];
  let defaultDataTuple = (
    defaultLocalToWorldMatrix,
    defaultLocalPosition,
    defaultLocalRotation,
    defaultLocalScale,
  );

  let (
    (
      buffer,
      (localToWorldMatrices, localPositions, localRotations, localScales),
    ),
    copiedLocalToWorldMatricesForRestore,
    copiedLocalPositionsForRestore,
    copiedLocalRotationsForRestore,
    copiedLocalScalesForRestore,
  ) =
    _initBufferData(transformCount, defaultDataTuple);

  /* TODO use conditional compile */
  WorkerDetectMainService.isUseWorker(state) ?
    _createForWorker(
      transformCount,
      defaultDataTuple,
      (
        buffer,
        localToWorldMatrices,
        localPositions,
        localRotations,
        localScales,
        copiedLocalToWorldMatricesForRestore,
        copiedLocalPositionsForRestore,
        copiedLocalRotationsForRestore,
        copiedLocalScalesForRestore,
      ),
      state,
    ) :
    _createForNoWorker(
      defaultDataTuple,
      (
        buffer,
        localToWorldMatrices,
        localPositions,
        localRotations,
        localScales,
        copiedLocalToWorldMatricesForRestore,
        copiedLocalPositionsForRestore,
        copiedLocalRotationsForRestore,
        copiedLocalScalesForRestore,
      ),
      state,
    );
};

let _fillToCopiedData = (sourceData, copiedData, endIndex) => {
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (copiedData, 0),
    (sourceData, 0),
    endIndex,
  )
  |> ignore;

  copiedData;
};

let getLocalPositionsEndIndex = index => index * getLocalPositionsSize();

let getLocalRotationsEndIndex = index => index * getLocalRotationsSize();

let getLocalScalesEndIndex = index => index * getLocalScalesSize();

let getLocalToWorldMatricesEndIndex = index =>
  index * getLocalToWorldMatricesSize();

let markAllDirtyForRestore = (isDirty, record) => {
  record.isParentMapDirtyForDeepCopy = isDirty;
  record.isChildMapForDeepCopy = isDirty;
  record.isGameObjectMapForDeepCopy = isDirty;
  record.isDirtyMapForDeepCopy = isDirty;

  record;
};

let _markSourceRecordNotDirty = sourceRecord =>
  markAllDirtyForRestore(false, sourceRecord) |> ignore;

let deepCopyForRestore = state => {
  let {
        index,
        localPositions,
        localRotations,
        localScales,
        localToWorldMatrices,
        copiedLocalToWorldMatricesForRestore,
        copiedLocalPositionsForRestore,
        copiedLocalRotationsForRestore,
        copiedLocalScalesForRestore,
        localToWorldMatrixCacheMap,
        normalMatrixCacheMap,
        parentMap,
        childMap,
        dirtyMap,
        gameObjectMap,
        disposedIndexArray,
        isParentMapDirtyForDeepCopy,
        isChildMapForDeepCopy,
        isGameObjectMapForDeepCopy,
        isDirtyMapForDeepCopy,
      } as record =
    state |> getRecord;

  _markSourceRecordNotDirty(record);

  {
    ...state,
    transformRecord:
      Some(
        {
          ...record,
          copiedLocalToWorldMatricesForRestore:
            _fillToCopiedData(
              localToWorldMatrices,
              copiedLocalToWorldMatricesForRestore,
              getLocalToWorldMatricesEndIndex(index),
            ),
          copiedLocalPositionsForRestore:
            _fillToCopiedData(
              localPositions,
              copiedLocalPositionsForRestore,
              getLocalPositionsEndIndex(index),
            ),
          copiedLocalRotationsForRestore:
            _fillToCopiedData(
              localRotations,
              copiedLocalRotationsForRestore,
              getLocalRotationsEndIndex(index),
            ),
          copiedLocalScalesForRestore:
            _fillToCopiedData(
              localScales,
              copiedLocalScalesForRestore,
              getLocalScalesEndIndex(index),
            ),
          localToWorldMatrixCacheMap:
            WonderCommonlib.SparseMapService.createEmpty(),
          normalMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
          parentMap:
            isParentMapDirtyForDeepCopy ?
              parentMap |> SparseMapService.copy : parentMap,
          childMap:
            isChildMapForDeepCopy ?
              childMap |> CopyTypeArrayService.deepCopyArrayArray : childMap,
          dirtyMap:
            isDirtyMapForDeepCopy ?
              dirtyMap |> SparseMapService.copy : dirtyMap,
          gameObjectMap:
            isGameObjectMapForDeepCopy ?
              gameObjectMap |> SparseMapService.copy : gameObjectMap,
          disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        }
        |> markAllDirtyForRestore(false),
      ),
  };
};