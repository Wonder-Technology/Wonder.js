open StateDataType;

open RenderType;

let execJob = (_, _, state) =>
  OperateRenderService.setRenderArray(
    RenderArrayMeshRendererService.getRenderArray(state.meshRendererRecord),
    state
  );