open StateDataMainType;

open CubemapTextureType;

let getRecord = state => state.cubemapTextureRecord |> OptionService.unsafeGet;

let isNeedUpdate = (texture, state) =>
  OperateTypeArrayAllCubemapTextureService.getIsNeedUpdate(.
    texture,
    getRecord(state).isNeedUpdates,
  )
  === BufferTextureService.getNeedUpdate();

let getTexture = (texture, state) =>
  OperateGlTextureMapService.getTexture(
    texture,
    getRecord(state).glTextureMap,
  );

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(
    texture,
    getRecord(state).glTextureMap,
  );

let setGlTexture = (texture, glTexture, state) => {
  OperateGlTextureMapService.setTexture(
    texture,
    glTexture,
    getRecord(state).glTextureMap,
  );

  state;
};

let setIsNeedUpdate = (texture, isNeedUpdate, state) =>
  OperateCubemapTextureMainService.setIsNeedUpdate(
    texture,
    isNeedUpdate ?
      BufferTextureService.getNeedUpdate() :
      BufferTextureService.getNotNeedUpdate(),
    state,
  );

let getDefaultWrapS = () => BufferCubemapTextureService.getDefaultWrapS();

let getDefaultWrapT = () => BufferCubemapTextureService.getDefaultWrapT();

let getDefaultMagFilter = () =>
  BufferCubemapTextureService.getDefaultMagFilter();

let getDefaultMinFilter = () =>
  BufferCubemapTextureService.getDefaultMinFilter();

let getDefaultFormat = () => BufferCubemapTextureService.getDefaultFormat();

let getDefaultType = () => BufferCubemapTextureService.getDefaultType();

let getDefaultIsNeedUpdate = () =>
  BufferTextureService.getDefaultIsNeedUpdate();

let getDefaultFlipY = () => BufferCubemapTextureService.getDefaultFlipY();

let buildSource = (~width, ~height, ~src="", ()) => {
  "width": width,
  "height": height,
  "src": src,
} |> Obj.magic;

/* let removePXSource */