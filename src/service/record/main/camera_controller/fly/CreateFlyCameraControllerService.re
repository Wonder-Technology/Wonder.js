open StateDataMainType;

open IndexComponentService;

open FlyCameraControllerType;

let _setDefaultValue =
    (
      index,
      {moveSpeedMap, wheelSpeedMap, rotateSpeedMap, eulerAngleDiffMap, translationDiffMap} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  moveSpeedMap:
    moveSpeedMap |> WonderCommonlib.MutableSparseMapService.set(index, 1.2),
  wheelSpeedMap:
    wheelSpeedMap |> WonderCommonlib.MutableSparseMapService.set(index, 2.0),
  rotateSpeedMap:
    rotateSpeedMap |> WonderCommonlib.MutableSparseMapService.set(index, 100.),
  eulerAngleDiffMap:
    eulerAngleDiffMap
    |> WonderCommonlib.MutableSparseMapService.set(
         index,
         {diffX: 0., diffY: 0.},
       ),
  translationDiffMap:
    translationDiffMap
    |> WonderCommonlib.MutableSparseMapService.set(index, (0., 0., 0.)),
};

let create =
    (
      {
        index,
        dirtyArray,
        moveSpeedMap,
        wheelSpeedMap,
        rotateSpeedMap,
        gameObjectMap,
        disposedIndexArray,
      } as record: flyCameraControllerRecord,
    ) => {
  let (index, newIndex, disposedIndexArray) =
    generateIndex(index, disposedIndexArray);
  let record = _setDefaultValue(index, record);
  (
    {
      ...record,
      index: newIndex,
      dirtyArray: DirtyArrayService.addToDirtyArray(index, dirtyArray),
      disposedIndexArray,
    },
    index,
  );
};