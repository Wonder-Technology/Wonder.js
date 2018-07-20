open StateRenderType;

let execJob = renderState => {
  let gl =
    DeviceManagerService.unsafeGetGl(. renderState.deviceManagerRecord);
  ShaderIndexRenderShaderService.getAllShaderIndexArray(
    renderState.shaderRecord,
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. renderState: StateRenderType.renderState, shaderIndex) => {
         let program =
           ProgramService.unsafeGetProgram(
             shaderIndex,
             renderState.programRecord,
           );
         let {glslSenderRecord} as renderState =
           renderState |> UseProgramRenderService.use(gl, program);
         let {glslSenderRecord} as renderState =
           glslSenderRecord
           |> HandleUniformShaderNoCachableService.unsafeGetUniformSendData(
                shaderIndex,
              )
           |> WonderCommonlib.ArrayService.reduceOneParam(
                (.
                  renderState,
                  {pos, getDataFunc, sendDataFunc}: StateRenderType.uniformShaderSendNoCachableData,
                ) => {
                  GLSLLocationService.isUniformLocationExist(pos) ?
                    sendDataFunc(. gl, pos, getDataFunc(. renderState)) : ();
                  renderState;
                },
                renderState,
              );
         let {glslSenderRecord} as renderState =
           glslSenderRecord
           |> HandleUniformShaderCachableService.unsafeGetUniformSendData(
                shaderIndex,
              )
           |> WonderCommonlib.ArrayService.reduceOneParam(
                (.
                  renderState,
                  {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: StateRenderType.uniformShaderSendCachableData,
                ) => {
                  sendDataFunc(.
                    gl,
                    shaderCacheMap,
                    (name, pos),
                    getDataFunc(. renderState),
                  );
                  renderState;
                },
                renderState,
              );
         glslSenderRecord
         |> HandleUniformShaderCachableFunctionService.unsafeGetUniformSendData(
              shaderIndex,
            )
         |> WonderCommonlib.ArrayService.reduceOneParam(
              (.
                renderState,
                {
                  program,
                  shaderCacheMap,
                  locationMap,
                  sendCachableFunctionDataFunc,
                }: StateRenderType.uniformShaderSendCachableFunctionData,
              ) => {
                sendCachableFunctionDataFunc(.
                  gl,
                  (program, shaderCacheMap, locationMap),
                  renderState,
                );
                renderState;
              },
              renderState,
            );
       },
       renderState,
     );
};