open StateDataMainType;

open TextureType;

let getRecord = (state) => state.textureRecord |> OptionService.unsafeGet;

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(texture, getRecord(state).glTextureMap);

let isNeedUpdate = (texture, state) =>
  OperateTypeArrayTextureService.getIsNeedUpdate(texture, getRecord(state).isNeedUpdates)
  === BufferTextureService.getDefaultIsNeedUpdate();

let getDefaultUnit = () => MapUnitService.getDefaultUnit();