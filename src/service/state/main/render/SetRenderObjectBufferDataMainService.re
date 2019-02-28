open StateDataMainType;

open RenderType;

open RenderObjectBufferTypeArrayService;

open Js.Typed_array;

let _setSourceInstance = (index, uid, sourceInstanceIndices, gameObjectRecord) =>
  switch (
    GetComponentGameObjectService.getSourceInstanceComponent(.
      uid,
      gameObjectRecord,
    )
  ) {
  | None => sourceInstanceIndices
  | Some(sourceInstance) =>
    setComponent(index, sourceInstance, sourceInstanceIndices)
  };

let setData =
    (
      renderGameObjectArray,
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
  let renderGameObjectArray =
    OperateRenderMainService.hasCameraRecord(state) ?
      renderGameObjectArray : [||];

  let (
    transformIndices,
    materialIndices,
    meshRendererIndices,
    geometryIndices,
    sourceInstanceIndices,
    renderIndexArray,
  ) =
    renderGameObjectArray
    |> Js.Array.filter(uid =>
         HasComponentGameObjectService.hasGeometryComponent(
           uid,
           gameObjectRecord,
         )
       )
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (
             transformIndices,
             materialIndices,
             meshRendererIndices,
             geometryIndices,
             sourceInstanceIndices,
             renderIndexArray,
           ) as dataTuple,
           uid,
           index,
         ) => {
           let geometryIndex =
             GetComponentGameObjectService.unsafeGetGeometryComponent(
               uid,
               gameObjectRecord,
             );

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
             _setSourceInstance(
               index,
               uid,
               sourceInstanceIndices,
               gameObjectRecord,
             ),
             renderIndexArray |> ArrayService.push(index),
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
    renderIndexArray,
    transformIndices,
    materialIndices,
    meshRendererIndices,
    geometryIndices,
    sourceInstanceIndices,
  });
};