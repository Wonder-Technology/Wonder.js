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
      renderIndexArray,
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
  let renderIndexArray =
    OperateRenderMainService.hasCameraRecord(state) ? renderIndexArray : [||];

  let (
    transformIndices,
    materialIndices,
    meshRendererIndices,
    geometryIndices,
    sourceInstanceIndices,
    renderIndexArray,
  ) =
    renderIndexArray
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
         ) =>
           switch (
             GetComponentGameObjectService.getGeometryComponent(.
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