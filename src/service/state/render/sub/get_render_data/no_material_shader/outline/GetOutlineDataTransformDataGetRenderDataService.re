open SubStateGetRenderDataType;

open RenderTransformType;

open AllGlobalTempType;

let getScaledLocalToWorldMatrixTypeArray =
  (. transform, {transformRecord} as state) =>
    ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(.
      transform,
      transformRecord.localToWorldMatrices,
      transformRecord.localToWorldMatrixCacheMap,
    )
    |> Matrix4Service.scale(
         (1.01, 1.01, 1.01),
         _,
         Matrix4Service.createIdentityMatrix4(),
       );