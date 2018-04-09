open StateRenderType;

let execJob = (_, state: StateDataMainType.state) => {
  let renderState = CreateRenderStateMainService.createRenderState(state);
  let gl = [@bs] DeviceManagerService.unsafeGetGl(renderState.deviceManagerRecord);
  ShaderIndexRenderShaderService.getAllShaderIndexArray(renderState.shaderRecord)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (renderState: StateRenderType.renderState, shaderIndex) => {
           let program = ProgramService.unsafeGetProgram(shaderIndex, renderState.programRecord);
           let {glslSenderRecord} as renderState =
             renderState |> UseProgramRenderService.use(gl, program);
           let {glslSenderRecord} as renderState =
             glslSenderRecord
             |> HandleUniformShaderNoCachableService.unsafeGetUniformSendData(shaderIndex)
             |> WonderCommonlib.ArrayService.reduceOneParam(
                  [@bs]
                  (
                    (
                      renderState,
                      {pos, getDataFunc, sendDataFunc}: StateRenderType.uniformShaderSendNoCachableData
                    ) => {
                      [@bs] sendDataFunc(gl, pos, [@bs] getDataFunc(renderState));
                      renderState
                    }
                  ),
                  renderState
                );
           let {glslSenderRecord} as renderState =
             glslSenderRecord
             |> HandleUniformShaderCachableService.unsafeGetUniformSendData(shaderIndex)
             |> WonderCommonlib.ArrayService.reduceOneParam(
                  [@bs]
                  (
                    (
                      renderState,
                      {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: StateRenderType.uniformShaderSendCachableData
                    ) => {
                      [@bs]
                      sendDataFunc(
                        gl,
                        shaderCacheMap,
                        (name, pos),
                        [@bs] getDataFunc(renderState)
                      );
                      renderState
                    }
                  ),
                  renderState
                );
           glslSenderRecord
           |> HandleUniformShaderCachableFunctionService.unsafeGetUniformSendData(shaderIndex)
           |> WonderCommonlib.ArrayService.reduceOneParam(
                [@bs]
                (
                  (
                    renderState,
                    {program, shaderCacheMap, locationMap, sendCachableFunctionDataFunc}: StateRenderType.uniformShaderSendCachableFunctionData
                  ) => {
                    [@bs]
                    sendCachableFunctionDataFunc(
                      gl,
                      (program, shaderCacheMap, locationMap),
                      renderState
                    );
                    renderState
                  }
                ),
                renderState
              )
         }
       ),
       renderState
     )
  |> ignore;
  state
};