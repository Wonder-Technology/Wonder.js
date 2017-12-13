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
  let instanceSendDataArr = WonderCommonlib.ArraySystem.createEmpty();
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
                            instanceSendDataArr
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
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendDataArr)
  |> ignore;
  state |> GLSLLocationSystem.setAttributeLocationMap(shaderIndex, attributeLocationMap)
};

let _getModelMMatrixData =
  [@bs]
  (
    (transform, state: StateDataType.state) =>
      TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state)
  );

let _addUniformSendDataByType =
    (sendArrayDataArr, sendVector3DataArr, type_, shaderCacheMap, name, pos, getDataFunc) =>
  /* todo remove Obj.magic? */
  switch type_ {
  | "mat4" =>
    sendArrayDataArr
    |> Js.Array.push(
         {pos, sendArrayDataFunc: sendMatrix4, getArrayDataFunc: getDataFunc |> Obj.magic}: uniformSendArrayData
       )
    |> ignore
  | "vec3" =>
    sendVector3DataArr
    |> Js.Array.push(
         {
           shaderCacheMap,
           name,
           pos,
           sendVector3DataFunc: sendVector3,
           getVector3DataFunc: getDataFunc |> Obj.magic
         }: uniformSendVector3Data
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
            getGLSLSenderData(state).uniformSendArrayDataMap
            |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
            |> assertNotExist
        )
      )
  );
  let {
        uniformSendArrayDataMap,
        uniformSendVector3DataMap,
        shaderUniformSendDataMap,
        instanceUniformSendDataMap
      } as data =
    getGLSLSenderData(state);
  let uniformLocationMap =
    _getOrCreateHashMap(state |> GLSLLocationSystem.getUniformLocationMap(shaderIndex));
  let uniformCacheMap =
    _getOrCreateHashMap(data |> GLSLSenderSendDataUtils.getCacheMap(shaderIndex));
  let sendArrayDataArr: array(uniformSendArrayData) = WonderCommonlib.ArraySystem.createEmpty();
  let sendVector3DataArr: array(uniformSendVector3Data) =
    WonderCommonlib.ArraySystem.createEmpty();
  let shaderSendDataArr: array(shaderUniformSendData) = WonderCommonlib.ArraySystem.createEmpty();
  let instanceSendDataArr = WonderCommonlib.ArraySystem.createEmpty();
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
                        /* todo refactor: rename */
                        switch from {
                        | "camera" =>
                          /* todo refactor */
                          shaderSendDataArr
                          |> Js.Array.push(
                               {
                                 pos,
                                 sendArrayDataFunc: sendMatrix4,
                                 getArrayDataFunc:
                                   switch field {
                                   | "vMatrix" => RenderDataSystem.getCameraVMatrixDataFromState
                                   | "pMatrix" => RenderDataSystem.getCameraPMatrixDataFromState
                                   | _ =>
                                     ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
                                   }
                               }: shaderUniformSendData
                             )
                          |> ignore
                        | "material" =>
                          switch field {
                          | "color" =>
                            _addUniformSendDataByType(
                              sendArrayDataArr,
                              sendVector3DataArr,
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
                              sendArrayDataArr,
                              sendVector3DataArr,
                              type_,
                              uniformCacheMap,
                              name,
                              pos,
                              _getModelMMatrixData
                            )
                          /*

                           sendArrayDataArr
                           |> Js.Array.push(
                                {
                                  pos,

                                sendArrayDataFunc: _getSendArrayDataFunc,
                                  getArrayDataFunc: _getModelMMatrixData
                                }: uniformSendArrayData
                              )
                           |> ignore */
                          | "instance_mMatrix" =>
                            /* todo refactor */
                            instanceSendDataArr
                            |> Js.Array.push(
                                 {
                                   pos,
                                   sendArrayDataFunc: sendMatrix4,
                                   getArrayDataFunc: _getModelMMatrixData
                                 }: instanceUniformSendData
                               )
                            |> ignore
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
  uniformSendArrayDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendArrayDataArr)
  |> ignore;
  uniformSendVector3DataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendVector3DataArr)
  |> ignore;
  shaderUniformSendDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendDataArr)
  |> ignore;
  instanceUniformSendDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendDataArr)
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

let getUniformSendArrayData = (shaderIndex: int, state: StateDataType.state) =>
  _getUniformSendData(shaderIndex, getGLSLSenderData(state).uniformSendArrayDataMap);

let getUniformSendVector3Data = (shaderIndex: int, state: StateDataType.state) =>
  _getUniformSendData(shaderIndex, getGLSLSenderData(state).uniformSendVector3DataMap);

let getShaderUniformSendData = (shaderIndex: int, state: StateDataType.state) => {
  let {shaderUniformSendDataMap} = getGLSLSenderData(state);
  shaderUniformSendDataMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "shader uniform send data should exist",
             () => {
               let {shaderUniformSendDataMap} = getGLSLSenderData(state);
               shaderUniformSendDataMap
               |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
               |> assertExist
             }
           )
         )
     )
};

let getInstanceUniformSendData = (shaderIndex: int, state: StateDataType.state) => {
  let {instanceUniformSendDataMap} = getGLSLSenderData(state);
  instanceUniformSendDataMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "instance attribute send data should exist",
             () => {
               let {instanceUniformSendDataMap} = getGLSLSenderData(state);
               instanceUniformSendDataMap
               |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
               |> assertExist
             }
           )
         )
     )
};