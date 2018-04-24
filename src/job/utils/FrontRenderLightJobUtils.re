let _getShaderIndex = (materialIndex, renderState) =>
  ShaderIndexRenderService.getShaderIndex(
    materialIndex,
    ShaderIndexLightMaterialRenderService.getShaderIndex,
    renderState
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
      renderState
    ) =>
  ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (renderState, index) => {
           let transformIndex =
             RenderObjectBufferTypeArrayService.getComponent(index, transformIndices);
           let materialIndex =
             RenderObjectBufferTypeArrayService.getComponent(index, materialIndices);
           let shaderIndex = _getShaderIndex(materialIndex, renderState);
           WonderLog.Log.print({j|materialIndex: $materialIndex, shaderIndex:$shaderIndex|j}) |> ignore;
           /* WonderLog.Log.print({j|shaderIndex: $shaderIndex; index: $index|j}) |> ignore; */
           let geometryIndex =
             RenderObjectBufferTypeArrayService.getComponent(index, geometryIndices);
           let geometryType =
             RenderObjectBufferTypeArrayService.getGeometryType(index, geometryTypes);
           let sourceInstance =
             RenderObjectBufferTypeArrayService.getComponent(index, sourceInstanceIndices);
           if (RenderObjectBufferTypeArrayService.hasSourceInstance(sourceInstance)) {
             FrontRenderLightInstanceJobCommon.render(
               gl,
               (
                 transformIndex,
                 materialIndex,
                 shaderIndex,
                 geometryIndex,
                 geometryType,
                 sourceInstance
               ),
               renderState
             )
           } else {
             let renderState =
               [@bs]
               FrontRenderLightJobCommon.render(
                 gl,
                 (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType),
                 renderState
               );
             let getIndicesCountFunc =
               CurrentComponentDataMapRenderService.getGetIndicesCountFunc(geometryType);
             DrawGLSLService.drawElement(
               (
                 RenderGeometryService.getDrawMode(gl),
                 RenderGeometryService.getIndexType(gl),
                 RenderGeometryService.getIndexTypeSize(gl),
                 [@bs] getIndicesCountFunc(geometryIndex, renderState)
               ),
               gl
             );
             renderState
           }
         }
       ),
       renderState
     );