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
  === BufferBasicSourceTextureService.getDefaultIsNeedUpdate();

let getDefaultUnit = () => MapUnitService.getDefaultUnit();

let getNearest = () =>
  SourceTextureType.NEAREST |> SourceTextureType.filterToUint8;

let getNearestMipmapNearest = () =>
  SourceTextureType.NEAREST_MIPMAP_NEAREST |> SourceTextureType.filterToUint8;

let getLinear = () =>
  SourceTextureType.LINEAR |> SourceTextureType.filterToUint8;

let getNearestMipmapLinear = () =>
  SourceTextureType.NEAREST_MIPMAP_LINEAR |> SourceTextureType.filterToUint8;

let getLinearMipmapNearest = () =>
  SourceTextureType.LINEAR_MIPMAP_NEAREST |> SourceTextureType.filterToUint8;

let getLinearMipmapLinear = () =>
  SourceTextureType.LINEAR_MIPMAP_LINEAR |> SourceTextureType.filterToUint8;

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