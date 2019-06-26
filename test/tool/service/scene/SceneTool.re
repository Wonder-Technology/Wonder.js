let getCubemapTexture = SkyboxSceneMainService.getCubemapTexture;

let unsafeGetCubemapTexture = state =>
  getCubemapTexture(state) |> OptionService.unsafeGet;