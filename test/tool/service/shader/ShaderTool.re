open StateDataMainType;

let getShaderRecord = state => state.shaderRecord;

let getShaderIndex = (material, state) => {
  let renderState = CreateRenderStateMainService.createRenderState(state);

  ShaderIndexRenderService.getShaderIndex(
    material,
    ShaderIndexLightMaterialRenderService.getShaderIndex,
    renderState,
  );
};

let getNoMaterialShaderIndex = (shaderName, {shaderRecord}) =>
  NoMaterialShaderIndexAllShaderService.unsafeGetShaderIndex(
    shaderName,
    shaderRecord,
  );