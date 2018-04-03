open MainStateDataType;

open RenderType;

open Js.Typed_array;

open BasicRenderObjectBufferService;

/* TODO refactor: move to service */
let _getBasicMaterialRenderArray = (renderArray, state: MainStateDataType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasBasicMaterialComponent(uid, state.gameObjectRecord)
     );

let execJob = (_, _, {gameObjectRecord, meshRendererRecord} as state) => {
  let basicRenderArray =
    state
    |> _getBasicMaterialRenderArray(
         meshRendererRecord |> RenderArrayMeshRendererService.getRenderArray
       );
  let count = basicRenderArray |> Js.Array.length;
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
    basicRenderArray
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
             let materialIndex =
               GetComponentGameObjectService.unsafeGetBasicMaterialComponent(
                 uid,
                 gameObjectRecord
               );
             let (geometryIndex, type_) =
               GetComponentGameObjectService.unsafeGetGeometryComponentData(uid, gameObjectRecord);
             (
               BasicRenderObjectBufferService.setComponent(
                 index,
                 GetComponentGameObjectService.unsafeGetTransformComponent(uid, gameObjectRecord),
                 transformIndices
               ),
               BasicRenderObjectBufferService.setComponent(index, materialIndex, materialIndices),
               BasicRenderObjectBufferService.setComponent(
                 index,
                 ShaderIndexBasicMaterialMainService.getShaderIndex(materialIndex, state),
                 shaderIndices
               ),
               BasicRenderObjectBufferService.setComponent(index, geometryIndex, geometryIndices),
               switch (
                 [@bs]
                 GetComponentGameObjectService.getSourceInstanceComponent(uid, gameObjectRecord)
               ) {
               | None =>
                 BasicRenderObjectBufferService.setComponent(
                   index,
                   defaultSourceInstance,
                   sourceInstanceIndices
                 )
               | Some(sourceInstance) =>
                 BasicRenderObjectBufferService.setComponent(
                   index,
                   sourceInstance,
                   sourceInstanceIndices
                 )
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
  {
    ...state,
    renderRecord: {
      ...state.renderRecord,
      basicRenderObjectRecord:
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
    }
  }
};