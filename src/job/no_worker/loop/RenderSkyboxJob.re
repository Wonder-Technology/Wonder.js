open StateDataMainType;

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

let _getRenderData = (skyboxGameObject, {gameObjectRecord}) => (
  GetComponentGameObjectService.unsafeGetTransformComponent(
    skyboxGameObject,
    gameObjectRecord,
  ),
  GetComponentGameObjectService.unsafeGetGeometryComponent(
    skyboxGameObject,
    gameObjectRecord,
  ),
);

/* TODO refactor: duplicate with DrawOutlineJob */
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
  let state =
    OperateAllTextureRenderService.resetActivedTextureUnitIndex(state);

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
  |> RenderJobUtils.draw(
       gl,
       DrawModeType.Triangles |> DrawModeType.drawModeToUint8,
       geometryIndex,
     );

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

let execJob = (flags, state) =>
  switch (SkyboxSceneMainService.getCubemapTexture(state)) {
  | Some(cubemapTexture) =>
    let gl = AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

    let target = gl |> WonderWebgl.Gl.getTextureCubeMap;

    let renderSkyboxGameObjectData =
      _getRenderData(
        SkyboxSceneMainService.unsafeGetSkyboxGameObject(state),
        state,
      );

    let renderState = CreateRenderStateMainService.createRenderState(state);

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

    let renderState =
      renderState
      |> _prepareGlState(gl)
      |> UseProgramRenderService.useByShaderIndex(gl, drawSkyboxShaderIndex)
      |> _draw(gl, drawSkyboxShaderIndex, renderSkyboxGameObjectData)
      |> _restoreGlState(gl);

    state;
  | None => state
  };