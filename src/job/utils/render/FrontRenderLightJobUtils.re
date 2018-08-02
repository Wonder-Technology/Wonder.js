let _getShaderIndex = (materialIndex, state) =>
  ShaderIndexRenderService.getShaderIndex(
    materialIndex,
    ShaderIndexLightMaterialRenderService.getShaderIndex,
    state,
  );

let render =
    (
      gl,
      (
        count,
        transformIndices,
        materialIndices,
        meshRendererIndices,
        geometryIndices,
        geometryTypes,
        sourceInstanceIndices,
      ),
      state,
    ) =>
  ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, index) => {
         let transformIndex =
           RenderObjectBufferTypeArrayService.getComponent(
             index,
             transformIndices,
           );
         let materialIndex =
           RenderObjectBufferTypeArrayService.getComponent(
             index,
             materialIndices,
           );
         let shaderIndex = _getShaderIndex(materialIndex, state);
         let meshRendererIndex =
           RenderObjectBufferTypeArrayService.getComponent(
             index,
             meshRendererIndices,
           );
         let geometryIndex =
           RenderObjectBufferTypeArrayService.getComponent(
             index,
             geometryIndices,
           );
         let geometryType =
           RenderObjectBufferTypeArrayService.getGeometryType(
             index,
             geometryTypes,
           );
         let sourceInstance =
           RenderObjectBufferTypeArrayService.getComponent(
             index,
             sourceInstanceIndices,
           );
         if (RenderObjectBufferTypeArrayService.hasSourceInstance(
               sourceInstance,
             )) {
           FrontRenderLightInstanceJobCommon.render(
             gl,
             (
               transformIndex,
               materialIndex,
               shaderIndex,
               meshRendererIndex,
               geometryIndex,
               geometryType,
               sourceInstance,
             ),
             state,
           );
         } else {
           let state =
             FrontRenderLightJobCommon.render(.
               gl,
               (
                 transformIndex,
                 materialIndex,
                 shaderIndex,
                 meshRendererIndex,
                 geometryIndex,
                 geometryType,
               ),
               state,
             );
           RenderJobUtils.draw(
             gl,
             meshRendererIndex,
             geometryIndex,
             geometryType,
             state,
           );
           state;
         };
       },
       state,
     );