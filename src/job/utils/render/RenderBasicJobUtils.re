let _getShaderIndex = (materialIndex, state) =>
  ShaderIndexRenderService.getShaderIndex(
    materialIndex,
    ShaderIndexBasicMaterialRenderService.getShaderIndex,
    state,
  );

let _setRenderObjectGlState =
    (
      gl,
      materialIndex,
      (
        {basicMaterialRecord, deviceManagerRecord}: StateRenderType.renderState
      ) as state,
    ) => {
  let deviceManagerRecord =
    RenderObjectGlStateUtils.setRenderObjectGlState(
      gl,
      OperateTypeArrayAllBasicMaterialService.getIsDepthTest(
        materialIndex,
        basicMaterialRecord.isDepthTests,
      ),
      deviceManagerRecord,
    );

  state;
};

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
      state: StateRenderType.renderState,
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

         let state = _setRenderObjectGlState(gl, materialIndex, state);

         if (RenderObjectBufferTypeArrayService.hasSourceInstance(
               sourceInstance,
             )) {
           RenderBasicInstanceJobCommon.render(
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
             RenderBasicJobCommon.render(.
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