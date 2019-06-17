open WonderWebgl.GlType;

open WonderWebgl.Gl;

open DrawGLSLService;

open AllRenderConfigType;

open AllGLSLSenderType;

let unsafeGetAttributeSendData = (shaderIndex: int, glslSenderRecord) => {
  let {attributeSendDataMap} = glslSenderRecord;
  attributeSendDataMap
  |> WonderCommonlib.MutableSparseMapService.unsafeGet(shaderIndex)
  |> WonderLog.Contract.ensureCheck(
       sendData =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|attribute send record exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 sendData |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );
};

let unsafeGetInstanceAttributeSendData =
    (shaderIndex: int, {instanceAttributeSendDataMap}) =>
  instanceAttributeSendDataMap
  |> WonderCommonlib.MutableSparseMapService.unsafeGet(shaderIndex)
  |> WonderLog.Contract.ensureCheck(
       sendData =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|instance attribute send record exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 sendData |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );