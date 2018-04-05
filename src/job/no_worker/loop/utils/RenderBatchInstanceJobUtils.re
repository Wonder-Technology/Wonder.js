open StateDataMainType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferMainService;

let render =
    (
      gl,
      (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType, sourceInstance) as indexTuple,
      renderFunc,
      state: StateDataMainType.state
    ) => {
  let state =
    [@bs]
    renderFunc(
      gl,
      (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType),
      state
    );
  let uniformInstanceSendNoCachableData =
    state |> HandleUniformInstanceNoCachableService.unsafeGetUniformSendData(shaderIndex);
  let drawMode = RenderGeometryService.getDrawMode(gl);
  let indexType = RenderGeometryService.getIndexType(gl);
  let indexTypeSize = RenderGeometryService.getIndexTypeSize(gl);
  let getIndicesCountFunc = CurrentComponentDataMapSendAttributeService.getGetIndicesCountFunc(geometryType);
  let indicesCount = getIndicesCountFunc(geometryIndex, state);
  let objectInstanceArray =
    ObjectInstanceArraySourceInstanceService.getObjectInstanceArray(
      sourceInstance,
      state.sourceInstanceRecord
    );
  objectInstanceArray
  |> ReduceStateMainService.reduceState(
       [@bs]
       (
         (state, uid) => {
           let state =
             uniformInstanceSendNoCachableData
             |> ReduceStateMainService.reduceState(
                  [@bs]
                  (
                    (state, {pos, getDataFunc, sendDataFunc}: uniformInstanceSendNoCachableData) => {
                      [@bs]
                      sendDataFunc(
                        gl,
                        pos,
                        [@bs]
                        getDataFunc(
                          GetComponentGameObjectService.unsafeGetTransformComponent(
                            uid,
                            state.gameObjectRecord
                          ),
                          state
                        )
                      );
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