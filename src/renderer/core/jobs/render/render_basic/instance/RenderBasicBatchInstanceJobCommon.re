open StateDataType;

let render = (gl, uid, state: StateDataType.state) => {
  let (state, shaderIndex, geometryIndex) = state |> RenderBasicJobCommon.render(gl, uid);
  let instanceUniformSendData =
    state |> GLSLSenderConfigDataHandleSystem.getInstanceUniformSendData(shaderIndex);
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
             instanceUniformSendData
             |> ArraySystem.reduceState(
                  [@bs]
                  (
                    (state, {pos, getArrayDataFunc, sendArrayDataFunc}: instanceUniformSendData) => {
                      [@bs]
                      sendArrayDataFunc(
                        gl,
                        pos,
                        [@bs]
                        getArrayDataFunc(
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