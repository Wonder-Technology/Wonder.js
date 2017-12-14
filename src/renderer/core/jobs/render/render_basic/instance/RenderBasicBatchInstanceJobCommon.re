open StateDataType;

let render = (gl, uid, state: StateDataType.state) => {
  let (state, shaderIndex, geometryIndex) = state |> RenderBasicJobCommon.render(gl, uid);
  let instanceUniformSendNoCacheableData =
    state |> GLSLSenderConfigDataHandleSystem.getInstanceUniformSendNoCacheableData(shaderIndex);
  let drawMode = GeometryAdmin.getDrawMode(gl);
  let indexType = GeometryAdmin.getIndexType(gl);
  let indexTypeSize = GeometryAdmin.getIndexTypeSize(gl);
  let indicesCount = GeometryAdmin.getIndicesCount(geometryIndex, state);
  let sourceInstance = GameObjectComponentCommon.unsafeGetSourceInstanceComponent(uid, state);
  let objectInstanceArray = SourceInstanceAdmin.getObjectInstanceArray(sourceInstance, state);
  objectInstanceArray
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, uid) => {
           let state =
             instanceUniformSendNoCacheableData
             |> ArraySystem.reduceState(
                  [@bs]
                  (
                    (state, {pos, getNoCacheableDataFunc, sendNoCacheableDataFunc}: instanceUniformSendNoCacheableData) => {
                      [@bs]
                      sendNoCacheableDataFunc(
                        gl,
                        pos,
                        [@bs]
                        getNoCacheableDataFunc(
                          GameObjectAdmin.unsafeGetTransformComponent(uid, state),
                          state
                        )
                      );
                      state
                    }
                  ),
                  state
                );
           GLSLSenderDrawUtils.drawElement(drawMode, indexType, indexTypeSize, indicesCount, gl)
           |> ignore;
           state
         }
       ),
       state
     )
};