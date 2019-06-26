open WonderWebgl.GlType;

open WonderWebgl.Gl;

open AllRenderConfigType;

/* open StateRenderType; */

open AllGLSLSenderType;

let addModelMatrixInstanceArrayBufferSendData =
    (
      (gl, program, name, attributeLocationMap),
      (sendDataArr, instanceSendNoCachableDataArr),
    ) => (
  sendDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({
       pos:
         AllGLSLLocationService.getAttribLocationAndCache(
           program,
           name,
           attributeLocationMap,
           gl,
         ),
       size: 4,
       getOffsetFunc: (. index) => index * 16,
     }),
);

let addOtherArrayBufferSendData =
    (
      (gl, program, name, buffer, type_, attributeLocationMap),
      (sendDataArr, instanceSendNoCachableDataArr),
    ) => (
  sendDataArr
  |> ArrayService.push({
       pos:
         AllGLSLLocationService.getAttribLocationAndCache(
           program,
           name,
           attributeLocationMap,
           gl,
         ),
       size: SendGLSLDataService.getBufferSizeByType(type_),
       buffer,
       sendFunc: SendGLSLDataSendRenderDataService.sendBuffer,
     }),
  instanceSendNoCachableDataArr,
);

let addElementBufferSendData =
    (buffer, (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr
  |> ArrayService.push({
       pos: 0,
       size: 0,
       buffer,
       sendFunc: DrawGLSLInitShaderAllService.bindElementArrayBuffer,
     }),
  instanceSendNoCachableDataArr,
);

let readAttributeSendData =
    (
      shaderLibDataArr,
      (gl, program),
      readAttributesFunc,
      attributeLocationMap,
    ) =>
  shaderLibDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. sendDataArrTuple, {variables}) =>
         variables |> OptionService.isJsonSerializedValueNone ?
           sendDataArrTuple :
           {
             let {attributes} =
               variables |> OptionService.unsafeGetJsonSerializedValue;

             readAttributesFunc(.
               (gl, program, attributeLocationMap),
               sendDataArrTuple,
               attributes,
             );
           },
       ([||], [||]),
     );

let _setToAttributeSendMap =
    (
      shaderIndex,
      attributeLocationMap,
      glslSenderRecord,
      (sendDataArr, instanceSendNoCachableDataArr),
    ) => {
  let {attributeSendDataMap, instanceAttributeSendDataMap} = glslSenderRecord;
  attributeSendDataMap
  |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, sendDataArr)
  |> ignore;
  instanceAttributeSendDataMap
  |> WonderCommonlib.MutableSparseMapService.set(
       shaderIndex,
       instanceSendNoCachableDataArr,
     )
  |> ignore;
  glslSenderRecord;
};

let addAttributeSendData =
    (
      (gl, shaderIndex: int, program: program),
      shaderLibDataArr: shaderLibs,
      readAttributeSendDataFunc,
      (glslSenderRecord, glslLocationRecord),
    ) => {
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|not be added before|j},
                   ~actual={j|be|j},
                 ),
                 () =>
                 glslSenderRecord.attributeSendDataMap
                 |> WonderCommonlib.MutableSparseMapService.get(shaderIndex)
                 |> assertNotExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     ); */
  let attributeLocationMap =
    HandleShaderConfigDataMapService.getOrCreateHashMap(
      glslLocationRecord
      |> AllGLSLLocationService.getAttributeLocationMap(shaderIndex),
    );
  (
    readAttributeSendDataFunc(.
      shaderLibDataArr,
      gl,
      program,
      attributeLocationMap,
    )
    |> _setToAttributeSendMap(
         shaderIndex,
         attributeLocationMap,
         glslSenderRecord,
       ),
    glslLocationRecord
    |> AllGLSLLocationService.setAttributeLocationMap(
         shaderIndex,
         attributeLocationMap,
       ),
  );
};