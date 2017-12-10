open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open Contract;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderDrawUtils;

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
    switch (state |> GLSLLocationSystem.getAttributeLocationMap(shaderIndex)) {
    | None => WonderCommonlib.HashMapSystem.createEmpty()
    | Some(map) => map
    };
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
      TransformUtils.getLocalToWorldMatrixTypeArray(transform, state)
  );

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
            getGLSLSenderData(state).uniformSendDataMap
            |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
            |> assertNotExist
        )
      )
  );
  let uniformLocationMap =
    switch (state |> GLSLLocationSystem.getUniformLocationMap(shaderIndex)) {
    | None => WonderCommonlib.HashMapSystem.createEmpty()
    | Some(map) => map
    };
  let sendDataArr: array(uniformSendData) = WonderCommonlib.ArraySystem.createEmpty();
  let shaderSendDataArr: array(shaderUniformSendData) = WonderCommonlib.ArraySystem.createEmpty();
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
                        let sendArrayDataFunc =
                          switch type_ {
                          | "mat4" => sendMatrix4
                          | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
                          };
                        switch from {
                        | "camera" =>
                          shaderSendDataArr
                          |> Js.Array.push({
                               pos,
                               sendArrayDataFunc,
                               getArrayDataFunc:
                                 switch field {
                                 | "vMatrix" => RenderDataSystem.getCameraVMatrixDataFromState
                                 | "pMatrix" => RenderDataSystem.getCameraPMatrixDataFromState
                                 | _ =>
                                   ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
                                 }
                             })
                          |> ignore
                        | "model" =>
                          sendDataArr
                          |> Js.Array.push(
                               {
                                 pos,
                                 sendArrayDataFunc,
                                 getArrayDataFunc:
                                   switch field {
                                   | "mMatrix" => _getModelMMatrixData
                                   | _ =>
                                     ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
                                   }
                               }: uniformSendData
                             )
                          |> ignore
                        }
                      }
                    )
                  )
             }
           }
       )
     );
  let data = getGLSLSenderData(state);
  data.uniformSendDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, sendDataArr)
  |> ignore;
  data.shaderUniformSendDataMap
  |> WonderCommonlib.SparseMapSystem.set(shaderIndex, shaderSendDataArr)
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

let getUniformSendData = (shaderIndex: int, state: StateDataType.state) => {
  let {uniformSendDataMap} = getGLSLSenderData(state);
  uniformSendDataMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "uniform send data should exist",
             () => {
               let {uniformSendDataMap} = getGLSLSenderData(state);
               uniformSendDataMap
               |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
               |> assertExist
             }
           )
         )
     )
};

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