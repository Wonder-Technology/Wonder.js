open MainStateDataType;

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
    ArrayBuffer.make(
      count
      * (
        Uint32Array._BYTES_PER_ELEMENT
        * (getComponentSize() * 5)
        + Uint8Array._BYTES_PER_ELEMENT
        * getGeometryTypeSize()
      )
    );
  let transformIndices =
    Uint32Array.fromBufferRange(
      buffer,
      ~offset=getTransformIndicesOffset(count),
      ~length=getTransformIndicesLength(count)
    );
  let materialIndices =
    Uint32Array.fromBufferRange(
      buffer,
      ~offset=getMaterialIndicesOffset(count),
      ~length=getMaterialIndicesLength(count)
    );
  let shaderIndices =
    Uint32Array.fromBufferRange(
      buffer,
      ~offset=getShaderIndicesOffset(count),
      ~length=getShaderIndicesLength(count)
    );
  let geometryIndices =
    Uint32Array.fromBufferRange(
      buffer,
      ~offset=getGeometryIndicesOffset(count),
      ~length=getGeometryIndicesLength(count)
    );
  let sourceInstanceIndices =
    Uint32Array.fromBufferRange(
      buffer,
      ~offset=getSourceInstanceIndicesOffset(count),
      ~length=getSourceInstanceIndicesLength(count)
    );
  let geometryTypes =
    Uint8Array.fromBufferRange(
      buffer,
      ~offset=getGeometryTypesOffset(count),
      ~length=getGeometryTypesLength(count)
    );
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