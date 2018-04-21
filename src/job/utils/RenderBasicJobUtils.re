/* TODO front light render should also add this check */
/* TODO test: if shaderIndex not exist(is default value)(means that render worker not finish init shader), not draw */
let _getShaderIndex = (index, shaderIndices) =>
  RenderObjectBufferTypeArrayService.getComponent(index, shaderIndices)
  |> WonderLog.Contract.ensureCheck(
       (shaderIndex) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|shaderIndex should exist|j}, ~actual={j|not|j}),
                 () => shaderIndex <>= DefaultTypeArrayValueService.getDefaultShaderIndex()
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

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
           let shaderIndex = _getShaderIndex(index, shaderIndices);
           /* WonderLog.Log.print(("shaderIndex: ", shaderIndex)) |> ignore; */
           let transformIndex =
             RenderObjectBufferTypeArrayService.getComponent(index, transformIndices);
           let materialIndex =
             RenderObjectBufferTypeArrayService.getComponent(index, materialIndices);
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