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

let getRgb = () => TextureFormatService.getRgb();

let getRgba = () => TextureFormatService.getRgba();

let getAlpha = () => TextureFormatService.getAlpha();

let getUnsignedByte = () => TextureTypeService.getUnsignedByte();

let getUnsignedShort565 = () => TextureTypeService.getUnsignedShort565();

let buildSource = (width, height) => {"width": width, "height": height};

let getDefaultWrapS = () => BufferBasicSourceTextureService.getDefaultWrapS();

let getDefaultWrapT = () => BufferBasicSourceTextureService.getDefaultWrapT();

let getDefaultMagFilter = () =>
  BufferBasicSourceTextureService.getDefaultMagFilter();

let getDefaultMinFilter = () =>
  BufferBasicSourceTextureService.getDefaultMinFilter();

let getDefaultFormat = () => TextureFormatService.getRgba();

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getDefaultIsNeedUpdate = () =>
  BufferBasicSourceTextureService.getDefaultIsNeedUpdate();