open StateRenderType;

let render =
  [@bs]
  (
    (gl, indexTuple, state) =>
      RenderJobUtils.render(
        gl,
        indexTuple,
        BindAndUpdateMapLightMaterialRenderService.bindAndUpdate,
        state
      )
  );