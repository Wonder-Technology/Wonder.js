open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open Contract;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderDrawUtils;

let _getOrCreateHashMap = (map) =>
  switch map {
  | None => WonderCommonlib.HashMapSystem.createEmpty()
  | Some(map) => map
  };

let _addInstanceArrayBufferSendData =
    (gl, program, name, attributeLocationMap, (sendDataList, instanceSendNoCacheableDataList)) => (
  sendDataList,
  instanceSendNoCacheableDataList
  @ [{pos: GLSLLocationSystem.getAttribLocation(program, name, attributeLocationMap, gl)}]
);

let _addOtherArrayBufferSendData =
    (
      gl,
      program,
      name,
      buffer,
      type_,
      attributeLocationMap,
      (sendDataList, instanceSendNoCacheableDataList)
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
  instanceSendNoCacheableDataList
);

let _addElementBufferSendData = (buffer, (sendDataList, instanceSendNoCacheableDataList)) => (
  sendDataList @ [{pos: 0, size: 0, buffer, sendFunc: bindElementArrayBuffer}],
  instanceSendNoCacheableDataList
);

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
    _getOrCreateHashMap(state |> GLSLLocationSystem.getAttributeLocationMap(shaderIndex));
  let (sendDataList, instanceSendNoCacheableDataList) =
    shaderLibDataArr
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (sendDataListTuple, {variables}) =>
             switch variables {
             | None => sendDataListTuple
             | Some({attributes}) =>
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
                                gl,
                                program,
                                name,
                                attributeLocationMap,
                                sendDataListTuple
                              )
                            | _ =>
                              _addOtherArrayBufferSendData(
                                gl,
                                program,
                                name,
                                buffer,
                                type_,
                                attributeLocationMap,
                                sendDataListTuple
                              )
                            }
                          | (_, _) => _addElementBufferSendData(buffer, sendDataListTuple)
                          }
                      ),
                      sendDataListTuple
                    )
               }
             }
         ),
         ([], [])
       );
  let {attributeSendDataMap, instanceAttributeSendDataMap} = getGLSLSenderData(state);
  attributeSendDataMap |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendDataList) |> ignore;
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCacheableDataList)
  |> ignore;
  state |> GLSLLocationSystem.setAttributeLocationMap(shaderIndex, attributeLocationMap)
};

let _getModelMNoCacheableData =
  [@bs]
  (
    (transform, state: StateDataType.state) =>
      TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state)
  );

