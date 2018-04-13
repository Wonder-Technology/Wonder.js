let render =
    (
      gl,
      (
        count,
        transformIndices,
        materialIndices,
        shaderIndices,
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
           let shaderIndex = RenderObjectBufferTypeArrayService.getComponent(index, shaderIndices);
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
               renderState
             )
           } else {
             let renderState =
               [@bs]
               RenderBasicJobCommon.render(
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