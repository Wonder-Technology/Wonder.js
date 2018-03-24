open GlType;

open Gl;

open MainStateDataType;

open MainStateDataType;

open SendGLSLDataMainService;

open DrawGLSLMainService;

open RenderConfigType;

let _addModelMatrixInstanceArrayBufferSendData =
    ((gl, program, name, attributeLocationMap), (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({
       pos: GLSLLocationMainService.getAttribLocation(program, name, attributeLocationMap, gl),
       size: 4,
       getOffsetFunc: [@bs] ((index) => index * 16)
     })
);

let _addNormalMatrixInstanceArrayBufferSendData =
    ((gl, program, name, attributeLocationMap), (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({
       pos: GLSLLocationMainService.getAttribLocation(program, name, attributeLocationMap, gl),
       size: 3,
       getOffsetFunc: [@bs] ((index) => (index - 4) * 12 + 64)
     })
);

let _addOtherArrayBufferSendData =
    (
      (gl, program, name, buffer, type_, attributeLocationMap),
      (sendDataArr, instanceSendNoCachableDataArr)
    ) => (
  sendDataArr
  |> ArrayService.push({
       pos: GLSLLocationMainService.getAttribLocation(program, name, attributeLocationMap, gl),
       size: getBufferSizeByType(type_),
       buffer,
       sendFunc: sendBuffer
     }),
  instanceSendNoCachableDataArr
);

let _addElementBufferSendData = (buffer, (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr |> ArrayService.push({pos: 0, size: 0, buffer, sendFunc: bindElementArrayBuffer}),
  instanceSendNoCachableDataArr
);

let _readAttributes = ((gl, program, attributeLocationMap), sendDataArrTuple, attributes) =>
  switch attributes {
  | None => sendDataArrTuple
  | Some(attributes) =>
    attributes
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (sendDataArrTuple, {name, buffer, type_}) =>
             switch (name, type_) {
             | (Some(name), Some(type_)) =>
               switch buffer {
               | "instance_mMatrix" =>
                 _addModelMatrixInstanceArrayBufferSendData(
                   (gl, program, name, attributeLocationMap),
                   sendDataArrTuple
                 )
               | "instance_normalMatrix" =>
                 _addNormalMatrixInstanceArrayBufferSendData(
                   (gl, program, name, attributeLocationMap),
                   sendDataArrTuple
                 )
               | _ =>
                 _addOtherArrayBufferSendData(
                   (gl, program, name, buffer, type_, attributeLocationMap),
                   sendDataArrTuple
                 )
               }
             | (_, _) => _addElementBufferSendData(buffer, sendDataArrTuple)
             }
         ),
         sendDataArrTuple
       )
  };

let _readAttributeSendData = (shaderLibDataArr, gl, program, attributeLocationMap) =>
  shaderLibDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (sendDataArrTuple, {variables}) =>
           switch variables {
           | None => sendDataArrTuple
           | Some({attributes}) =>
             _readAttributes((gl, program, attributeLocationMap), sendDataArrTuple, attributes)
           }
       ),
       ([||], [||])
     );

let _setToAttributeSendMap =
    (shaderIndex, attributeLocationMap, state, (sendDataArr, instanceSendNoCachableDataArr)) => {
  let {attributeSendDataMap, instanceAttributeSendDataMap} = state.glslSenderRecord;
  attributeSendDataMap |> WonderCommonlib.SparseMapService.set(shaderIndex, sendDataArr) |> ignore;
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, instanceSendNoCachableDataArr)
  |> ignore;
  state
};

let addAttributeSendData =
    (
      (gl, shaderIndex: int, program: program),
      shaderLibDataArr: shader_libs,
      state: MainStateDataType.state
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|not be added before|j}, ~actual={j|be|j}),
              () =>
                state.glslSenderRecord.attributeSendDataMap
                |> WonderCommonlib.SparseMapService.get(shaderIndex)
                |> assertNotExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  let attributeLocationMap =
    HandleShaderConfigDataMapService.getOrCreateHashMap(
      state |> GLSLLocationMainService.getAttributeLocationMap(shaderIndex)
    );
  _readAttributeSendData(shaderLibDataArr, gl, program, attributeLocationMap)
  |> _setToAttributeSendMap(shaderIndex, attributeLocationMap, state)
  |> GLSLLocationMainService.setAttributeLocationMap(shaderIndex, attributeLocationMap)
};

let unsafeGetAttributeSendData = (shaderIndex: int, state: MainStateDataType.state) => {
  let {attributeSendDataMap} = state.glslSenderRecord;
  attributeSendDataMap
  |> WonderCommonlib.SparseMapService.unsafeGet(shaderIndex)
  |> WonderLog.Contract.ensureCheck(
       (sendData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|attribute send record exist|j},
                   ~actual={j|not|j}
                 ),
                 () => sendData |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     )
};

let unsafeGetInstanceAttributeSendData = (shaderIndex: int, state: MainStateDataType.state) => {
  let {instanceAttributeSendDataMap} = state.glslSenderRecord;
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapService.unsafeGet(shaderIndex)
  |> WonderLog.Contract.ensureCheck(
       (sendData) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|instance attribute send record exist|j},
                   ~actual={j|not|j}
                 ),
                 () => sendData |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     )
};