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
  moveSpeedXMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  moveSpeedYMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  rotateSpeedMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  rotationMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
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
        moveSpeedXMap,
        moveSpeedYMap,
        rotateSpeedMap,
        rotationMap,
        gameObjectMap,
        disposedIndexArray,
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
  dirtyArray: dirtyArray |> Js.Array.copy,
  moveSpeedXMap: moveSpeedXMap |> WonderCommonlib.MutableSparseMapService.copy,
  moveSpeedYMap: moveSpeedYMap |> WonderCommonlib.MutableSparseMapService.copy,
  rotateSpeedMap:
    rotateSpeedMap |> WonderCommonlib.MutableSparseMapService.copy,
  rotationMap: rotationMap |> WonderCommonlib.MutableSparseMapService.copy,
  gameObjectMap: gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy,
};