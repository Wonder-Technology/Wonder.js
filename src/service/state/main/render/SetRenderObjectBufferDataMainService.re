open StateDataMainType;

open RenderType;

open RenderObjectBufferTypeArrayService;

open Js.Typed_array;

let setData =
    (
      renderArray,
      unsafeGetMaterialComponentFunc,
      {
        transformIndices,
        materialIndices,
        meshRendererIndices,
        geometryIndices,
        sourceInstanceIndices,
      } as renderObjectRecord,
      {gameObjectRecord} as state,
    ) => {
  let renderArray =
    OperateRenderMainService.hasCameraRecord(state) ? renderArray : [||];

  let (
    transformIndices,
    materialIndices,
    meshRendererIndices,
    geometryIndices,
    sourceInstanceIndices,
    renderArray,
  ) =
    renderArray
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (
             transformIndices,
             materialIndices,
             meshRendererIndices,
             geometryIndices,
             sourceInstanceIndices,
             renderArray,
           ) as dataTuple,
           uid,
           index,
         ) =>
           switch (
             GetComponentGameObjectService.getGeometryComponent(
               uid,
               gameObjectRecord,
             )
           ) {
           | None => dataTuple
           | Some(geometryIndex) =>
             let materialIndex =
               unsafeGetMaterialComponentFunc(. uid, gameObjectRecord);

             (
               setComponent(
                 index,
                 GetComponentGameObjectService.unsafeGetTransformComponent(
                   uid,
                   gameObjectRecord,
                 ),
                 transformIndices,
               ),
               setComponent(index, materialIndex, materialIndices),
               setComponent(
                 index,
                 GetComponentGameObjectService.unsafeGetMeshRendererComponent(
                   uid,
                   gameObjectRecord,
                 ),
                 meshRendererIndices,
               ),
               setComponent(index, geometryIndex, geometryIndices),
               switch (
                 GetComponentGameObjectService.getSourceInstanceComponent(.
                   uid,
                   gameObjectRecord,
                 )
               ) {
               | None => sourceInstanceIndices
               | Some(sourceInstance) =>
                 setComponent(index, sourceInstance, sourceInstanceIndices)
               },
               renderArray |> ArrayService.push(index),
             );
           },
         (
           transformIndices,
           materialIndices,
           meshRendererIndices,
           geometryIndices,
           sourceInstanceIndices,
           [||],
         ),
       );
  Some({
    ...renderObjectRecord,
    renderArray,
    transformIndices,
    materialIndices,
    meshRendererIndices,
    geometryIndices,
    sourceInstanceIndices,
  });
};