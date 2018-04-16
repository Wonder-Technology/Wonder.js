open StateRenderType;

let execJob = (renderState) => {
  let gl = [@bs] DeviceManagerService.unsafeGetGl(renderState.deviceManagerRecord);
           WonderLog.Log.print("send shader") |> ignore;
  ShaderIndexRenderShaderService.getAllShaderIndexArray(renderState.shaderRecord)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (renderState: StateRenderType.renderState, shaderIndex) => {
           WonderLog.Log.print("use") |> ignore;
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
};