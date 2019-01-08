open StateRenderType;

let execJob = renderState =>
  ! OperateCameraRenderService.hasCameraRecord(renderState) ?
    renderState :
    {
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

             let getRenderDataSubState =
               CreateGetRenederDataSubStateRenderService.createState(
                 renderState,
               );
             let sendRenderDataSubState =
               CreateSendRenederDataSubStateRenderService.createState(
                 renderState,
               );
             let getRenderDataSubState =
               glslSenderRecord
               |> HandleUniformShaderNoCachableService.unsafeGetUniformSendData(
                    shaderIndex,
                  )
               |> WonderCommonlib.ArrayService.reduceOneParam(
                    (.
                      getRenderDataSubState,
                      {pos, getDataFunc, sendDataFunc}: GLSLSenderType.uniformShaderSendNoCachableData,
                    ) => {
                      GLSLLocationService.isUniformLocationExist(pos) ?
                        sendDataFunc(.
                          gl,
                          pos,
                          getDataFunc(. getRenderDataSubState),
                        ) :
                        ();
                      getRenderDataSubState;
                    },
                    getRenderDataSubState,
                  );
             let getRenderDataSubState =
               glslSenderRecord
               |> HandleUniformShaderCachableService.unsafeGetUniformSendData(
                    shaderIndex,
                  )
               |> WonderCommonlib.ArrayService.reduceOneParam(
                    (.
                      getRenderDataSubState,
                      {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: GLSLSenderType.uniformShaderSendCachableData,
                    ) => {
                      sendDataFunc(.
                        gl,
                        shaderCacheMap,
                        (name, pos),
                        getDataFunc(. getRenderDataSubState),
                      );
                      getRenderDataSubState;
                    },
                    getRenderDataSubState,
                  );
             glslSenderRecord
             |> HandleUniformShaderCachableFunctionService.unsafeGetUniformSendData(
                  shaderIndex,
                )
             |> WonderCommonlib.ArrayService.reduceOneParam(
                  (.
                    getRenderDataSubState,
                    {
                      program,
                      shaderCacheMap,
                      locationMap,
                      sendCachableFunctionDataFunc,
                    }: GLSLSenderType.uniformShaderSendCachableFunctionData,
                  ) => {
                    sendCachableFunctionDataFunc(.
                      gl,
                      (program, shaderCacheMap, locationMap),
                      sendRenderDataSubState,
                    );
                    getRenderDataSubState;
                  },
                  getRenderDataSubState,
                )
             |> ignore;

             renderState;
           },
           renderState,
         );
    };