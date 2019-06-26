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
        directionArrayMap,
      } as record,
    ) => {
  ...record,
  distanceMap:
    distanceMap |> WonderCommonlib.MutableSparseMapService.set(index, 10.),
  minDistanceMap:
    minDistanceMap |> WonderCommonlib.MutableSparseMapService.set(index, 0.05),
  phiMap:
    phiMap
    |> WonderCommonlib.MutableSparseMapService.set(index, Js.Math._PI /. 2.),
  thetaMap:
    thetaMap
    |> WonderCommonlib.MutableSparseMapService.set(index, Js.Math._PI /. 2.),
  thetaMarginMap:
    thetaMarginMap |> WonderCommonlib.MutableSparseMapService.set(index, 0.05),
  targetMap:
    targetMap
    |> WonderCommonlib.MutableSparseMapService.set(index, (0., 0., 0.)),
  moveSpeedXMap:
    moveSpeedXMap |> WonderCommonlib.MutableSparseMapService.set(index, 1.),
  moveSpeedYMap:
    moveSpeedYMap |> WonderCommonlib.MutableSparseMapService.set(index, 1.),
  rotateSpeedMap:
    rotateSpeedMap |> WonderCommonlib.MutableSparseMapService.set(index, 1.),
  wheelSpeedMap:
    wheelSpeedMap |> WonderCommonlib.MutableSparseMapService.set(index, 1.),
  directionArrayMap:
    directionArrayMap |> WonderCommonlib.MutableSparseMapService.set(index, [||]),
};

let create =
    (
      {
        index,
        /* pointDragOverEventHandleFuncMap,
           pointScaleEventHandleFuncMap,
           keydownEventHandleFuncMap, */
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
  ({...record, index: newIndex, disposedIndexArray}, index);
};