open StateDataType;

open RenderDataType;

let execJob = (_, _, state) =>
  RenderDataSystem.setRenderArray(
    RenderArrayMeshRendererService.getRenderArray(state.meshRendererRecord),
    state
  );