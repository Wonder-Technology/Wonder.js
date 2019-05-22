open StateDataMainType;

open IndexComponentService;

let _setDefaultValue =
    (
      index,
      {moveSpeedXMap, moveSpeedYMap, rotateSpeedMap} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  moveSpeedXMap:
    moveSpeedXMap |> WonderCommonlib.MutableSparseMapService.set(index, 1.),
  moveSpeedYMap:
    moveSpeedYMap |> WonderCommonlib.MutableSparseMapService.set(index, 1.),
  rotateSpeedMap:
    rotateSpeedMap |> WonderCommonlib.MutableSparseMapService.set(index, 1.),
};

let create =
    (
      {
        index,
        dirtyArray,
        moveSpeedXMap,
        moveSpeedYMap,
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