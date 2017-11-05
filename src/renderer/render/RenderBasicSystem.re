open StateDataType;

open GlType;

/* todo optimize: curry */
let render = (gl, state: StateDataType.state) => {
  let renderList = RenderDataSystem.getRenderListFromState(state);
  state
  |> RenderDataSystem.getRenderListFromState
  |> Js.Array.reduce(
       (state, uid: string) => {
         let materialIndex: int =
           Js.Option.getExn(GameObjectSystem.getMaterialComponent(uid, state));
         let shaderIndex = MaterialSystem.getShaderIndex(materialIndex, state);
         let shaderIndexStr = Js.Int.toString(MaterialSystem.getShaderIndex(materialIndex, state));
         let program = ProgramSystem.use(gl, shaderIndexStr, state);
         let state =
           state
           |> GLSLSenderSystem.disableVertexAttribArray(gl)
           |> GLSLSenderSystem.getAttributeSendData(shaderIndexStr)
           |> Js.Array.reduce((state, sendBufferFunc) => sendBufferFunc(state), state);
         let state =
           state
           |> GLSLSenderSystem.getUniformSendData(shaderIndexStr)
           |> Js.Array.reduce(
                (state, {getArrayDataFunc, sendArrayDataFunc}) => {
                  sendArrayDataFunc(getArrayDataFunc(state));
                  state
                },
                state
              );
         let drawPointsFunc = GLSLSenderSystem.getDrawPointsFunc(shaderIndexStr, state);
         drawPointsFunc(gl);
         state
       },
       state
     )
};