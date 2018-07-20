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
        geometryIndex,
        geometryType,
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
        geometryIndex,
        geometryType,
      ),
      state,
    );
  RenderJobUtils.draw(gl, geometryIndex, geometryType, state);
  /* let uniformInstanceSendNoCachableData =
     state.glslSenderRecord
     |> HandleUniformInstanceNoCachableService.unsafeGetUniformSendData(shaderIndex); */
  let uniformRenderObjectSendModelData =
    state.glslSenderRecord
    |> HandleUniformRenderObjectModelService.unsafeGetUniformSendData(
         shaderIndex,
       );
  let drawMode = RenderGeometryService.getDrawMode(gl);
  let indexType = RenderGeometryService.getIndexType(gl);
  let indexTypeSize = RenderGeometryService.getIndexTypeSize(gl);
  let getIndicesCountFunc =
    CurrentComponentDataMapRenderService.getGetIndicesCountFunc(geometryType);
  let indicesCount = getIndicesCountFunc(. geometryIndex, state);
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