let _addUniformSendDataByType =
    (
      type_,
      shaderCacheMap,
      name,
      pos,
      (
        sendNoCacheableDataList,
        sendCacheableDataList,
        shaderSendNoCacheableDataList,
        instanceSendNoCacheableDataList
      ),
      getDataFunc
    ) =>
  /* todo remove Obj.magic? */
  switch type_ {
  | "mat4" => (
      [
        (
          {
            pos,
            sendNoCacheableDataFunc: sendMatrix4,
            getNoCacheableDataFunc: getDataFunc |> Obj.magic
          }: uniformSendNoCacheableData
        ),
        ...sendNoCacheableDataList
      ],
      sendCacheableDataList,
      shaderSendNoCacheableDataList,
      instanceSendNoCacheableDataList
    )
  | "vec3" => (
      sendNoCacheableDataList,
      [
        (
          {
            shaderCacheMap,
            name,
            pos,
            sendCacheableDataFunc: sendFloat3,
            getCacheableDataFunc: getDataFunc |> Obj.magic
          }: uniformSendCacheableData
        ),
        ...sendCacheableDataList
      ],
      shaderSendNoCacheableDataList,
      instanceSendNoCacheableDataList
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let _addShaderUniformSendDataByType =
    (
      type_,
      pos,
      (
        sendNoCacheableDataList,
        sendCacheableDataList,
        shaderSendNoCacheableDataList,
        instanceSendNoCacheableDataList
      ),
      getDataFunc
    ) =>
  switch type_ {
  | "mat4" => (
      sendNoCacheableDataList,
      sendCacheableDataList,
      [
        (
          {pos, sendNoCacheableDataFunc: sendMatrix4, getNoCacheableDataFunc: getDataFunc}: shaderUniformSendNoCacheableData
        ),
        ...shaderSendNoCacheableDataList
      ],
      instanceSendNoCacheableDataList
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let _addInstanceUniformSendDataByType =
    (
      type_,
      pos,
      (
        sendNoCacheableDataList,
        sendCacheableDataList,
        shaderSendNoCacheableDataList,
        instanceSendNoCacheableDataList
      ),
      getDataFunc
    ) =>
  switch type_ {
  | "mat4" => (
      sendNoCacheableDataList,
      sendCacheableDataList,
      shaderSendNoCacheableDataList,
      [
        (
          {pos, sendNoCacheableDataFunc: sendMatrix4, getNoCacheableDataFunc: getDataFunc}: instanceUniformSendNoCacheableData
        ),
        ...instanceSendNoCacheableDataList
      ]
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let _addCameraSendData = (field, pos, type_, sendDataListTuple) =>
  switch field {
  | "vMatrix" =>
    _addShaderUniformSendDataByType(
      type_,
      pos,
      sendDataListTuple,
      RenderDataSystem.getCameraVMatrixDataFromState
    )
  | "pMatrix" =>
    _addShaderUniformSendDataByType(
      type_,
      pos,
      sendDataListTuple,
      RenderDataSystem.getCameraPMatrixDataFromState
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
  };

let _addMaterialSendData = (field, pos, name, type_, uniformCacheMap, sendDataListTuple) =>
  switch field {
  | "color" =>
    _addUniformSendDataByType(
      type_,
      uniformCacheMap,
      name,
      pos,
      sendDataListTuple,
      MaterialAdminAci.unsafeGetColor
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
  };

let _addModelSendData = (field, pos, name, type_, uniformCacheMap, sendDataListTuple) =>
  switch field {
  | "mMatrix" =>
    _addUniformSendDataByType(
      type_,
      uniformCacheMap,
      name,
      pos,
      sendDataListTuple,
      _getModelMNoCacheableData
    )
  | "instance_mMatrix" =>
    _addInstanceUniformSendDataByType(type_, pos, sendDataListTuple, _getModelMNoCacheableData)
  | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
  };

let addUniformSendData =
    (
      gl,
      shaderIndex: int,
      program: program,
      shaderLibDataArr: shader_libs,
      state: StateDataType.state
    )
    : StateDataType.state => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't be added before",
          () =>
            getGLSLSenderData(state).uniformSendNoCacheableDataMap
            |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
            |> assertNotExist
        )
      )
  );
  let {
        uniformSendNoCacheableDataMap,
        uniformSendCacheableDataMap,
        shaderUniformSendNoCacheableDataMap,
        instanceUniformSendNoCacheableDataMap
      } as data =
    getGLSLSenderData(state);
  let uniformLocationMap =
    _getOrCreateHashMap(state |> GLSLLocationSystem.getUniformLocationMap(shaderIndex));
  let uniformCacheMap =
    _getOrCreateHashMap(data |> GLSLSenderSendDataUtils.getCacheMap(shaderIndex));
  let (
    sendNoCacheableDataList,
    sendCacheableDataList,
    shaderSendNoCacheableDataList,
    instanceSendNoCacheableDataList
  ) =
    shaderLibDataArr
    |> ArraySystem.reduceOneParam(
         [@bs]
         (
           (sendDataListTuple, {variables}) =>
             switch variables {
             | None => sendDataListTuple
             | Some({uniforms}) =>
               switch uniforms {
               | None => sendDataListTuple
               | Some(uniforms) =>
                 uniforms
                 |> WonderCommonlib.ArraySystem.reduceOneParam(
                      [@bs]
                      (
                        (sendDataListTuple, {name, field, type_, from}) => {
                          let pos =
                            GLSLLocationSystem.getUniformLocation(
                              program,
                              name,
                              uniformLocationMap,
                              gl
                            );
                          switch from {
                          | "camera" => _addCameraSendData(field, pos, type_, sendDataListTuple)
                          | "material" =>
                            _addMaterialSendData(
                              field,
                              pos,
                              name,
                              type_,
                              uniformCacheMap,
                              sendDataListTuple
                            )
                          | "model" =>
                            _addModelSendData(
                              field,
                              pos,
                              name,
                              type_,
                              uniformCacheMap,
                              sendDataListTuple
                            )
                          | _ => ExceptionHandleSystem.throwMessage({j|unknow from:$from|j})
                          }
                        }
                      ),
                      sendDataListTuple
                    )
               }
             }
         ),
         ([], [], [], [])
       );
  uniformSendNoCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendNoCacheableDataList)
  |> ignore;
  uniformSendCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendCacheableDataList)
  |> ignore;
  shaderUniformSendNoCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendNoCacheableDataList)
  |> ignore;
  instanceUniformSendNoCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCacheableDataList)
  |> ignore;
  state |> GLSLLocationSystem.setUniformLocationMap(shaderIndex, uniformLocationMap)
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

let _getUniformSendData = (shaderIndex: int, map) =>
  map
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "uniform send data should exist",
             () => map |> WonderCommonlib.SparseMapSystem.get(shaderIndex) |> assertExist
           )
         )
     );

let getUniformSendNoCacheableData = (shaderIndex: int, state: StateDataType.state) =>
  _getUniformSendData(shaderIndex, getGLSLSenderData(state).uniformSendNoCacheableDataMap);

let getUniformSendCacheableData = (shaderIndex: int, state: StateDataType.state) =>
  _getUniformSendData(shaderIndex, getGLSLSenderData(state).uniformSendCacheableDataMap);

let getShaderUniformSendNoCacheableData = (shaderIndex: int, state: StateDataType.state) =>
  _getUniformSendData(shaderIndex, getGLSLSenderData(state).shaderUniformSendNoCacheableDataMap);

let getInstanceUniformSendNoCacheableData = (shaderIndex: int, state: StateDataType.state) =>
  _getUniformSendData(shaderIndex, getGLSLSenderData(state).instanceUniformSendNoCacheableDataMap);