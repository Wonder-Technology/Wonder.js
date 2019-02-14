let getShaderIndex = (materialIndex, state) =>
  ShaderIndexRenderService.getShaderIndex(
    materialIndex,
    ShaderIndexBasicMaterialRenderService.getShaderIndex,
    CreateRenderStateMainService.createRenderState(state),
  );

let useByShaderIndex = (gl, shaderIndex, state) => {
  let renderState =
    UseProgramRenderService.useByShaderIndex(
      gl,
      shaderIndex,
      CreateRenderStateMainService.createRenderState(state),
    );

  state;
};

let sendAttributeData = (gl, indexTuple, state) => {
  let renderState = CreateRenderStateMainService.createRenderState(state);

  let renderState =
    RenderJobUtils.sendAttributeData(
      gl,
      indexTuple,
      CreateSendRenederDataSubStateRenderService.createState(renderState),
      renderState,
    );

  state;
};

let sendUniformRenderObjectModelData =
    (gl, shaderIndex, transformIndex, state) => {
  let renderState = CreateRenderStateMainService.createRenderState(state);

  let renderState =
    RenderJobUtils.sendUniformRenderObjectModelData(
      gl,
      (shaderIndex, transformIndex),
      (
        CreateGetRenederDataSubStateRenderService.createState(renderState),
        renderState,
      ),
    );

  state;
};

let sendUniformRenderObjectMaterialData =
    (gl, shaderIndex, materialIndex, state) => {
  let renderState = CreateRenderStateMainService.createRenderState(state);

  let renderState =
    RenderJobUtils.sendUniformRenderObjectMaterialData(
      gl,
      (shaderIndex, materialIndex),
      CreateGetRenederDataSubStateRenderService.createState(renderState),
      renderState,
    );

  state;
};

let draw = (gl, meshRendererIndex, geometryIndex, state) => {
  RenderJobUtils.draw(
    gl,
    meshRendererIndex,
    geometryIndex,
    CreateRenderStateMainService.createRenderState(state),
  );

  state;
};