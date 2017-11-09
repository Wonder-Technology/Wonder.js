open StateDataType;

open GlType;
open GameObjectType;
let _getModelMMatrixData = [@bs] (gameObject: gameObject, state: StateDataType.state) => {
  let transform = Js.Option.getExn(GameObjectSystem.getTransformComponent(gameObject, state));
  TransformSystem.getLocalToWorldMatrix(transform, state)
};


                          let data = Js.Typed_array.Float32Array.create([|
                          
  1.000000000,  0.000000000,  0.000000000,  0.000000000, 
  0.000000000,  1.000000000,  0.000000000,  0.000000000, 
  0.000000000,  0.000000000,  1.000000000,  0.000000000, 
 -152.5246124, -175.5157012,  161.4388885,  1.000000000 
                          |]);

/* todo optimize: curry */
let _render = (gl, state: StateDataType.state) => {
  let renderList = RenderDataSystem.getRenderListFromState(state);
  switch (state |> RenderDataSystem.getRenderListFromState) {
  | None => state
  | Some(renderList) =>
    renderList
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, uid: string) => {
             let materialIndex: int =
               Js.Option.getExn(GameObjectSystem.getMaterialComponent(uid, state));
             let materialIndexStr = Js.Int.toString(materialIndex);
             let shaderIndex = MaterialSystem.getShaderIndex(materialIndex, state);
             let shaderIndexStr =
               Js.Int.toString(MaterialSystem.getShaderIndex(materialIndex, state));
             let uniformLocationMap =
               Js.Option.getExn(GLSLLocationSystem.getUniformLocationMap(shaderIndexStr, state));
             let program = Js.Option.getExn(ProgramSystem.getProgram(shaderIndexStr, state));
             let state =
               state
               |> ProgramSystem.use(gl, program)
               |> GLSLSenderConfigDataHandleSystem.getAttributeSendData(materialIndexStr)
               |> ArraySystem.reduceState(
                    [@bs] ((state, sendBufferFunc) => sendBufferFunc(state)),
                    state
                  )
               |> GLSLSenderConfigDataHandleSystem.getUniformSendData(materialIndexStr)
               |> ArraySystem.reduceState(
                    [@bs]
                    (
                      (state, {name, getArrayDataFunc, sendArrayDataFunc}) => {
                        /* sendArrayDataFunc(getArrayDataFunc(state)); */
                        /* [@bs]
                        sendArrayDataFunc(
                          gl,
                          GLSLLocationSystem.getUniformLocation(
                            program,
                            name,
                            uniformLocationMap,
                            gl
                          ),
                          [@bs] getArrayDataFunc(uid, state)
                        ); */


                        /* [@bs]
                        GLSLSenderSendDataSystem.sendMatrix4( */
                        [@bs]
                        sendArrayDataFunc(
                          gl,
                          GLSLLocationSystem.getUniformLocation(
                            program,
                            name,
                            uniformLocationMap,
                            gl
                          ),
                          [@bs] getArrayDataFunc(uid, state)
/* [@bs]_getModelMMatrixData(uid, state) */
/* [@bs]RenderDataSystem.getCameraPMatrixDataFromState(uid, state) */

                          /* [|
                          
  1.000000000,  0.000000000,  0.000000000,  0.000000000, 
  0.000000000,  1.000000000,  0.000000000,  0.000000000, 
  0.000000000,  0.000000000,  1.000000000,  0.000000000, 
 -152.5246124, -175.5157012,  161.4388885,  1.000000000 
                          |] */
                          /* data */
                        );

                        state
                      }
                    ),
                    state
                  );
             let drawPointsFunc =
               GLSLSenderConfigDataHandleSystem.getDrawPointsFunc(materialIndexStr, state);
             drawPointsFunc(gl);
             state
           }
         ),
         state
       )
  }
};

let getJob = (configData, gl, state) => _render(gl, state);