open StateDataType;

open GlType;

open GameObjectType;

open VboBufferType;

let _render = (gl, state: StateDataType.state) => {
  let renderArray = RenderDataSystem.getRenderArrayFromState(state);
  switch (state |> RenderDataSystem.getRenderArrayFromState) {
  | None => state
  | Some(renderArray) =>
    renderArray
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, uid: string) => {
             let materialIndex: int =
               Js.Option.getExn(GameObjectSystem.getMaterialComponent(uid, state));
             let materialIndexStr = Js.Int.toString(materialIndex);
             let shaderIndex = MaterialSystem.unsafeGetShaderIndex(materialIndexStr, state);
             let shaderIndexStr = Js.Int.toString(shaderIndex);
             let geometryIndex: int =
               Js.Option.getExn(GameObjectSystem.getGeometryComponent(uid, state));
             let mappedGeometryIndex =
               GeometryIndexUtils.getMappedIndex(
                 Js.Int.toString(geometryIndex),
                 GeometryIndexUtils.getMappedIndexMap(state)
               );
             let {vertexBufferMap, elementArrayBufferMap} =
               VboBufferStateUtils.getVboBufferData(state);
             let uniformLocationMap =
               Js.Option.getExn(GLSLLocationSystem.getUniformLocationMap(shaderIndexStr, state));
             let program = Js.Option.getExn(ProgramSystem.getProgram(shaderIndexStr, state));
             let state =
               state
               |> ProgramSystem.use(gl, program)
               |> GLSLSenderConfigDataHandleSystem.getAttributeSendData(shaderIndexStr)
               |> ArraySystem.reduceState(
                    [@bs]
                    (
                      (state, {pos, size, buffer, sendFunc}) => {
                        let arrayBuffer =
                          switch buffer {
                          | "vertex" =>
                            ArrayBufferSystem.getOrCreateBuffer(
                              gl,
                              geometryIndex,
                              vertexBufferMap,
                              [@bs] GeometrySystem.getVertices,
                              state
                            )
                          | "index" =>
                            ElementArrayBufferSystem.getOrCreateBuffer(
                              gl,
                              geometryIndex,
                              elementArrayBufferMap,
                              [@bs] GeometrySystem.getIndices,
                              state
                            )
                          | _ => ExceptionHandleSystem.throwMessage({j|unknow buffer:$buffer|j})
                          };
                        [@bs] sendFunc(gl, size, pos, arrayBuffer, state)
                      }
                    ),
                    state
                  )
               |> GLSLSenderConfigDataHandleSystem.getUniformSendData(shaderIndexStr)
               |> ArraySystem.reduceState(
                    [@bs]
                    (
                      (state, {pos, getArrayDataFunc, sendArrayDataFunc}) => {
                        [@bs] sendArrayDataFunc(gl, pos, [@bs] getArrayDataFunc(uid, state));
                        state
                      }
                    ),
                    state
                  );
             GeometrySystem.hasIndices(mappedGeometryIndex, state) ?
               GLSLSenderDrawSystem.drawElement(
                 GeometrySystem.getDrawMode(gl),
                 GeometrySystem.getIndexType(gl),
                 GeometrySystem.getIndexTypeSize(gl),
                 GeometrySystem.getIndicesCount(mappedGeometryIndex, state),
                 gl
               ) :
               GLSLSenderDrawSystem.drawArray(
                 GeometrySystem.getDrawMode(gl),
                 GeometrySystem.getVerticesCount(mappedGeometryIndex, state),
                 gl
               );
             state
           }
         ),
         state
       )
  }
};

let getJob = (configData, gl, state) => _render(gl, state);