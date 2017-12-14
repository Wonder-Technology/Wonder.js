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
  let sendDataArr = WonderCommonlib.ArraySystem.createEmpty();
  let instanceSendNoCacheableDataArr = WonderCommonlib.ArraySystem.createEmpty();
  shaderLibDataArr
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         ({variables}) =>
           switch variables {
           | None => ()
           | Some({attributes}) =>
             switch attributes {
             | None => ()
             | Some(attributes) =>
               attributes
               |> WonderCommonlib.ArraySystem.forEach(
                    [@bs]
                    (
                      ({name, buffer, type_}) =>
                        switch (name, type_) {
                        | (Some(name), Some(type_)) =>
                          switch buffer {
                          | "instance" =>
                            instanceSendNoCacheableDataArr
                            |> Js.Array.push({
                                 pos:
                                   GLSLLocationSystem.getAttribLocation(
                                     program,
                                     name,
                                     attributeLocationMap,
                                     gl
                                   )
                               })
                            |> ignore
                          | _ =>
                            sendDataArr
                            |> Js.Array.push({
                                 pos:
                                   GLSLLocationSystem.getAttribLocation(
                                     program,
                                     name,
                                     attributeLocationMap,
                                     gl
                                   ),
                                 size: getBufferSizeByType(type_),
                                 buffer,
                                 sendFunc: sendBuffer
                               })
                            |> ignore
                          }
                        | (_, _) =>
                          sendDataArr
                          |> Js.Array.push({
                               pos: 0,
                               size: 0,
                               buffer,
                               sendFunc: bindElementArrayBuffer
                             })
                          |> ignore
                        }
                    )
                  )
             }
           }
       )
     );
  let {attributeSendDataMap, instanceAttributeSendDataMap} = getGLSLSenderData(state);
  attributeSendDataMap |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendDataArr) |> ignore;
  instanceAttributeSendDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCacheableDataArr)
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
    (sendNoCacheableDataArr, sendCacheableDataArr, type_, shaderCacheMap, name, pos, getDataFunc) =>
  /* todo remove Obj.magic? */
  switch type_ {
  | "mat4" =>
    sendNoCacheableDataArr
    |> Js.Array.push(
         {pos, sendNoCacheableDataFunc: sendMatrix4, getNoCacheableDataFunc: getDataFunc |> Obj.magic}: uniformSendNoCacheableData
       )
    |> ignore
  | "vec3" =>
    sendCacheableDataArr
    |> Js.Array.push(
         {
           shaderCacheMap,
           name,
           pos,
           sendCacheableDataFunc: sendFloat3,
           getCacheableDataFunc: getDataFunc |> Obj.magic
         }: uniformSendCacheableData
       )
    |> ignore
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let _addShaderUniformSendDataByType = (sendNoCacheableDataArr, type_, pos, getDataFunc) =>
  switch type_ {
  | "mat4" =>
    sendNoCacheableDataArr
    |> Js.Array.push(
         {pos, sendNoCacheableDataFunc: sendMatrix4, getNoCacheableDataFunc: getDataFunc}: shaderUniformSendNoCacheableData
       )
    |> ignore
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let _addInstanceUniformSendDataByType = (sendNoCacheableDataArr, type_, pos, getDataFunc) =>
  switch type_ {
  | "mat4" =>
    sendNoCacheableDataArr
    |> Js.Array.push(
         {pos, sendNoCacheableDataFunc: sendMatrix4, getNoCacheableDataFunc: getDataFunc}: instanceUniformSendNoCacheableData
       )
    |> ignore
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
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
  let sendNoCacheableDataArr: array(uniformSendNoCacheableData) = WonderCommonlib.ArraySystem.createEmpty();
  let sendCacheableDataArr: array(uniformSendCacheableData) =
    WonderCommonlib.ArraySystem.createEmpty();
  let shaderSendNoCacheableDataArr: array(shaderUniformSendNoCacheableData) =
    WonderCommonlib.ArraySystem.createEmpty();
  let instanceSendNoCacheableDataArr = WonderCommonlib.ArraySystem.createEmpty();
  shaderLibDataArr
  |> WonderCommonlib.ArraySystem.forEach(
       [@bs]
       (
         ({variables}) =>
           switch variables {
           | None => ()
           | Some({uniforms}) =>
             switch uniforms {
             | None => ()
             | Some(uniforms) =>
               uniforms
               |> WonderCommonlib.ArraySystem.forEach(
                    [@bs]
                    (
                      ({name, field, type_, from}) => {
                        let pos =
                          GLSLLocationSystem.getUniformLocation(
                            program,
                            name,
                            uniformLocationMap,
                            gl
                          );
                        switch from {
                        | "camera" =>
                          switch field {
                          | "vMatrix" =>
                            _addShaderUniformSendDataByType(
                              shaderSendNoCacheableDataArr,
                              type_,
                              pos,
                              RenderDataSystem.getCameraVMatrixDataFromState
                            )
                          | "pMatrix" =>
                            _addShaderUniformSendDataByType(
                              shaderSendNoCacheableDataArr,
                              type_,
                              pos,
                              RenderDataSystem.getCameraPMatrixDataFromState
                            )
                          | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
                          }
                        | "material" =>
                          switch field {
                          | "color" =>
                            _addUniformSendDataByType(
                              sendNoCacheableDataArr,
                              sendCacheableDataArr,
                              type_,
                              uniformCacheMap,
                              name,
                              pos,
                              MaterialAdminAci.unsafeGetColor
                            )
                          | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
                          }
                        | "model" =>
                          switch field {
                          | "mMatrix" =>
                            _addUniformSendDataByType(
                              sendNoCacheableDataArr,
                              sendCacheableDataArr,
                              type_,
                              uniformCacheMap,
                              name,
                              pos,
                              _getModelMNoCacheableData
                            )
                          | "instance_mMatrix" =>
                            _addInstanceUniformSendDataByType(
                              instanceSendNoCacheableDataArr,
                              type_,
                              pos,
                              _getModelMNoCacheableData
                            )
                          | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
                          }
                        }
                      }
                    )
                  )
             }
           }
       )
     );
  uniformSendNoCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendNoCacheableDataArr)
  |> ignore;
  uniformSendCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendCacheableDataArr)
  |> ignore;
  shaderUniformSendNoCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendNoCacheableDataArr)
  |> ignore;
  instanceUniformSendNoCacheableDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendNoCacheableDataArr)
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