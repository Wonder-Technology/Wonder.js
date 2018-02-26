open StateDataType;

let execJob = (_, _, state) => {
  let gl = [@bs] DeviceManagerSystem.unsafeGetGl(state);
  ShaderSystem.getAllShaderIndexArray(state)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, shaderIndex) => {
           let program = ProgramSystem.unsafeGetProgram(shaderIndex, state);
           state
           |> ProgramSystem.use(gl, program)
           |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformShaderSendNoCachableData(
                shaderIndex
              )
           |> ArraySystem.reduceState(
                [@bs]
                (
                  (state, {pos, getDataFunc, sendDataFunc}: uniformShaderSendNoCachableData) => {
                    [@bs] sendDataFunc(gl, pos, [@bs] getDataFunc(state));
                    state
                  }
                ),
                state
              )
           |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformShaderSendCachableData(shaderIndex)
           |> ArraySystem.reduceState(
                [@bs]
                (
                  (
                    state,
                    {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: uniformShaderSendCachableData
                  ) => {
                    [@bs] sendDataFunc(gl, shaderCacheMap, (name, pos), [@bs] getDataFunc(state));
                    state
                  }
                ),
                state
              )
           |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformShaderSendCachableFunctionData(
                shaderIndex
              )
           |> ArraySystem.reduceState(
                [@bs]
                (
                  (
                    state,
                    {program, shaderCacheMap, locationMap, sendCachableFunctionDataFunc}: uniformShaderSendCachableFunctionData
                  ) =>
                    [@bs]
                    sendCachableFunctionDataFunc(gl, (program, shaderCacheMap, locationMap), state)
                ),
                state
              )
         }
       ),
       state
     )
};