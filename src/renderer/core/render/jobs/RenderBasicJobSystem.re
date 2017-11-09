open StateDataType;

open GlType;

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
             let materialIndexStr =
               Js.Int.toString(materialIndex);
             let shaderIndex = MaterialSystem.getShaderIndex(materialIndex, state);
             let shaderIndexStr =
               Js.Int.toString(MaterialSystem.getShaderIndex(materialIndex, state));
             let state =
               state
               |> ProgramSystem.use(gl, shaderIndexStr)
               |> GLSLSenderConfigDataHandleSystem.getAttributeSendData(materialIndexStr)
               |> ArraySystem.reduceState(
                    [@bs] ((state, sendBufferFunc) => sendBufferFunc(state)),
                    state
                  )
               |> GLSLSenderConfigDataHandleSystem.getUniformSendData(materialIndexStr)
               |> ArraySystem.reduceState(
                    [@bs]
                    (
                      (state, {getArrayDataFunc, sendArrayDataFunc}) => {
                        sendArrayDataFunc(getArrayDataFunc(state));
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