open StateDataMainType;

open IndexComponentService;

open FlyCameraControllerType;

let _setDefaultValue =
    (
      index,
      {moveSpeedXMap, moveSpeedYMap, rotateSpeedMap, rotationMap} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  moveSpeedXMap:
    moveSpeedXMap |> WonderCommonlib.MutableSparseMapService.set(index, 1.2),
  moveSpeedYMap:
    moveSpeedYMap |> WonderCommonlib.MutableSparseMapService.set(index, 1.2),
  rotateSpeedMap:
    rotateSpeedMap |> WonderCommonlib.MutableSparseMapService.set(index, 100.),
  rotationMap:
    rotationMap
    |> WonderCommonlib.MutableSparseMapService.set(
         index,
         {rotationX: 0., rotationY: 0.},
       ),
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