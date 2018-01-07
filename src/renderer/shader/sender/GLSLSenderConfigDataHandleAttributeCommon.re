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
    ((gl, program, name, attributeLocationMap), (sendDataList, instanceSendNoCachableDataList)) => (
  sendDataList,
  instanceSendNoCachableDataList
  @ [{pos: GLSLLocationSystem.getAttribLocation(program, name, attributeLocationMap, gl)}]
);

let _addOtherArrayBufferSendData =
    (
      (gl, program, name, buffer, type_, attributeLocationMap),
      (sendDataList, instanceSendNoCachableDataList)
    ) => (
  sendDataList
  @ [
    {
      pos: GLSLLocationSystem.getAttribLocation(program, name, attributeLocationMap, gl),
      size: getBufferSizeByType(type_),
      buffer,
      sendFunc: sendBuffer
    }
  ],
  instanceSendNoCachableDataList
);

let _addElementBufferSendData = (buffer, (sendDataList, instanceSendNoCachableDataList)) => (
  sendDataList @ [{pos: 0, size: 0, buffer, sendFunc: bindElementArrayBuffer}],
  instanceSendNoCachableDataList
);

let _readAttributes = ((gl, program, attributeLocationMap), sendDataListTuple, attributes) =>
  switch attributes {
  | None => sendDataListTuple
  | Some(attributes) =>
    attributes
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (sendDataListTuple, {name, buffer, type_}) =>
             switch (name, type_) {
             | (Some(name), Some(type_)) =>
               switch buffer {
               | "instance" =>
                 _addInstanceArrayBufferSendData(
                   (gl, program, name, attributeLocationMap),
                   sendDataListTuple
                 )
               | _ =>
                 _addOtherArrayBufferSendData(
                   (gl, program, name, buffer, type_, attributeLocationMap),
                   sendDataListTuple
                 )
               }
             | (_, _) => _addElementBufferSendData(buffer, sendDataListTuple)
             }
         ),
         sendDataListTuple
       )
  };

let _readAttributeSendData = (shaderLibDataArr, gl, program, attributeLocationMap) =>
  shaderLibDataArr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (sendDataListTuple, {variables}) =>
           switch variables {
           | None => sendDataListTuple
           | Some({attributes}) =>
             _readAttributes((gl, program, attributeLocationMap), sendDataListTuple, attributes)
           }
       ),
       ([], [])
     );

let _setToAttributeSendMap =
    (shaderIndex, attributeLocationMap, state, (sendDataList, instanceSendNoCachableDataList)) => {
  let {attributeSendDataMap, instanceAttributeSendDataMap} = getGLSLSenderData(state);
  attributeSendDataMap |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendDataList) |> ignore;
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCachableDataList)
  |> ignore;
  state
};

let addAttributeSendData =
    (
      gl,
      shaderIndex: int,
      program: program,
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