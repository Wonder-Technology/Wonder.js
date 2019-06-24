open StateDataMainType;

open WDType;

let setSkybox = ({scene} as wd, cubemapTextureArr, state) =>
  switch (scene.skybox) {
  | None => state
  | Some(({cubemap}: WDType.skybox)) =>
    SkyboxSceneMainService.setCubemapTexture(
      Array.unsafe_get(cubemapTextureArr, cubemap),
      state,
    )
  };