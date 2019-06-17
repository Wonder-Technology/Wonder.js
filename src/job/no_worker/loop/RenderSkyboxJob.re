open StateDataMainType;

let _needUpdateCubeTexture = state =>
  state.jobDataRecord.skyboxData.needUpdateCubeTexture;

let _markUpdateCubeTexture = state => {
  ...state,
  jobDataRecord: {
    ...state.jobDataRecord,
    skyboxData: {
      ...state.jobDataRecord.skyboxData,
      needUpdateCubeTexture: false,
    },
  },
};

let _unsafeGetCubeTexture = state =>
  state.jobDataRecord.skyboxData.cubeTexture |> OptionService.unsafeGet;

let _unsafeGetPXImage = state =>
  state.jobDataRecord.skyboxData.pxImage |> OptionService.unsafeGet;

let _unsafeGetNXImage = state =>
  state.jobDataRecord.skyboxData.nxImage |> OptionService.unsafeGet;

let _unsafeGetPYImage = state =>
  state.jobDataRecord.skyboxData.pyImage |> OptionService.unsafeGet;

let _unsafeGetNYImage = state =>
  state.jobDataRecord.skyboxData.nyImage |> OptionService.unsafeGet;

let _unsafeGetPZImage = state =>
  state.jobDataRecord.skyboxData.pzImage |> OptionService.unsafeGet;

let _unsafeGetNZImage = state =>
  state.jobDataRecord.skyboxData.nzImage |> OptionService.unsafeGet;

let _unsafeGetSkyboxGameObject = state =>
  state.jobDataRecord.skyboxData.skyboxGameObject |> OptionService.unsafeGet;

let _getTextureFormat = (gl, imageExtname) =>
  imageExtname
  |> ImageService.getMimeTypeByExtname
  |> TextureFormatService.getFormatByMimeType
  |> TextureFormatService.getGlFormat(gl);

let _drawTexture = (gl, target, source) => {
  let glFormat =
    _getTextureFormat(
      gl,
      FileNameService.getFileExtName(Obj.magic(source)##src),
    );

  gl
  |> WonderWebgl.Gl.texImage2D(
       target,
       0,
       glFormat,
       glFormat,
       gl |> WonderWebgl.Gl.getUnsignedByte,
       source,
     );
};

let _updateCubeTexture = (gl, target, state) => {
  _drawTexture(
    gl,
    gl |> WonderWebgl.Gl.getTextureCubeMapPositiveX,
    _unsafeGetPXImage(state) |> WonderWebgl.GlType.imageElementToTextureSource,
  );
  _drawTexture(
    gl,
    gl |> WonderWebgl.Gl.getTextureCubeMapNegativeX,
    _unsafeGetNXImage(state) |> WonderWebgl.GlType.imageElementToTextureSource,
  );
  _drawTexture(
    gl,
    gl |> WonderWebgl.Gl.getTextureCubeMapPositiveY,
    _unsafeGetPYImage(state) |> WonderWebgl.GlType.imageElementToTextureSource,
  );
  _drawTexture(
    gl,
    gl |> WonderWebgl.Gl.getTextureCubeMapNegativeY,
    _unsafeGetNYImage(state) |> WonderWebgl.GlType.imageElementToTextureSource,
  );
  _drawTexture(
    gl,
    gl |> WonderWebgl.Gl.getTextureCubeMapPositiveZ,
    _unsafeGetPZImage(state) |> WonderWebgl.GlType.imageElementToTextureSource,
  );
  _drawTexture(
    gl,
    gl |> WonderWebgl.Gl.getTextureCubeMapNegativeZ,
    _unsafeGetNZImage(state) |> WonderWebgl.GlType.imageElementToTextureSource,
  );

  gl
  |> WonderWebgl.Gl.texParameteri(
       target,
       gl |> WonderWebgl.Gl.getTextureWrapS,
       gl |> WonderWebgl.Gl.getClampToEdge,
     );
  gl
  |> WonderWebgl.Gl.texParameteri(
       target,
       gl |> WonderWebgl.Gl.getTextureWrapT,
       gl |> WonderWebgl.Gl.getClampToEdge,
     );
  /* gl
     |> WonderWebgl.Gl.texParameteri(
          target,
          gl |> WonderWebgl.Gl.getTextureWrapR,
          gl |> WonderWebgl.Gl.getClampToEdge,
        ); */
  gl
  |> WonderWebgl.Gl.texParameteri(
       target,
       gl |> WonderWebgl.Gl.getTextureMagFilter,
       gl |> WonderWebgl.Gl.getLinear,
     );
  gl
  |> WonderWebgl.Gl.texParameteri(
       target,
       gl |> WonderWebgl.Gl.getTextureMinFilter,
       gl |> WonderWebgl.Gl.getLinear,
     );

  state;
};

let _prepareGlState =
    (gl, ({deviceManagerRecord}: StateRenderType.renderState) as state) => {
  let deviceManagerRecord =
    deviceManagerRecord
    |> AllDeviceManagerService.setDepthFunc(gl, gl |> WonderWebgl.Gl.getLEqual)
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

let execJob = (flags, state) => {
  let cubeTexture = _unsafeGetCubeTexture(state);

  let gl = AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  let target = gl |> WonderWebgl.Gl.getTextureCubeMap;

  gl |> WonderWebgl.Gl.bindTexture(target, cubeTexture);
  gl |> WonderWebgl.Gl.activeTexture(WonderWebgl.Gl.getTextureUnit0(gl));

  let state =
    _needUpdateCubeTexture(state) ?
      _updateCubeTexture(gl, target, state) : state;

  let drawSkyboxShaderIndex =
    NoMaterialShaderIndexAllShaderService.unsafeGetShaderIndex(
      "skybox",
      state.shaderRecord,
    );

  let gl = AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  let renderState = CreateRenderStateMainService.createRenderState(state);

  let renderState =
    renderState
    |> _prepareGlState(gl)
    |> UseProgramRenderService.useByShaderIndex(gl, drawSkyboxShaderIndex)
    |> _draw(
         gl,
         drawSkyboxShaderIndex,
         _getRenderData(_unsafeGetSkyboxGameObject(state), state),
       )
    |> _restoreGlState(gl);

  _markUpdateCubeTexture(state);
};