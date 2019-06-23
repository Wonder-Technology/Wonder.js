open StateDataMainType;

let create = () => {
  index: 0,
  pointDragStartEventHandleFuncListMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  pointDragDropEventHandleFuncListMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  pointDragOverEventHandleFuncListMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  pointScaleEventHandleFuncListMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  keydownEventHandleFuncListMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  dirtyArray: WonderCommonlib.ArrayService.createEmpty(),
  distanceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  minDistanceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  phiMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  thetaMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  thetaMarginMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  targetMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  moveSpeedXMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  moveSpeedYMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  rotateSpeedMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  wheelSpeedMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
  directionArrayMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
};

let deepCopyForRestore =
    (
      {
        index,
        pointDragStartEventHandleFuncListMap,
        pointDragDropEventHandleFuncListMap,
        pointDragOverEventHandleFuncListMap,
        pointScaleEventHandleFuncListMap,
        keydownEventHandleFuncListMap,
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
        directionArrayMap,
        disposedIndexArray,
      },
    ) => {
  index,
  pointDragStartEventHandleFuncListMap:
    pointDragStartEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  pointDragDropEventHandleFuncListMap:
    pointDragDropEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  pointDragOverEventHandleFuncListMap:
    pointDragOverEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  pointScaleEventHandleFuncListMap:
    pointScaleEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  keydownEventHandleFuncListMap:
    keydownEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  dirtyArray: dirtyArray |> Js.Array.copy,
  distanceMap: distanceMap |> WonderCommonlib.MutableSparseMapService.copy,
  minDistanceMap:
    minDistanceMap |> WonderCommonlib.MutableSparseMapService.copy,
  phiMap: phiMap |> WonderCommonlib.MutableSparseMapService.copy,
  thetaMap: thetaMap |> WonderCommonlib.MutableSparseMapService.copy,
  thetaMarginMap:
    thetaMarginMap |> WonderCommonlib.MutableSparseMapService.copy,
  targetMap: targetMap |> WonderCommonlib.MutableSparseMapService.copy,
  moveSpeedXMap: moveSpeedXMap |> WonderCommonlib.MutableSparseMapService.copy,
  moveSpeedYMap: moveSpeedYMap |> WonderCommonlib.MutableSparseMapService.copy,
  rotateSpeedMap:
    rotateSpeedMap |> WonderCommonlib.MutableSparseMapService.copy,
  wheelSpeedMap: wheelSpeedMap |> WonderCommonlib.MutableSparseMapService.copy,
  gameObjectMap: gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
  directionArrayMap:
    directionArrayMap |> WonderCommonlib.MutableSparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy,
};