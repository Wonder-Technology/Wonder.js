open StateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferSystem;

let render = (gl, uid, renderFunc, state: StateDataType.state) => {
  let (state, shaderIndex, geometryIndex) = [@bs] renderFunc(gl, uid, state);
  let uniformInstanceSendNoCachableData =
    state
    |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformInstanceSendNoCachableData(shaderIndex);
  let drawMode = RenderGeometryService.getDrawMode(gl);
  let indexType = RenderGeometryService.getIndexType(gl);
  let indexTypeSize = RenderGeometryService.getIndexTypeSize(gl);
  let indicesCount =
    IndicesService.getIndicesCount(geometryIndex, state.boxGeometryRecord.indicesMap);
  let sourceInstance =
    GetComponentGameObjectService.unsafeGetSourceInstanceComponent(uid, state.gameObjectRecord);
  let objectInstanceArray =
    ObjectInstanceArraySourceInstanceService.getObjectInstanceArray(
      sourceInstance,
      state.sourceInstanceRecord
    );
  objectInstanceArray
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, uid) => {
           let state =
             uniformInstanceSendNoCachableData
             |> ArraySystem.reduceState(
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
           GLSLSenderDrawUtils.drawElement((drawMode, indexType, indexTypeSize, indicesCount), gl)
           |> ignore;
           state
         }
       ),
       state
     )
};