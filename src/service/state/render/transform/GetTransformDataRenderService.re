open StateRenderType;

open RenderTransformType;

open GlobalTempType;

let getLocalToWorldMatrixTypeArray =
  [@bs]
  (
    (transform, {workerDetectRecord, transformRecord} as state) =>
      [@bs]
      ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(
        transform,
        transformRecord.localToWorldMatrices,
        transformRecord.localToWorldMatrixCacheMap
      )
  );

let getNormalMatrixTypeArray =
  [@bs]
  (
    (transform, {workerDetectRecord, transformRecord}) =>
      ModelMatrixTransformService.getNormalMatrixTypeArray(
        transform,
        transformRecord.localToWorldMatrices,
        (transformRecord.localToWorldMatrixCacheMap, transformRecord.normalMatrixCacheMap)
      )
  );