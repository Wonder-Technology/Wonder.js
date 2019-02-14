open StateRenderType;

let _useProgram = (gl, shaderIndex, renderState) =>
  renderState |> UseProgramRenderService.useByShaderIndex(gl, shaderIndex);

let _sendNoCachableData = (gl, renderState) =>
  renderState
  |> HandleUniformShaderNoCachableService.reduceiValidShaderSendNoCachableData(
       renderState.glslSenderRecord,
       (. renderState, dataArr, shaderIndex) => {
         let renderState = _useProgram(gl, shaderIndex, renderState);

         let getRenderDataSubState =
           dataArr
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
                CreateGetRenederDataSubStateRenderService.createState(
                  renderState,
                ),
              );

         renderState;
       },
     );

let _sendCachableData = (gl, renderState) =>
  renderState
  |> HandleUniformShaderCachableService.reduceiValidShaderSendCachableData(
       renderState.glslSenderRecord,
       (. renderState, dataArr, shaderIndex) => {
         let renderState = _useProgram(gl, shaderIndex, renderState);

         let getRenderDataSubState =
           dataArr
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
                CreateGetRenederDataSubStateRenderService.createState(
                  renderState,
                ),
              );

         renderState;
       },
     );

let _sendCachableFunctionData = (gl, renderState) =>
  renderState
  |> HandleUniformShaderCachableFunctionService.reduceiValidShaderSendCachableFunctionData(
       renderState.glslSenderRecord,
       (. renderState, dataArr, shaderIndex) => {
         let renderState = _useProgram(gl, shaderIndex, renderState);

         let sendRenderDataSubState =
           dataArr
           |> WonderCommonlib.ArrayService.reduceOneParam(
                (.
                  sendRenderDataSubState,
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

                  sendRenderDataSubState;
                },
                CreateSendRenederDataSubStateRenderService.createState(
                  renderState,
                ),
              );

         renderState;
       },
     );

let execJob = renderState =>
  ! OperateCameraRenderService.hasCameraRecord(renderState) ?
    renderState :
    {
      let gl =
        DeviceManagerService.unsafeGetGl(. renderState.deviceManagerRecord);

      renderState
      |> _sendNoCachableData(gl)
      |> _sendCachableData(gl)
      |> _sendCachableFunctionData(gl);
    };