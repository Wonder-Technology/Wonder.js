open StateDataMainType;

let create = () => {
  index: 0,
  pointDownEventHandleFuncMap: WonderCommonlib.SparseMapService.createEmpty(),
  pointUpEventHandleFuncMap: WonderCommonlib.SparseMapService.createEmpty(),
  pointDragEventHandleFuncMap: WonderCommonlib.SparseMapService.createEmpty(),
  pointScaleEventHandleFuncMap: WonderCommonlib.SparseMapService.createEmpty(),
  keydownEventHandleFuncMap: WonderCommonlib.SparseMapService.createEmpty(),
  dirtyArray: WonderCommonlib.SparseMapService.createEmpty(),
  distanceMap: WonderCommonlib.SparseMapService.createEmpty(),
  minDistanceMap: WonderCommonlib.SparseMapService.createEmpty(),
  phiMap: WonderCommonlib.SparseMapService.createEmpty(),
  thetaMap: WonderCommonlib.SparseMapService.createEmpty(),
  thetaMarginMap: WonderCommonlib.SparseMapService.createEmpty(),
  targetMap: WonderCommonlib.SparseMapService.createEmpty(),
  moveSpeedXMap: WonderCommonlib.SparseMapService.createEmpty(),
  moveSpeedYMap: WonderCommonlib.SparseMapService.createEmpty(),
  rotateSpeedMap: WonderCommonlib.SparseMapService.createEmpty(),
  wheelSpeedMap: WonderCommonlib.SparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
};

let deepCopyForRestore =
    (
      {
        index,
        pointDownEventHandleFuncMap,
        pointUpEventHandleFuncMap,
        pointDragEventHandleFuncMap,
        pointScaleEventHandleFuncMap,
        keydownEventHandleFuncMap,
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
      },
    ) => {
  index,
  pointDownEventHandleFuncMap:
    pointDownEventHandleFuncMap |> SparseMapService.copy,
  pointUpEventHandleFuncMap:
    pointUpEventHandleFuncMap |> SparseMapService.copy,
  pointDragEventHandleFuncMap:
    pointDragEventHandleFuncMap |> SparseMapService.copy,
  pointScaleEventHandleFuncMap:
    pointScaleEventHandleFuncMap |> SparseMapService.copy,
  keydownEventHandleFuncMap:
    keydownEventHandleFuncMap |> SparseMapService.copy,
  dirtyArray: dirtyArray |> SparseMapService.copy,
  distanceMap: distanceMap |> SparseMapService.copy,
  minDistanceMap: minDistanceMap |> SparseMapService.copy,
  phiMap: phiMap |> SparseMapService.copy,
  thetaMap: thetaMap |> SparseMapService.copy,
  thetaMarginMap: thetaMarginMap |> SparseMapService.copy,
  targetMap: targetMap |> SparseMapService.copy,
  moveSpeedXMap: moveSpeedXMap |> SparseMapService.copy,
  moveSpeedYMap: moveSpeedYMap |> SparseMapService.copy,
  rotateSpeedMap: rotateSpeedMap |> SparseMapService.copy,
  wheelSpeedMap: wheelSpeedMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy,
};