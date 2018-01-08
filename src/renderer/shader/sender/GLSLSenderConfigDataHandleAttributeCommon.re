open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open Contract;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderDrawUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let _addInstanceArrayBufferSendData =
    ((gl, program, name, attributeLocationMap), (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr,
  instanceSendNoCachableDataArr
  |> ArraySystem.push({
       pos: GLSLLocationSystem.getAttribLocation(program, name, attributeLocationMap, gl)
     })
);

let _addOtherArrayBufferSendData =
    (
      (gl, program, name, buffer, type_, attributeLocationMap),
      (sendDataArr, instanceSendNoCachableDataArr)
    ) => (
  sendDataArr
  |> ArraySystem.push({
       pos: GLSLLocationSystem.getAttribLocation(program, name, attributeLocationMap, gl),
       size: getBufferSizeByType(type_),
       buffer,
       sendFunc: sendBuffer
     }),
  instanceSendNoCachableDataArr
);

let _addElementBufferSendData = (buffer, (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr |> ArraySystem.push({pos: 0, size: 0, buffer, sendFunc: bindElementArrayBuffer}),
  instanceSendNoCachableDataArr
);

let _readAttributes = ((gl, program, attributeLocationMap), sendDataArrTuple, attributes) =>
  switch attributes {
  | None => sendDataArrTuple
  | Some(attributes) =>
    attributes
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (sendDataArrTuple, {name, buffer, type_}) =>
             switch (name, type_) {
             | (Some(name), Some(type_)) =>
               switch buffer {
               | "instance" =>
                 _addInstanceArrayBufferSendData(
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
  |> WonderCommonlib.ArraySystem.reduceOneParam(
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
  let {attributeSendDataMap, instanceAttributeSendDataMap} = getGLSLSenderData(state);
  attributeSendDataMap |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendDataArr) |> ignore;
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCachableDataArr)
  |> ignore;
  state
};

let addAttributeSendData =
    (
      (gl, shaderIndex: int, program: program),
      shaderLibDataArr: shader_libs,
      state: StateDataType.state
    ) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't be added before",
          () =>
            getGLSLSenderData(state).attributeSendDataMap
            |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
            |> assertNotExist
        )
      )
  );
  let attributeLocationMap =
    getOrCreateHashMap(state |> GLSLLocationSystem.getAttributeLocationMap(shaderIndex));
  _readAttributeSendData(shaderLibDataArr, gl, program, attributeLocationMap)
  |> _setToAttributeSendMap(shaderIndex, attributeLocationMap, state)
  |> GLSLLocationSystem.setAttributeLocationMap(shaderIndex, attributeLocationMap)
};

let getAttributeSendData = (shaderIndex: int, state: StateDataType.state) => {
  let {attributeSendDataMap} = getGLSLSenderData(state);
  attributeSendDataMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "attribute send data should exist",
             () => {
               let {attributeSendDataMap} = getGLSLSenderData(state);
               attributeSendDataMap
               |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
               |> assertExist
             }
           )
         )
     )
};

let getInstanceAttributeSendData = (shaderIndex: int, state: StateDataType.state) => {
  let {instanceAttributeSendDataMap} = getGLSLSenderData(state);
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "instance attribute send data should exist",
             () => {
               let {instanceAttributeSendDataMap} = getGLSLSenderData(state);
               instanceAttributeSendDataMap
               |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
               |> assertExist
             }
           )
         )
     )
};