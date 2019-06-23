open StateDataMainType;

let execJob = (flags, mainState) => {
  let _renderState =
    RenderSkyboxJobUtils.exec(
      AllDeviceManagerService.unsafeGetGl(. mainState.deviceManagerRecord),
      SkyboxSceneMainService.getCubemapTexture(mainState),
      RenderSkyboxJobUtils.getRenderData(mainState),
      CreateRenderStateMainService.createRenderState(mainState),
    );

  mainState;
};