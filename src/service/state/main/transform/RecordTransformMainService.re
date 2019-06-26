open StateDataMainType;

open TransformType;

open Js.Typed_array;

open BufferTransformService;

open OperateTypeArrayTransformService;

let getRecord = ({transformRecord}) =>
  transformRecord |> OptionService.unsafeGet;

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
  let (localToWorldMatrices, localPositions, localRotations, localScales) =
    CreateTypeArrayAllTransformService.createTypeArrays(buffer, count);
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
    _initBufferData(transformCount, defaultDataTuple);
  state.transformRecord =
    Some({
      index: 0,
      buffer,
      localToWorldMatrices,
      localPositions,
      localRotations,
      localScales,
      copiedBuffer: Some(copiedBuffer),
      copiedLocalToWorldMatrices: Some(copiedLocalToWorldMatrices),
      copiedLocalPositions: Some(copiedLocalPositions),
      copiedLocalRotations: Some(copiedLocalRotations),
      copiedLocalScales: Some(copiedLocalScales),
      defaultLocalToWorldMatrix,
      defaultLocalPosition,
      defaultLocalRotation,
      defaultLocalScale,
      parentMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      childMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      dirtyMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      localToWorldMatrixCacheMap:
        WonderCommonlib.MutableSparseMapService.createEmpty(),
      normalMatrixCacheMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
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
      copiedBuffer: None,
      copiedLocalToWorldMatrices: None,
      copiedLocalPositions: None,
      copiedLocalRotations: None,
      copiedLocalScales: None,
      defaultLocalToWorldMatrix,
      defaultLocalPosition,
      defaultLocalRotation,
      defaultLocalScale,
      parentMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      childMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      dirtyMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      localToWorldMatrixCacheMap:
        WonderCommonlib.MutableSparseMapService.createEmpty(),
      normalMatrixCacheMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
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
    buffer,
    (localToWorldMatrices, localPositions, localRotations, localScales),
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
      ),
      state,
    );
};

let deepCopyForRestore = state => {
  let {
        index,
        localPositions,
        localRotations,
        localScales,
        localToWorldMatrices,
        localToWorldMatrixCacheMap,
        normalMatrixCacheMap,
        parentMap,
        childMap,
        dirtyMap,
        gameObjectMap,
        disposedIndexArray,
      } as record =
    state |> getRecord;
  {
    ...state,
    transformRecord:
      Some({
        ...record,
        localPositions:
          localPositions
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getLocalPositionsSize(),
             ),
        localRotations:
          localRotations
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getLocalRotationsSize(),
             ),
        localScales:
          localScales
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getLocalScalesSize(),
             ),
        localToWorldMatrices:
          localToWorldMatrices
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getLocalToWorldMatricesSize(),
             ),
        localToWorldMatrixCacheMap:
          WonderCommonlib.MutableSparseMapService.createEmpty(),
        normalMatrixCacheMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
        parentMap: parentMap |> WonderCommonlib.MutableSparseMapService.copy,
        childMap: childMap |> CopyTypeArrayService.deepCopyMutableSparseMapOfArray,
        dirtyMap: dirtyMap |> WonderCommonlib.MutableSparseMapService.copy,
        gameObjectMap: gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
      }),
  };
};