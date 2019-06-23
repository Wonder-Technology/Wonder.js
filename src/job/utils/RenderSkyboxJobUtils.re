let getRenderData =
    (skyboxGameObject, {gameObjectRecord}: StateDataMainType.state) => (
  GetComponentGameObjectService.unsafeGetTransformComponent(
    skyboxGameObject,
    gameObjectRecord,
  ),
  GetComponentGameObjectService.unsafeGetGeometryComponent(
    skyboxGameObject,
    gameObjectRecord,
  ),
);

let _prepareGlState =
    (gl, ({deviceManagerRecord}: StateRenderType.renderState) as state) => {
  let deviceManagerRecord =
    deviceManagerRecord
    |> AllDeviceManagerService.setDepthFunc(
         gl,
         gl |> WonderWebgl.Gl.getLEqual,
       )
    |> AllDeviceManagerService.setSide(gl, AllDeviceManagerType.BACK);

  {...state, deviceManagerRecord};
};

let _sendUniformNoMaterialShaderData =
    (
      gl,
      shaderIndex,
      getRenderDataSubState,
      ({glslSenderRecord}: StateRenderType.renderState) as state,
    ) => {
  glslSenderRecord
  |> HandleNoMaterialShaderUniformConfigDataService.unsafeGetUniformSendData(
       shaderIndex,
     )
  |> WonderCommonlib.ArrayService.forEach(
       (.
         {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: AllGLSLSenderType.uniformNoMaterialShaderSendData,
       ) =>
       AllGLSLLocationService.isUniformLocationExist(pos) ?
         switch (name) {
         | "u_skyboxVMatrix" =>
           (Obj.magic(sendDataFunc))(.
             gl,
             pos,
             getDataFunc(. getRenderDataSubState),
           )
         | _ =>
           (Obj.magic(sendDataFunc))(.
             gl,
             shaderCacheMap,
             (name, pos),
             getDataFunc(. getRenderDataSubState),
           )
         } :
         ()
     );

  state;
};

let _draw =
    (
      gl,
      shaderIndex,
      (transformIndex, geometryIndex),
      state: StateRenderType.renderState,
    ) => {
  let sendRenderDataSubState =
    CreateSendRenederDataSubStateRenderService.createState(state);

  RenderJobUtils.sendAttributeData(
    gl,
    (shaderIndex, geometryIndex),
    sendRenderDataSubState,
    state,
  );

  let getRenderDataSubState =
    CreateGetRenederDataSubStateRenderService.createState(state);

  _sendUniformNoMaterialShaderData(
    gl,
    shaderIndex,
    getRenderDataSubState,
    state,
  );

  state
  |> RenderJobUtils.draw(gl, gl |> WonderWebgl.Gl.getTriangles, geometryIndex);

  state;
};

let _restoreGlState =
    (gl, ({deviceManagerRecord}: StateRenderType.renderState) as state) => {
  let deviceManagerRecord =
    deviceManagerRecord
    |> AllDeviceManagerService.setDepthFunc(gl, gl |> WonderWebgl.Gl.getLess)
    |> AllDeviceManagerService.setSide(gl, AllDeviceManagerType.FRONT);

  {...state, deviceManagerRecord};
};

let exec =
    (
      gl,
      cubemapTextureOpt,
      renderSkyboxGameObjectData,
      renderState: StateRenderType.renderState,
    ) =>
  switch (cubemapTextureOpt) {
  | Some(cubemapTexture) =>
    let target = gl |> WonderWebgl.Gl.getTextureCubeMap;

    let renderState =
      renderState
      |> BindAndUpdateCubemapTextureRenderService.bindAndUpdate(
           gl,
           cubemapTexture,
         );

    let drawSkyboxShaderIndex =
      NoMaterialShaderIndexAllShaderService.unsafeGetShaderIndex(
        "skybox",
        renderState.shaderRecord,
      );

    renderState
    |> _prepareGlState(gl)
    |> UseProgramRenderService.useByShaderIndex(gl, drawSkyboxShaderIndex)
    |> _draw(gl, drawSkyboxShaderIndex, renderSkyboxGameObjectData)
    |> _restoreGlState(gl);
  | None => renderState
  };