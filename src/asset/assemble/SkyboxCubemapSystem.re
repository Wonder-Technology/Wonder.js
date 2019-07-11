open StateDataMainType;

open WDType;

let getSkyboxCubemap = ({scene} as wd, cubemapTextureArr, state) =>
  OptionService.isJsonSerializedValueNone(scene.skybox) ?
    None :
    {
      let {cubemap}: WDType.skybox =
        OptionService.unsafeGetJsonSerializedValue(scene.skybox);

      cubemapTextureArr |> ArrayService.getNth(cubemap);
    };

let setSkyboxCubemap = (cubemapTextureOpt, state) =>
  switch (cubemapTextureOpt) {
  | None => state
  | Some(cubemapTexture) =>
    state |> SkyboxSceneMainService.setCubemapTexture(cubemapTexture)
  };