open StateDataType;

open Contract;

open GlType;

open Gl;

open Js.Typed_array;

let _getGLSLSenderData = (state: StateDataType.state) => state.glslSenderData;

let _getBufferSizeByType = (type_: string) =>
  switch type_ {
  | "vec2" => 2
  | "vec3" => 3
  | _ => ExceptionHandlerSystem.throwMessage({j|invalide type_:$type_|j})
  };

let _sendBuffer = (gl, size: int, pos: int, buffer: buffer, state: StateDataType.state) => {
  let vertexAttribHistoryMap = _getGLSLSenderData(state).vertexAttribHistoryMap;
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  vertexAttribPointer(pos, size, getFloat(gl), Js.false_, 0, 0, gl);
  let posStr = Js.Int.toString(pos);
  switch (HashMapSystem.get(posStr, vertexAttribHistoryMap)) {
  | Some(value) when value != true =>
    enableVertexAttribArray(pos, gl);
    HashMapSystem.set(posStr, true, vertexAttribHistoryMap) |> ignore
  | _ => ()
  }
};

let _bindIndexBuffer = (gl, buffer, state: StateDataType.state) =>
  bindBuffer(getElementArrayBuffer(gl), buffer, gl);

let addAttributeSendData =
    (
      gl,
      shaderIndex: int,
      geometryIndex: int,
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
            _getGLSLSenderData(state).attributeSendDataMap
            |> HashMapSystem.get(Js.Int.toString(shaderIndex))
            |> assertNotExist
        )
      )
  );
  let sendDataArr = ArraySystem.createEmpty();
  shaderLibDataArr
  |> ArraySystem.forEach(
       ({variables}) =>
         switch variables {
         | None => ()
         | Some({attributes}) =>
           switch attributes {
           | None => ()
           | Some(attributes) =>
             attributes
             |> ArraySystem.forEach(
                  ({name, buffer, type_}) =>
                    switch (name, type_) {
                    | (Some(name), Some(type_)) =>
                      sendDataArr
                      |> ArraySystem.push(
                           _sendBuffer(
                             gl,
                             _getBufferSizeByType(type_),
                             getAttribLocation(program, name, gl),
                             switch buffer {
                             | "vertex" =>
                               ArrayBufferSystem.createBuffer(
                                 gl,
                                 geometryIndex,
                                 GeometrySystem.getVertices(geometryIndex, state)
                               )
                             }
                           )
                         )
                      |> ignore
                    | (_, _) =>
                      sendDataArr
                      |> ArraySystem.push(
                           _bindIndexBuffer(
                             gl,
                             switch buffer {
                             | "index" =>
                               ElementArrayBufferSystem.createBuffer(
                                 gl,
                                 geometryIndex,
                                 GeometrySystem.getIndices(geometryIndex, state)
                               )
                             }
                           )
                         )
                      |> ignore
                    }
                )
           }
         }
     );
  _getGLSLSenderData(state).attributeSendDataMap
  |> HashMapSystem.set(Js.Int.toString(shaderIndex), sendDataArr)
  |> ignore;
  state
};

let _getModelMMatrixData = (uid: string, state: StateDataType.state) =>
  TransformSystem.getLocalToWorldMatrix(
    Js.Option.getExn(GameObjectSystem.getTransformComponent(uid, state)),
    state
  );

let _sendMatrix4 = (gl, pos: int, data: ArraySystem.t(float)) =>
  uniformMatrix4fv(pos, Js.false_, data, gl);

/* todo optimize: send uniform judge cache data */
let addUniformSendData =
    (
      gl,
      shaderIndex: int,
      geometryIndex: int,
      uid: string,
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
            _getGLSLSenderData(state).uniformSendDataMap
            |> HashMapSystem.get(Js.Int.toString(shaderIndex))
            |> assertNotExist
        )
      )
  );
  let sendDataArr = ArraySystem.createEmpty();
  shaderLibDataArr
  |> ArraySystem.forEach(
       ({variables}) =>
         switch variables {
         | None => ()
         | Some({uniforms}) =>
           switch uniforms {
           | None => ()
           | Some(uniforms) =>
             uniforms
             |> ArraySystem.forEach(
                  ({name, field, type_, from}) =>
                    sendDataArr
                    |> ArraySystem.push({
                         getArrayDataFunc:
                           switch from {
                           | "camera" =>
                             switch field {
                             | "vMatrix" => RenderDataSystem.getCameraVMatrixDataFromState
                             | "pMatrix" => RenderDataSystem.getCameraPMatrixDataFromState
                             }
                           | "model" =>
                             switch field {
                             | "mMatrix" => _getModelMMatrixData(uid)
                             }
                           },
                         sendArrayDataFunc:
                           switch type_ {
                           | "mat4" => _sendMatrix4(gl, getUniformLocation(program, name, gl))
                           }
                       })
                    |> ignore
                )
           }
         }
     );
  _getGLSLSenderData(state).uniformSendDataMap
  |> HashMapSystem.set(Js.Int.toString(shaderIndex), sendDataArr)
  |> ignore;
  state
};

let _drawElement = (drawMode: int, type_: int, typeSize: int, indicesCount: int, gl) => {
  let startOffset = 0;
  drawElements(drawMode, indicesCount, type_, typeSize * startOffset, gl);
  ()
};

let _drawArray = (drawMode: int, verticesCount: int, gl) => {
  let startOffset = 0;
  drawArray(drawMode, startOffset, verticesCount, gl);
  ()
};

let addDrawPointsFunc = (gl, shaderIndex: int, geometryIndex: int, state: StateDataType.state) => {
  _getGLSLSenderData(state).drawPointsFuncMap
  |> HashMapSystem.set(
       Js.Int.toString(shaderIndex),
       GeometrySystem.hasIndices(geometryIndex, state) ?
         _drawElement(
           GeometrySystem.getDrawMode(gl),
           GeometrySystem.getIndexType(gl),
           GeometrySystem.getIndexTypeSize(gl),
           GeometrySystem.getIndicesCount(geometryIndex, state)
         ) :
         _drawArray(
           GeometrySystem.getDrawMode(gl),
           GeometrySystem.getVerticesCount(geometryIndex, state)
         )
     )
  |> ignore;
  state
};

let initData = () => {
  attributeSendDataMap: HashMapSystem.createEmpty(),
  uniformSendDataMap: HashMapSystem.createEmpty(),
  drawPointsFuncMap: HashMapSystem.createEmpty(),
  vertexAttribHistoryMap: HashMapSystem.createEmpty()
};