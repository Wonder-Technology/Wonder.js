open StateRenderType;

open VboBufferType;

open RenderSourceInstanceType;

open InstanceBufferRenderService;

let render =
    (
      gl,
      (
        transformIndex,
        materialIndex,
        shaderIndex,
        meshRendererIndex,
        geometryIndex,
        sourceInstance,
      ) as indexTuple,
      renderFunc,
      state,
    ) => {
  let state =
    renderFunc(.
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
  RenderJobUtils.draw(gl, meshRendererIndex, geometryIndex, state);
  /* let uniformInstanceSendNoCachableData =
     state.glslSenderRecord
     |> HandleUniformInstanceNoCachableService.unsafeGetUniformSendData(shaderIndex); */
  let uniformRenderObjectSendModelData =
    state.glslSenderRecord
    |> HandleUniformRenderObjectModelService.unsafeGetUniformSendData(
         shaderIndex,
       );
  let drawMode =
    DrawModeMeshRendererService.getGlDrawMode(gl, meshRendererIndex, state);
  let indexType =
    GeometryRenderService.getIndexType(gl, geometryIndex, state);
  let indexTypeSize =
    GeometryRenderService.getIndexTypeSize(gl, geometryIndex, state);
  let indicesCount =
    GetGeometryIndicesRenderService.getIndicesCount(. geometryIndex, state);
  let (_, objectInstanceTransformDataTuple) =
    BuildObjectInstanceTransformDataTupleUtils.build(sourceInstance, state);
  ObjectInstanceCollectionService.reduceObjectInstanceTransformCollection(
    objectInstanceTransformDataTuple,
    state,
    (. state, objectInstanceTransform) => {
      let state =
        uniformRenderObjectSendModelData
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (.
               state,
               {pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendModelData,
             ) => {
               GLSLLocationService.isUniformLocationExist(pos) ?
                 sendDataFunc(.
                   gl,
                   pos,
                   getDataFunc(. objectInstanceTransform, state),
                 ) :
                 ();
               state;
             },
             state,
           );
      DrawGLSLService.drawElement(
        (drawMode, indexType, indexTypeSize, indicesCount),
        gl,
      )
      |> ignore;
      state;
    },
  );
};