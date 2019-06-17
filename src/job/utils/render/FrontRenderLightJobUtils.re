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
        renderIndexArray,
        transformIndices,
        materialIndices,
        meshRendererIndices,
        geometryIndices,
        sourceInstanceIndices,
      ),
      state,
    ) =>
  renderIndexArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, index) => {
         let state =
           OperateAllTextureRenderService.resetActivedTextureUnitIndex(state);

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
               ),
               state,
             );
           RenderJobUtils.draw(
             gl,
             DrawModeMeshRendererService.getGlDrawMode(
               gl,
               meshRendererIndex,
               state,
             ),
             geometryIndex,
             state,
           );
           state;
         };
       },
       state,
     );