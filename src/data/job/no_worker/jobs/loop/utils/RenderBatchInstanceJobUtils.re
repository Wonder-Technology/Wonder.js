open StateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferSystem;

let render = (gl, uid, renderFunc, state: StateDataType.state) => {
  let (state, shaderIndex, geometryIndex) = [@bs] renderFunc(gl, uid, state);
  let uniformInstanceSendNoCachableData =
    state
    |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformInstanceSendNoCachableData(shaderIndex);
  let drawMode = GeometryAdmin.getDrawMode(gl);
  let indexType = GeometryAdmin.getIndexType(gl);
  let indexTypeSize = GeometryAdmin.getIndexTypeSize(gl);
  let indicesCount = GeometryAdmin.getIndicesCount(geometryIndex, state);
  let sourceInstance = GameObjectGetComponentCommon.unsafeGetSourceInstanceComponent(uid, state);
  let objectInstanceArray = SourceInstanceAdmin.getObjectInstanceArray(sourceInstance, state);
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
                        getDataFunc(GetComponentGameObjectService.unsafeGetTransformComponent(uid, state.gameObjectRecord), state)
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