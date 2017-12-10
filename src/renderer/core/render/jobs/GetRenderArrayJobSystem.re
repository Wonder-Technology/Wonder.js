open StateDataType;

open RenderDataType;

let getJob = (configData, gl, state) => {
  RenderDataSystem.setRenderArray(MeshRendererAdmin.getRenderArray(state), state);
  state
};