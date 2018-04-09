open StateDataMainType;

open RenderType;

open RenderObjectBufferTypeArrayService;

open Js.Typed_array;

let create =
    (
      renderArray,
      (unsafeGetMaterialComponentFunc, getShaderIndexFunc),
      {gameObjectRecord} as state
    ) => {
  let count = renderArray |> Js.Array.length;
  let buffer =
    Worker.newSharedArrayBuffer(
      count
      * (
        Uint32Array._BYTES_PER_ELEMENT
        * (getComponentSize() * 5)
        + Uint8Array._BYTES_PER_ELEMENT
        * getGeometryTypeSize()
      )
    );
  /* let (
       transformIndices,
       materialIndices,
       shaderIndices,
       geometryIndices,
       sourceInstanceIndices,
       geometryTypes
     ) =
       CreateTypeArrayRenderObjectService.createTypeArrays(buffer, count); */
  let defaultSourceInstance = DefaultTypeArrayValueService.getDefaultSourceInstance();
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
             let materialIndex = unsafeGetMaterialComponentFunc(uid, gameObjectRecord);
             let (geometryIndex, type_) =
               GetComponentGameObjectService.unsafeGetGeometryComponentData(uid, gameObjectRecord);
             (
               setComponent(
                 index,
                 GetComponentGameObjectService.unsafeGetTransformComponent(uid, gameObjectRecord),
                 transformIndices
               ),
               setComponent(index, materialIndex, materialIndices),
               setComponent(index, getShaderIndexFunc(materialIndex, state), shaderIndices),
               setComponent(index, geometryIndex, geometryIndices),
               switch (
                 [@bs]
                 GetComponentGameObjectService.getSourceInstanceComponent(uid, gameObjectRecord)
               ) {
               | None => setComponent(index, defaultSourceInstance, sourceInstanceIndices)
               | Some(sourceInstance) => setComponent(index, sourceInstance, sourceInstanceIndices)
               },
               TypeArrayService.setInt8_1(index, type_, geometryTypes)
             )
           }
         ),
         /* (
              transformIndices,
              materialIndices,
              shaderIndices,
              geometryIndices,
              sourceInstanceIndices,
              geometryTypes
            ) */
         CreateTypeArrayRenderObjectService.createTypeArrays(buffer, count)
       );
  Some({
    buffer,
    count,
    transformIndices,
    materialIndices,
    shaderIndices,
    geometryIndices,
    sourceInstanceIndices,
    geometryTypes
  })
};