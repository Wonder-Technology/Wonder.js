open StateDataMainType;

open BasicSourceTextureType;

let getRecord = (state) => state.basicSourceTextureRecord |> OptionService.unsafeGet;

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(texture, getRecord(state).glTextureMap);

let isNeedUpdate = (texture, state) =>
  [@bs]
  OperateTypeArrayBasicSourceTextureService.getIsNeedUpdate(
    texture,
    getRecord(state).isNeedUpdates
  )
  === BufferBasicSourceTextureService.getDefaultIsNeedUpdate();

let getDefaultUnit = () => MapUnitService.getDefaultUnit();

let getNearest = () => TextureFilterService.getNearest();

let getNearestMipmapNearest = () => TextureFilterService.getNearestMipmapNearest();

let getNearestMipmapLinear = () => TextureFilterService.getNearestMipmapLinear();

let getLinear = () => TextureFilterService.getLinear();

let getLinearMipmapNearest = () => TextureFilterService.getLinearMipmapNearest();

let getLinearMipmapLinear = () => TextureFilterService.getLinearMipmapLinear();

let getRgb = () => TextureFormatService.getRgb();

let getRgba = () => TextureFormatService.getRgba();

let getAlpha = () => TextureFormatService.getAlpha();

let getUnsignedByte = () => TextureTypeService.getUnsignedByte();

let getUnsignedShort565 = () => TextureTypeService.getUnsignedShort565();

let buildSource = (width, height) => {"width": width, "height": height};

let getDefaultWrapS = () => TextureWrapService.getClampToEdge();

let getDefaultWrapT = () => TextureWrapService.getClampToEdge();

let getDefaultMagFilter = () => TextureFilterService.getLinear();

let getDefaultMinFilter = () => TextureFilterService.getNearest();

let getDefaultFormat = () => TextureFormatService.getRgba();

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getDefaultIsNeedUpdate = () => BufferBasicSourceTextureService.getDefaultIsNeedUpdate();