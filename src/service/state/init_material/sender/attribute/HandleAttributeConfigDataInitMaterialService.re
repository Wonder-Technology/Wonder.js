open GlType;

open Gl;

open SendGLSLDataService;

open DrawGLSLService;

open RenderConfigType;

open GLSLSenderAllType;

let _addModelMatrixInstanceArrayBufferSendData =
    ((gl, program, name, attributeLocationMap), (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({
       pos: GLSLLocationService.getAttribLocation(program, name, attributeLocationMap, gl),
       size: 4,
       getOffsetFunc: [@bs] ((index) => index * 16)
     })
);

let _addNormalMatrixInstanceArrayBufferSendData =
    ((gl, program, name, attributeLocationMap), (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({
       pos: GLSLLocationService.getAttribLocation(program, name, attributeLocationMap, gl),
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
       pos: GLSLLocationService.getAttribLocation(program, name, attributeLocationMap, gl),
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
    (
      shaderIndex,
      attributeLocationMap,
      glslSenderRecord,
      (sendDataArr, instanceSendNoCachableDataArr)
    ) => {
  let {attributeSendDataMap, instanceAttributeSendDataMap} = glslSenderRecord;
  attributeSendDataMap |> WonderCommonlib.SparseMapService.set(shaderIndex, sendDataArr) |> ignore;
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, instanceSendNoCachableDataArr)
  |> ignore;
  glslSenderRecord
};

let addAttributeSendData =
    (
      (gl, shaderIndex: int, program: program),
      shaderLibDataArr: shader_libs,
      (glslSenderRecord, glslLocationRecord)
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|not be added before|j}, ~actual={j|be|j}),
              () =>
                glslSenderRecord.attributeSendDataMap
                |> WonderCommonlib.SparseMapService.get(shaderIndex)
                |> assertNotExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  let attributeLocationMap =
    HandleShaderConfigDataMapService.getOrCreateHashMap(
      glslLocationRecord |> GLSLLocationService.getAttributeLocationMap(shaderIndex)
    );
  _readAttributeSendData(shaderLibDataArr, gl, program, attributeLocationMap)
  |> _setToAttributeSendMap(shaderIndex, attributeLocationMap, glslSenderRecord)
  |> GLSLLocationService.setAttributeLocationMap(shaderIndex, attributeLocationMap)
};