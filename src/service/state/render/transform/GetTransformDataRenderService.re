open StateRenderType;

open RenderTransformType;

let getLocalToWorldMatrixTypeArray =
  [@bs]
  (
    (transform, {transformRecord}) =>
      ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(
        transform,
        transformRecord.localToWorldMatrices
      )
  );

let getNormalMatrixTypeArray =
  [@bs]
  (
    (transform, {transformRecord}) => {
      let (normalMatrix, _) =
        ModelMatrixTransformService.getNormalMatrixTypeArray(
          transform,
          transformRecord.localToWorldMatrices,
          transformRecord.normalMatrixCacheMap
        );
      normalMatrix
    }
  );