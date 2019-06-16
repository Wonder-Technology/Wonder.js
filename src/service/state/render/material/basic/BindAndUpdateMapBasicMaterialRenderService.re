open StateRenderType;

open RenderBasicMaterialType;

let bindAndUpdate =
  (.
    gl: WonderWebgl.GlType.webgl1Context,
    material: int,
    state: StateRenderType.renderState,
  ) => state;