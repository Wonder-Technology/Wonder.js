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
           |> GLSLSenderConfigDataHandleSystem.unsafeGetShaderUniformSendNoCachableData(shaderIndex)
           |> ArraySystem.reduceState(
                [@bs]
                (
                  (
                    state,
                    {pos, getNoCachableDataFunc, sendNoCachableDataFunc}: shaderUniformSendNoCachableData
                  ) => {
                    [@bs] sendNoCachableDataFunc(gl, pos, [@bs] getNoCachableDataFunc(state));
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
               let (state, _, geometryIndex) = state |> RenderBasicJobCommon.render(gl, uid);
               GLSLSenderDrawUtils.drawElement(
                 (
                   GeometryAdmin.getDrawMode(gl),
                   GeometryAdmin.getIndexType(gl),
                   GeometryAdmin.getIndexTypeSize(gl),
                   GeometryAdmin.getIndicesCount(geometryIndex, state)
                 ),
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