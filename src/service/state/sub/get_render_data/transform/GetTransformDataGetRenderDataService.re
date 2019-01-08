open SubStateGetRenderDataType;

open RenderTransformType;

open GlobalTempType;

let getLocalToWorldMatrixTypeArray =
  (. transform, {transformRecord} as state) =>
    ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(.
      transform,
      transformRecord.localToWorldMatrices,
      transformRecord.localToWorldMatrixCacheMap,
    );

let getNormalMatrixTypeArray =
  (. transform, {transformRecord}) =>
    ModelMatrixTransformService.getNormalMatrixTypeArray(
      transform,
      transformRecord.localToWorldMatrices,
      (
        transformRecord.localToWorldMatrixCacheMap,
        transformRecord.normalMatrixCacheMap,
      ),
    );