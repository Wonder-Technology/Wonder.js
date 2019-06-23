open StateDataMainType;

let execJob = (flags, mainState) => {
  let _renderState =
    RenderSkyboxJobUtils.exec(
      AllDeviceManagerService.unsafeGetGl(. mainState.deviceManagerRecord),
      SkyboxSceneMainService.getCubemapTexture(mainState),
      RenderSkyboxJobUtils.getRenderData(
        SkyboxSceneMainService.unsafeGetSkyboxGameObject(mainState),
        mainState,
      ),
      CreateRenderStateMainService.createRenderState(mainState),
    );

  mainState;
};