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
  keyupEventHandleFuncListMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  keydownEventHandleFuncListMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  moveSpeedMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  wheelSpeedMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  rotateSpeedMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  eulerAngleDiffMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  translationDiffMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  directionArrayMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
  localEulerAngleMapX: WonderCommonlib.MutableSparseMapService.createEmpty(),
  localEulerAngleMapY: WonderCommonlib.MutableSparseMapService.createEmpty(),
  localEulerAngleMapZ: WonderCommonlib.MutableSparseMapService.createEmpty(),
};

let deepCopyForRestore =
    (
      {
        index,
        pointDragStartEventHandleFuncListMap,
        pointDragDropEventHandleFuncListMap,
        pointDragOverEventHandleFuncListMap,
        pointScaleEventHandleFuncListMap,
        keyupEventHandleFuncListMap,
        keydownEventHandleFuncListMap,
        moveSpeedMap,
        wheelSpeedMap,
        rotateSpeedMap,
        eulerAngleDiffMap,
        translationDiffMap,
        gameObjectMap,
        disposedIndexArray,
        directionArrayMap,
        localEulerAngleMapX,
        localEulerAngleMapY,
        localEulerAngleMapZ,
      }: flyCameraControllerRecord,
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
  keyupEventHandleFuncListMap:
    keyupEventHandleFuncListMap |> WonderCommonlib.MutableSparseMapService.copy,
  moveSpeedMap: moveSpeedMap |> WonderCommonlib.MutableSparseMapService.copy,
  wheelSpeedMap: wheelSpeedMap |> WonderCommonlib.MutableSparseMapService.copy,
  rotateSpeedMap:
    rotateSpeedMap |> WonderCommonlib.MutableSparseMapService.copy,
  eulerAngleDiffMap:
    eulerAngleDiffMap |> WonderCommonlib.MutableSparseMapService.copy,
  translationDiffMap:
    translationDiffMap |> WonderCommonlib.MutableSparseMapService.copy,
  directionArrayMap:
    directionArrayMap |> WonderCommonlib.MutableSparseMapService.copy,
  gameObjectMap: gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy,
  localEulerAngleMapX:
    localEulerAngleMapX |> WonderCommonlib.MutableSparseMapService.copy,
  localEulerAngleMapY:
    localEulerAngleMapY |> WonderCommonlib.MutableSparseMapService.copy,
  localEulerAngleMapZ:
    localEulerAngleMapZ |> WonderCommonlib.MutableSparseMapService.copy,
};