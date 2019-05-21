open StateDataMainType;

open BasicSourceTextureType;

open DisposeComponentService;

let _disposeData =
    (
      texture,
      gl,
      {
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        isNeedUpdates,
        flipYs,
        sourceMap,
        glTextureMap,
        bindTextureUnitCacheMap,
        needAddedSourceArray,
        needInitedTextureIndexArray,
        nameMap,
      } as basicSourceTextureRecord,
    ) => {
  ...basicSourceTextureRecord,
  wrapSs:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getWrapSsSize(),
      BufferBasicSourceTextureService.getDefaultWrapS()
      |> SourceTextureType.wrapToUint8,
      wrapSs,
    ),
  wrapTs:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getWrapTsSize(),
      BufferBasicSourceTextureService.getDefaultWrapT()
      |> SourceTextureType.wrapToUint8,
      wrapTs,
    ),
  magFilters:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getMagFiltersSize(),
      BufferBasicSourceTextureService.getDefaultMagFilter()
      |> SourceTextureType.filterToUint8,
      magFilters,
    ),
  minFilters:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getMinFiltersSize(),
      BufferBasicSourceTextureService.getDefaultMinFilter()
      |> SourceTextureType.filterToUint8,
      minFilters,
    ),
  formats:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getFormatsSize(),
      BufferBasicSourceTextureService.getDefaultFormat()
      |> SourceTextureType.formatToUint8,
      formats,
    ),
  types:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getTypesSize(),
      BufferBasicSourceTextureService.getDefaultType(),
      types,
    ),
  isNeedUpdates:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getIsNeedUpdatesSize(),
      BufferBasicSourceTextureService.getDefaultIsNeedUpdate(),
      isNeedUpdates,
    ),
  flipYs:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getFlipYsSize(),
      BufferBasicSourceTextureService.getDefaultFlipY(),
      flipYs,
    ),
  sourceMap: sourceMap |> disposeSparseMapData(texture),
  bindTextureUnitCacheMap:
    bindTextureUnitCacheMap |> disposeSparseMapData(texture),
  glTextureMap:
    DisposeTextureMainService.disposeGlTextureMap(texture, gl, glTextureMap),
  needAddedSourceArray:
    DisposeTextureMainService.disposeNeedAddedSourceArray(
      texture,
      needAddedSourceArray,
    ),
  needInitedTextureIndexArray:
    needInitedTextureIndexArray
    |> Js.Array.filter(needInitedTexture => needInitedTexture !== texture),
  nameMap: nameMap |> disposeSparseMapData(texture),
};

let handleDispose = (materialData, textureArr, state) => {
  let gl = DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  let basicSourceTextureRecord =
    textureArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. basicSourceTextureRecord, texture) => {
           let basicSourceTextureRecord =
             GroupBasicSourceTextureService.removeMaterial(
               materialData,
               texture,
               basicSourceTextureRecord,
             );

           GroupBasicSourceTextureService.isGroupBasicSourceTexture(
             texture,
             basicSourceTextureRecord,
           ) ?
             basicSourceTextureRecord :
             {
               let basicSourceTextureRecord =
                 basicSourceTextureRecord |> _disposeData(texture, gl);

               {
                 ...basicSourceTextureRecord,
                 disposedIndexArray:
                   DisposeMaterialService.addDisposeIndex(
                     texture,
                     basicSourceTextureRecord.disposedIndexArray,
                   ),
               };
             };
         },
         RecordBasicSourceTextureMainService.getRecord(state),
       );

  {...state, basicSourceTextureRecord: Some(basicSourceTextureRecord)};
};