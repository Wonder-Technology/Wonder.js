open StateDataType;

open RenderDataType;

let getJob = (configData, gl, state) => {
  RenderDataSystem.setRenderArray(MeshRendererSystem.getRenderArray(state), state);
  state
};