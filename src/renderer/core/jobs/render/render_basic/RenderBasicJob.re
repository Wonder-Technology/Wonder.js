open StateDataType;

let _sendShaderUniformData = (gl, state: StateDataType.state) =>
  ShaderSystem.getAllShaderIndexArray(state)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, shaderIndex) => {
           let program = ProgramSystem.unsafeGetProgram(shaderIndex, state);
           state
           |> ProgramSystem.use(gl, program)
           |> GLSLSenderConfigDataHandleUtils.getShaderUniformSendData(shaderIndex)
           |> ArraySystem.reduceState(
                [@bs]
                (
                  (state, {pos, getArrayDataFunc, sendArrayDataFunc}: shaderUniformSendData) => {
                    [@bs] sendArrayDataFunc(gl, pos, [@bs] getArrayDataFunc(state));
                    state
                  }
                ),
                state
              )
         }
       ),
       state
     );

let _render = (gl, state: StateDataType.state) => {
  let state = state |> _sendShaderUniformData(gl);
  switch (state |> RenderDataSystem.getRenderArrayFromState) {
  | None => state
  | Some(renderArray) =>
    renderArray
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, uid: int) =>
             if (InstanceUtils.isSourceInstance(uid, state)) {
               RenderBasicInstanceJobCommon.render(gl, uid, state)
             } else {
               let (state, _, mappedGeometryIndex) = state |> RenderBasicJobCommon.render(gl, uid);
               GLSLSenderDrawUtils.drawElement(
                 GeometryAdmin.getDrawMode(gl),
                 GeometryAdmin.getIndexType(gl),
                 GeometryAdmin.getIndexTypeSize(gl),
                 GeometryAdmin.getIndicesCount(mappedGeometryIndex, state),
                 gl
               );
               state
             }
         ),
         state
       )
  }
};

let getJob = (configData, gl, state) => _render(gl, state);