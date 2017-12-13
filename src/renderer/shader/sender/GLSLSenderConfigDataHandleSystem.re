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
  let instanceSendMatrixDataArr = WonderCommonlib.ArraySystem.createEmpty();
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
                            instanceSendMatrixDataArr
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
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendMatrixDataArr)
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
    (sendMatrixDataArr, sendVector3DataArr, type_, shaderCacheMap, name, pos, getDataFunc) =>
  /* todo remove Obj.magic? */
  switch type_ {
  | "mat4" =>
    sendMatrixDataArr
    |> Js.Array.push(
         {pos, sendMatrixDataFunc: sendMatrix4, getMatrixDataFunc: getDataFunc |> Obj.magic}: uniformSendMatrixData
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

let _addShaderUniformSendDataByType = (sendMatrixDataArr, type_, pos, getDataFunc) =>
  switch type_ {
  | "mat4" =>
    sendMatrixDataArr
    |> Js.Array.push(
         {pos, sendMatrixDataFunc: sendMatrix4, getMatrixDataFunc: getDataFunc}: shaderUniformSendMatrixData
       )
    |> ignore
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let _addInstanceUniformSendDataByType = (sendMatrixDataArr, type_, pos, getDataFunc) =>
  switch type_ {
  | "mat4" =>
    sendMatrixDataArr
    |> Js.Array.push(
         {pos, sendMatrixDataFunc: sendMatrix4, getMatrixDataFunc: getDataFunc}: instanceUniformSendMatrixData
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
            getGLSLSenderData(state).uniformSendMatrixDataMap
            |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
            |> assertNotExist
        )
      )
  );
  let {
        uniformSendMatrixDataMap,
        uniformSendVector3DataMap,
        shaderUniformSendMatrixDataMap,
        instanceUniformSendMatrixDataMap
      } as data =
    getGLSLSenderData(state);
  let uniformLocationMap =
    _getOrCreateHashMap(state |> GLSLLocationSystem.getUniformLocationMap(shaderIndex));
  let uniformCacheMap =
    _getOrCreateHashMap(data |> GLSLSenderSendDataUtils.getCacheMap(shaderIndex));
  let sendMatrixDataArr: array(uniformSendMatrixData) = WonderCommonlib.ArraySystem.createEmpty();
  let sendVector3DataArr: array(uniformSendVector3Data) =
    WonderCommonlib.ArraySystem.createEmpty();
  let shaderSendMatrixDataArr: array(shaderUniformSendMatrixData) =
    WonderCommonlib.ArraySystem.createEmpty();
  let instanceSendMatrixDataArr = WonderCommonlib.ArraySystem.createEmpty();
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
                              shaderSendMatrixDataArr,
                              type_,
                              pos,
                              RenderDataSystem.getCameraVMatrixDataFromState
                            )
                          | "pMatrix" =>
                            _addShaderUniformSendDataByType(
                              shaderSendMatrixDataArr,
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
                              sendMatrixDataArr,
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
                              sendMatrixDataArr,
                              sendVector3DataArr,
                              type_,
                              uniformCacheMap,
                              name,
                              pos,
                              _getModelMMatrixData
                            )
                          | "instance_mMatrix" =>
                            _addInstanceUniformSendDataByType(
                              instanceSendMatrixDataArr,
                              type_,
                              pos,
                              _getModelMMatrixData
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
  uniformSendMatrixDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendMatrixDataArr)
  |> ignore;
  uniformSendVector3DataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendVector3DataArr)
  |> ignore;
  shaderUniformSendMatrixDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendMatrixDataArr)
  |> ignore;
  instanceUniformSendMatrixDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, instanceSendMatrixDataArr)
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

let getUniformSendMatrixData = (shaderIndex: int, state: StateDataType.state) =>
  _getUniformSendData(shaderIndex, getGLSLSenderData(state).uniformSendMatrixDataMap);

let getUniformSendVector3Data = (shaderIndex: int, state: StateDataType.state) =>
  _getUniformSendData(shaderIndex, getGLSLSenderData(state).uniformSendVector3DataMap);

let getShaderUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  _getUniformSendData(shaderIndex, getGLSLSenderData(state).shaderUniformSendMatrixDataMap);

let getInstanceUniformSendData = (shaderIndex: int, state: StateDataType.state) =>
  _getUniformSendData(shaderIndex, getGLSLSenderData(state).instanceUniformSendMatrixDataMap);