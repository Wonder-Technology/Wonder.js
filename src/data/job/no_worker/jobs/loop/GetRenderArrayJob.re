open MainStateDataType;

open RenderType;

let execJob = (_, _, state) =>
  OperateRenderMainService.setRenderArray(
    RenderArrayMeshRendererService.getRenderArray(state.meshRendererRecord),
    state
  );