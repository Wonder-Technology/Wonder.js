open StateDataMainType;

open BasicSourceTextureType;

let getRecord = state =>
  state.basicSourceTextureRecord |> OptionService.unsafeGet;

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(
    texture,
    getRecord(state).glTextureMap,
  );

let isNeedUpdate = (texture, state) =>
  OperateTypeArrayBasicSourceTextureService.getIsNeedUpdate(.
    texture,
    getRecord(state).isNeedUpdates,
  )
  === BufferSourceTextureService.getNeedUpdate();

let getDefaultUnit = () => MapUnitService.getDefaultUnit();

let getNearest = () => SourceTextureTool.getNearest();

let getNearestMipmapNearest = () =>
  SourceTextureTool.getNearestMipmapNearest();

let getLinear = () => SourceTextureTool.getLinear();

let getNearestMipmapLinear = () => SourceTextureTool.getNearestMipmapLinear();

let getLinearMipmapNearest = () => SourceTextureTool.getLinearMipmapNearest();

let getLinearMipmapLinear = () => SourceTextureTool.getLinearMipmapLinear();

let getRgb = () => SourceTextureType.RGB;

let getRgba = () => SourceTextureType.RGBA;

let getAlpha = () => SourceTextureType.ALPHA;

let getUnsignedByte = () => TextureTypeService.getUnsignedByte();

let getUnsignedShort565 = () => TextureTypeService.getUnsignedShort565();

let buildSource = (width, height) => {"width": width, "height": height};

let getDefaultWrapS = () => BufferBasicSourceTextureService.getDefaultWrapS();

let getDefaultWrapT = () => BufferBasicSourceTextureService.getDefaultWrapT();

let getDefaultMagFilter = () =>
  BufferBasicSourceTextureService.getDefaultMagFilter();

let getDefaultMinFilter = () =>
  BufferBasicSourceTextureService.getDefaultMinFilter();

let getDefaultFormat = () => SourceTextureType.RGBA;

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getDefaultIsNeedUpdate = () =>
  BufferBasicSourceTextureService.getDefaultIsNeedUpdate();

let getNeedUpdate = BufferSourceTextureService.getNeedUpdate;

let getNotNeedUpdate = BufferSourceTextureService.getNotNeedUpdate;

let getIsNeedUpdate = (texture, state) =>
  OperateBasicSourceTextureMainService.getIsNeedUpdate(texture, state)
  === BufferSourceTextureService.getNeedUpdate();

let setIsNeedUpdate = (texture, isNeedUpdate, state) =>
  OperateBasicSourceTextureMainService.setIsNeedUpdate(
    texture,
    isNeedUpdate,
    state,
  );