open StateDataType;

open RenderDataType;

let getJob = (configData, gl, state) => {
  RenderDataSystem.setRenderList(MeshRendererSystem.getRenderList(state), state);
  state
};