open StateDataType;

open GlType;

open GameObjectType;

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
             let shaderIndex = MaterialSystem.getShaderIndex(materialIndexStr, state);
             let shaderIndexStr = Js.Int.toString(shaderIndex);
             let uniformLocationMap =
               Js.Option.getExn(GLSLLocationSystem.getUniformLocationMap(shaderIndexStr, state));
             let program = Js.Option.getExn(ProgramSystem.getProgram(shaderIndexStr, state));
             let state =
               state
               |> ProgramSystem.use(gl, program)
               |> GLSLSenderConfigDataHandleSystem.getAttributeSendData(materialIndexStr)
               |> ArraySystem.reduceState(
                    [@bs]
                    (
                      (state, {pos, size, buffer, sendFunc}) =>
                        sendFunc(gl, size, pos, buffer, state)
                    ),
                    state
                  )
               |> GLSLSenderConfigDataHandleSystem.getUniformSendData(materialIndexStr)
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