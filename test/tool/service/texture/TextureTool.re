open StateDataMainType;

open TextureType;

let getRecord = (state) => state.textureRecord |> OptionService.unsafeGet;

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(texture, getRecord(state).glTextureMap);

let isNeedUpdate = (texture, state) =>
  OperateTypeArrayTextureService.getIsNeedUpdate(texture, getRecord(state).isNeedUpdates)
  === BufferTextureService.getDefaultIsNeedUpdate();

let getDefaultUnit = () => MapUnitService.getDefaultUnit();

let getFilterNearest = () => TextureFilterService.getFilterNearest();

let getFilterNearestMipmapNearest = () => TextureFilterService.getFilterNearestMipmapNearest();

let getFilterNearestMipmapLinear = () => TextureFilterService.getFilterNearestMipmapLinear();

let getFilterLinear = () => TextureFilterService.getFilterLinear();

let getFilterLinearMipmapNearest = () => TextureFilterService.getFilterLinearMipmapNearest();

let getFilterLinearMipmapLinear = () => TextureFilterService.getFilterLinearMipmapLinear();

let buildSource = (width, height) => {"width": width, "height": height};