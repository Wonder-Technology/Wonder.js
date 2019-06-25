open StateDataMainType;

open WDType;

let setSkybox = ({scene} as wd, cubemapTextureArr, state) =>
  OptionService.isJsonSerializedValueNone(scene.skybox) ?
    state :
    {
      let {cubemap}: WDType.skybox =
        OptionService.unsafeGetJsonSerializedValue(scene.skybox);

      SkyboxSceneMainService.setCubemapTexture(
        Array.unsafe_get(cubemapTextureArr, cubemap),
        state,
      );
    };