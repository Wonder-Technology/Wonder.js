open StateRenderType;

open RenderTransformType;

let getLocalToWorldMatrixTypeArray =
  [@bs]
  (
    (transform, {transformRecord}) =>
      ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(
        transform,
        transformRecord.localToWorldMatrices,
        transformRecord.localToWorldMatrixCacheMap
      )
  );

let getNormalMatrixTypeArray =
  [@bs]
  (
    (transform, {transformRecord}) =>
      ModelMatrixTransformService.getNormalMatrixTypeArray(
        transform,
        transformRecord.localToWorldMatrices,
        (transformRecord.localToWorldMatrixCacheMap, transformRecord.normalMatrixCacheMap)
      )
  );