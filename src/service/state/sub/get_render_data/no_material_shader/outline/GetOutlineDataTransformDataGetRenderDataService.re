open SubStateGetRenderDataType;

open RenderTransformType;

open GlobalTempType;

/* let getLocalToWorldMatrixTypeArray =
   (. transform, {transformRecord} as state) =>
     ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(.
       transform,
       transformRecord.localToWorldMatrices,
       transformRecord.localToWorldMatrixCacheMap,
     ); */

let getScaledLocalToWorldMatrixTypeArray =
  (. transform, {transformRecord} as state) =>
    ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(.
      transform,
      transformRecord.localToWorldMatrices,
      transformRecord.localToWorldMatrixCacheMap,
    )
    |> Matrix4Service.scale(
         (1.03, 1.03, 1.03),
         _,
         Matrix4Service.createIdentityMatrix4(),
       );