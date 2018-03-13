open StateDataType;

let execJob = (_, _, state) => {
  let gl = [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
  ShaderIndexShaderService.getAllShaderIndexArray(state.shaderRecord)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, shaderIndex) => {
           let program = ProgramService.unsafeGetProgram(shaderIndex, state.programRecord);
           state
           |> UseProgramService.use(gl, program)
           |> HandleUniformShaderNoCachableService.unsafeGetUniformSendData(shaderIndex)
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
           |> HandleUniformShaderCachableService.unsafeGetUniformSendData(shaderIndex)
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
           |> HandleUniformShaderCachableFunctionService.unsafeGetUniformSendData(shaderIndex)
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