open StateRenderType;

open RenderTransformType;

let getLocalToWorldMatrixTypeArray =
  [@bs]
  (
    (transform, {transformRecord}) => {
      let (localToWorldMatrix, _) =
        ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(
          transform,
          transformRecord.localToWorldMatrices,
          transformRecord.localToWorldMatrixCacheMap
        );
      localToWorldMatrix
    }
  );

let getNormalMatrixTypeArray =
  [@bs]
  (
    (transform, {transformRecord}) => {
      let (normalMatrix, _) =
        ModelMatrixTransformService.getNormalMatrixTypeArray(
          transform,
          transformRecord.localToWorldMatrices,
          (transformRecord.localToWorldMatrixCacheMap, transformRecord.normalMatrixCacheMap)
        );
      normalMatrix
    }
  );