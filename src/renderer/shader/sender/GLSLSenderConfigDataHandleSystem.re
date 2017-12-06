open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open Contract;

open GLSLSenderStateSystem;

open GLSLSenderSendDataSystem;

open GLSLSenderDrawSystem;

let addAttributeSendData =
    (
      gl,
      shaderIndex: int,
      /* geometryIndex: int, */
      program: program,
      shaderLibDataArr: shader_libs,
      /* attributeLocationMap, */
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
                        | (Some(name), Some("instance")) =>
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
                        | (Some(name), Some(type_)) =>
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
                               /* switch buffer {
                                  | "vertex" =>
                                    ArrayBufferSystem.createBuffer(
                                      gl,
                                      geometryIndex,
                                      GeometrySystem.getVertices(geometryIndex, state)
                                    )
                                  | _ =>
                                    ExceptionHandleSystem.throwMessage({j|unknow buffer:$buffer|j})
                                  }, */
                               sendFunc: sendBuffer
                             })
                          /* sendBuffer(
                               gl,
                               getBufferSizeByType(type_),
                               GLSLLocationSystem.getAttribLocation(
                                 program,
                                 name,
                                 attributeLocationMap,
                                 gl
                               ),
                               switch buffer {
                               | "vertex" =>
                                 ArrayBufferSystem.createBuffer(
                                   gl,
                                   geometryIndex,
                                   GeometrySystem.getVertices(geometryIndex, state)
                                 )
                               }
                             )*/
                          |> ignore
                        | (_, _) =>
                          sendDataArr
                          |> Js.Array.push
                               /* bindElementArrayBuffer(
                                    gl,
                                    switch buffer {
                                    | "index" =>
                                      ElementArrayBufferSystem.createBuffer(
                                        gl,
                                        geometryIndex,
                                        GeometrySystem.getIndices(geometryIndex, state)
                                      )
                                    }
                                  ) */
                               /* pos: Obj.magic(0), */
                               /* bufferSize: 0, */
                               ({
                                 pos: 0,
                                 size: 0,
                                 buffer,
                                 /* switch buffer {
                                    | "index" =>
                                      ElementArrayBufferSystem.createBuffer(
                                        gl,
                                        geometryIndex,
                                        GeometrySystem.getIndices(geometryIndex, state)
                                      )
                                    | _ =>
                                      ExceptionHandleSystem.throwMessage(
                                        {j|unknow buffer:$buffer|j}
                                      )
                                    }, */
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
    (gameObject: gameObject, state: StateDataType.state) => {
      let transform =
        Js.Option.getExn(GameObjectComponentSystem.getTransformComponent(gameObject, state));
      TransformSystem.getLocalToWorldMatrix(transform, state)
    }
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

/* let addDrawPointsFunc =
       (gl, materialIndex: int, geometryIndex: int, state: StateDataType.state) => {
     /* getGLSLSenderData(state).drawPointsFuncMap
     |> WonderCommonlib.SparseMapSystem.set(
          materialIndex,
          GeometrySystem.hasIndices(geometryIndex, state) ?
            drawElement(
              GeometrySystem.getDrawMode(gl),
              GeometrySystem.getIndexType(gl),
              GeometrySystem.getIndexTypeSize(gl),
              GeometrySystem.getIndicesCount(geometryIndex, state)
            ) :
            drawArray(
              GeometrySystem.getDrawMode(gl),
              GeometrySystem.getVerticesCount(geometryIndex, state)
            )
        )
     |> ignore; */
     state
   }; */
let getAttributeSendData = (shaderIndex: int, state: StateDataType.state) => {
  let {attributeSendDataMap} = getGLSLSenderData(state);
  attributeSendDataMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(shaderIndex)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test
             /* ("attribute send data should exist", () => Js.Nullable.to_opt(r) |> assertExist) */
             (
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
/* let getDrawPointsFunc = (materialIndex: int, state: StateDataType.state) => {
   let gl = [@bs]DeviceManagerSystem.getGl(state);
     drawElement(
              GeometrySystem.getDrawMode(gl),
              GeometrySystem.getIndexType(gl),
              GeometrySystem.getIndexTypeSize(gl),
              /* GeometrySystem.getIndicesCount(geometryIndex, state) */
              /* GeometrySystem.getIndicesCount(geometryIndex, state) */
              36
     )
     /* let {drawPointsFuncMap} = getGLSLSenderData(state);
     drawPointsFuncMap
     |> WonderCommonlib.SparseMapSystem.unsafeGet(materialIndex)
     |> ensureCheck(
          (r) =>
            Contract.Operators.(
              test(
                "draw points func should exist",
                () => {
                  let {drawPointsFuncMap} = getGLSLSenderData(state);
                  drawPointsFuncMap
                  |> WonderCommonlib.SparseMapSystem.get(materialIndex)
                  |> assertExist
                }
              )
            )
        ) */
   }; */