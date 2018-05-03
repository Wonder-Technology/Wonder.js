let _getShaderIndex = (materialIndex, state) =>
  ShaderIndexRenderService.getShaderIndex(
    materialIndex,
    ShaderIndexBasicMaterialRenderService.getShaderIndex,
    state
  );

let render =
    (
      gl,
      (
        count,
        transformIndices,
        materialIndices,
        geometryIndices,
        geometryTypes,
        sourceInstanceIndices
      ),
      state
    ) =>
  ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (state, index) => {
           let transformIndex =
             RenderObjectBufferTypeArrayService.getComponent(index, transformIndices);
           let materialIndex =
             RenderObjectBufferTypeArrayService.getComponent(index, materialIndices);
           let shaderIndex = _getShaderIndex(materialIndex, state);
           /* WonderLog.Log.print({j|shaderIndex: $shaderIndex; index: $index|j}) |> ignore; */
           let geometryIndex =
             RenderObjectBufferTypeArrayService.getComponent(index, geometryIndices);
           let geometryType =
             RenderObjectBufferTypeArrayService.getGeometryType(index, geometryTypes);
           let sourceInstance =
             RenderObjectBufferTypeArrayService.getComponent(index, sourceInstanceIndices);
           if (RenderObjectBufferTypeArrayService.hasSourceInstance(sourceInstance)) {
             RenderBasicInstanceJobCommon.render(
               gl,
               (
                 transformIndex,
                 materialIndex,
                 shaderIndex,
                 geometryIndex,
                 geometryType,
                 sourceInstance
               ),
               state
             )
           } else {
             let state =
               [@bs]
               RenderBasicJobCommon.render(
                 gl,
                 (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType),
                 state
               );
             RenderJobUtils.draw(gl, geometryIndex, geometryType, state);
             state
           }
         }
       ),
       state
     );