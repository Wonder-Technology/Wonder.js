open SubStateGetRenderDataType;

open RenderTransformType;

open AllGlobalTempType;

let getLocalToWorldMatrixTypeArray =
  (. transform, {transformRecord} as state) =>
    ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(.
      transform,
      transformRecord.localToWorldMatrices,
      transformRecord.localToWorldMatrixCacheMap,
    );

let getNormalMatrixTypeArray =
  (. transform, {transformRecord, globalTempRecord}) =>
    ModelMatrixTransformService.getNormalMatrixTypeArray(
      transform,
      transformRecord.localToWorldMatrices,
      (
        transformRecord.localToWorldMatrixCacheMap,
        transformRecord.normalMatrixCacheMap,
      ),
      globalTempRecord,
    );