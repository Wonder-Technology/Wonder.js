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
  let {vertexAttribHistoryArray} = _getGLSLSenderData(state);
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  vertexAttribPointer(pos, size, getFloat(gl), Js.false_, 0, 0, gl);
  /* let posStr = Js.Int.toString(pos); */
  /* switch (HashMapSystem.get(posStr, vertexAttribHistoryArray)) {
     | Some(value) when value != true =>
       enableVertexAttribArray(pos, gl);
       HashMapSystem.set(posStr, true, vertexAttribHistoryArray) |> ignore
     | _ => ()
     } */
  if (vertexAttribHistoryArray[pos] != true) {
    enableVertexAttribArray(pos, gl);
    vertexAttribHistoryArray[pos] = true;
    state
  } else {
    state
  }
};

let _bindIndexBuffer = (gl, buffer, state: StateDataType.state) => {
  bindBuffer(getElementArrayBuffer(gl), buffer, gl);
  state
};

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
  |> Js.Array.forEach(
       ({variables}) =>
         switch variables {
         | None => ()
         | Some({attributes}) =>
           switch attributes {
           | None => ()
           | Some(attributes) =>
             attributes
             |> Js.Array.forEach(
                  ({name, buffer, type_}) =>
                    switch (name, type_) {
                    | (Some(name), Some(type_)) =>
                      sendDataArr
                      |> Js.Array.push(
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
                      |> Js.Array.push(
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

let _sendMatrix4 = (gl, pos: int, data: Js.Array.t(float)) =>
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
  |> Js.Array.forEach(
       ({variables}) =>
         switch variables {
         | None => ()
         | Some({uniforms}) =>
           switch uniforms {
           | None => ()
           | Some(uniforms) =>
             uniforms
             |> Js.Array.forEach(
                  ({name, field, type_, from}) =>
                    sendDataArr
                    |> Js.Array.push({
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

/* todo optimize? */
let disableVertexAttribArray = (gl, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "vertexAttribHistory should has no hole",
          () => {
            let {vertexAttribHistoryArray} = _getGLSLSenderData(state);
            vertexAttribHistoryArray
            |> Js.Array.filter((pos) => pos != true || pos != false)
            |> Js.Array.length == 0
          }
        )
      )
  );
  let {vertexAttribHistoryArray} as data = _getGLSLSenderData(state);
  vertexAttribHistoryArray
  |> Js.Array.forEachi(
       (isEnable: bool, pos: int) =>
         isEnable ?
           disableVertexAttribArray(pos, gl) :
           /* if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) { */
           ExceptionHandlerSystem.throwMessage("should always be true")
     );
  data.vertexAttribHistoryArray = ArraySystem.createEmpty();
  state
};

let getAttributeSendData = (shaderIndexStr: string, state: StateDataType.state) => {
  let {attributeSendDataMap} = _getGLSLSenderData(state);
  attributeSendDataMap
  |> HashMapSystem.unsafeGet(shaderIndexStr)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test
             /* ("attribute send data should exist", () => Js.Nullable.to_opt(r) |> assertExist) */
             (
               "attribute send data should exist",
               () => {
                 let {attributeSendDataMap} = _getGLSLSenderData(state);
                 attributeSendDataMap |> HashMapSystem.get(shaderIndexStr) |> assertExist
               }
             )
         )
     )
};

let getUniformSendData = (shaderIndexStr: string, state: StateDataType.state) => {
  let {uniformSendDataMap} = _getGLSLSenderData(state);
  uniformSendDataMap
  |> HashMapSystem.unsafeGet(shaderIndexStr)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "uniform send data should exist",
             () => {
               let {uniformSendDataMap} = _getGLSLSenderData(state);
               uniformSendDataMap |> HashMapSystem.get(shaderIndexStr) |> assertExist
             }
           )
         )
     )
};

let getDrawPointsFunc = (shaderIndexStr: string, state: StateDataType.state) => {
  let {drawPointsFuncMap} = _getGLSLSenderData(state);
  drawPointsFuncMap
  |> HashMapSystem.unsafeGet(shaderIndexStr)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "draw points func should exist",
             () => {
               let {drawPointsFuncMap} = _getGLSLSenderData(state);
               drawPointsFuncMap |> HashMapSystem.get(shaderIndexStr) |> assertExist
             }
           )
         )
     )
};

let initData = () => {
  attributeSendDataMap: HashMapSystem.createEmpty(),
  uniformSendDataMap: HashMapSystem.createEmpty(),
  drawPointsFuncMap: HashMapSystem.createEmpty(),
  vertexAttribHistoryArray: ArraySystem.createEmpty()
};