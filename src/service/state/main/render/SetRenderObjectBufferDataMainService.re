open StateDataMainType;

open RenderType;

open RenderObjectBufferTypeArrayService;

open Js.Typed_array;

let setData =
    (
      renderArray,
      (unsafeGetMaterialComponentFunc, getShaderIndexFunc),
      {
        transformIndices,
        materialIndices,
        shaderIndices,
        geometryIndices,
        sourceInstanceIndices,
        geometryTypes
      } as renderObjectRecord,
      {gameObjectRecord} as state
    ) => {
  let count = renderArray |> Js.Array.length;
  let (
    transformIndices,
    materialIndices,
    shaderIndices,
    geometryIndices,
    sourceInstanceIndices,
    geometryTypes
  ) =
    renderArray
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           (
             (
               transformIndices,
               materialIndices,
               shaderIndices,
               geometryIndices,
               sourceInstanceIndices,
               geometryTypes
             ),
             uid,
             index
           ) => {
             let materialIndex = [@bs] unsafeGetMaterialComponentFunc(uid, gameObjectRecord);
             let (geometryIndex, type_) =
               GetComponentGameObjectService.unsafeGetGeometryComponentData(uid, gameObjectRecord);
             (
               setComponent(
                 index,
                 GetComponentGameObjectService.unsafeGetTransformComponent(uid, gameObjectRecord),
                 transformIndices
               ),
               setComponent(index, materialIndex, materialIndices),
               setComponent(index, [@bs] getShaderIndexFunc(materialIndex, state), shaderIndices),
               setComponent(index, geometryIndex, geometryIndices),
               switch (
                 [@bs]
                 GetComponentGameObjectService.getSourceInstanceComponent(uid, gameObjectRecord)
               ) {
               | None => sourceInstanceIndices
               | Some(sourceInstance) => setComponent(index, sourceInstance, sourceInstanceIndices)
               },
               TypeArrayService.setInt8_1(index, type_, geometryTypes)
             )
           }
         ),
         (
           transformIndices,
           materialIndices,
           shaderIndices,
           geometryIndices,
           sourceInstanceIndices,
           geometryTypes
         )
       );
  Some({
    ...renderObjectRecord,
    count,
    transformIndices,
    materialIndices,
    shaderIndices,
    geometryIndices,
    sourceInstanceIndices,
    geometryTypes
  })
};