open StateDataType;

open RenderDataType;

let execJob = (configData, gl, state) =>
  RenderDataSystem.setRenderArray(MeshRendererAdmin.getRenderArray(state), state);