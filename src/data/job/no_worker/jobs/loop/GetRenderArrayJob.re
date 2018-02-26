open StateDataType;

open RenderDataType;

let execJob = (_, _, state) =>
  RenderDataSystem.setRenderArray(MeshRendererAdmin.getRenderArray(state), state);