open StateRenderType;

open RenderTransformType;

open GlobalTempType;

let getLocalToWorldMatrixTypeArray =
  [@bs]
  (
    (transform, {workerDetectRecord, globalTempRecord, transformRecord} as state) =>
      /* TODO use condition compile */
      RenderWorkerDetectService.isUseWorker(workerDetectRecord) ?
        [@bs]
        RecordTransformMainService.getLocalToWorldMatrixTypeArrayToTarget(
          transform,
          transformRecord.localToWorldMatrices,
          globalTempRecord.float16Array1
        ) :
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
    (transform, {workerDetectRecord, globalTempRecord, transformRecord}) =>
      RenderWorkerDetectService.isUseWorker(workerDetectRecord) ?
        ModelMatrixTransformService.getNormalMatrixTypeArrayToTarget(
          transform,
          transformRecord.localToWorldMatrices,
          globalTempRecord.float16Array1,
          globalTempRecord.float9Array1
        ) :
        ModelMatrixTransformService.getNormalMatrixTypeArray(
          transform,
          transformRecord.localToWorldMatrices,
          (transformRecord.localToWorldMatrixCacheMap, transformRecord.normalMatrixCacheMap)
        )
  );