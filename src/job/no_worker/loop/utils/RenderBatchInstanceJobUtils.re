open StateRenderType;

open VboBufferType;

open RenderSourceInstanceType;

open InstanceBufferRenderService;

let render =
    (
      gl,
      (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType, sourceInstance) as indexTuple,
      renderFunc,
      state
    ) => {
  let state =
    [@bs]
    renderFunc(
      gl,
      (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType),
      state
    );
  let uniformInstanceSendNoCachableData =
    state.glslSenderRecord
    |> HandleUniformInstanceNoCachableService.unsafeGetUniformSendData(shaderIndex);
  let drawMode = RenderGeometryService.getDrawMode(gl);
  let indexType = RenderGeometryService.getIndexType(gl);
  let indexTypeSize = RenderGeometryService.getIndexTypeSize(gl);
  let getIndicesCountFunc =
    CurrentComponentDataMapRenderService.getGetIndicesCountFunc(geometryType);
  let indicesCount = [@bs] getIndicesCountFunc(geometryIndex, state);
  let objectInstanceTransformArray =
    GetObjectInstanceArrayRenderService.getObjectInstanceTransformArray(
      sourceInstance,
      state.sourceInstanceRecord
    );
  objectInstanceTransformArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (state, transform) => {
           let state =
             uniformInstanceSendNoCachableData
             |> WonderCommonlib.ArrayService.reduceOneParam(
                  [@bs]
                  (
                    (state, {pos, getDataFunc, sendDataFunc}: uniformInstanceSendNoCachableData) => {
                      [@bs] sendDataFunc(gl, pos, [@bs] getDataFunc(transform, state));
                      state
                    }
                  ),
                  state
                );
           DrawGLSLService.drawElement((drawMode, indexType, indexTypeSize, indicesCount), gl)
           |> ignore;
           state
         }
       ),
       state
     )
};