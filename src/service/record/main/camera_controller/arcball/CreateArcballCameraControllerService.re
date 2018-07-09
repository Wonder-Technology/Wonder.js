open StateDataMainType;

open IndexComponentService;

let _setDefaultValue =
    (
      index,
      {
        distanceMap,
        minDistanceMap,
        phiMap,
        thetaMap,
        thetaMarginMap,
        targetMap,
        moveSpeedXMap,
        moveSpeedYMap,
        rotateSpeedMap,
        wheelSpeedMap,
      } as record,
    ) => {
  ...record,
  distanceMap:
    distanceMap |> WonderCommonlib.SparseMapService.set(index, 10.),
  minDistanceMap:
    minDistanceMap |> WonderCommonlib.SparseMapService.set(index, 0.05),
  phiMap:
    phiMap |> WonderCommonlib.SparseMapService.set(index, Js.Math._PI /. 2.),
  thetaMap:
    thetaMap |> WonderCommonlib.SparseMapService.set(index, Js.Math._PI /. 2.),
  thetaMarginMap:
    thetaMarginMap |> WonderCommonlib.SparseMapService.set(index, 0.05),
  targetMap:
    targetMap |> WonderCommonlib.SparseMapService.set(index, (0., 0., 0.)),
  moveSpeedXMap:
    moveSpeedXMap |> WonderCommonlib.SparseMapService.set(index, 1.),
  moveSpeedYMap:
    moveSpeedYMap |> WonderCommonlib.SparseMapService.set(index, 1.),
  rotateSpeedMap:
    rotateSpeedMap |> WonderCommonlib.SparseMapService.set(index, 1.),
  wheelSpeedMap:
    wheelSpeedMap |> WonderCommonlib.SparseMapService.set(index, 1.),
};

let create =
    (
      {
        index,
        /* pointDragEventHandleFuncMap,
           pointScaleEventHandleFuncMap,
           keydownEventHandleFuncMap, */
        dirtyArray,
        distanceMap,
        minDistanceMap,
        phiMap,
        thetaMap,
        thetaMarginMap,
        targetMap,
        moveSpeedXMap,
        moveSpeedYMap,
        rotateSpeedMap,
        wheelSpeedMap,
        gameObjectMap,
        disposedIndexArray,
      } as record,
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