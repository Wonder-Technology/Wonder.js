open StateDataMainType;

open ArrayBufferViewSourceTextureType;

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
        widths,
        heights,
        sourceMap,
        glTextureMap,
        bindTextureUnitCacheMap,
        needAddedSourceArray,
        needInitedTextureIndexArray,
        nameMap,
      } as arrayBufferViewSourceTextureRecord,
    ) => {
  ...arrayBufferViewSourceTextureRecord,
  wrapSs:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getWrapSsSize(),
      BufferArrayBufferViewSourceTextureService.getDefaultWrapS()
      |> SourceTextureType.wrapToUint8,
      wrapSs,
    ),
  wrapTs:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getWrapTsSize(),
      BufferArrayBufferViewSourceTextureService.getDefaultWrapT()
      |> SourceTextureType.wrapToUint8,
      wrapTs,
    ),
  magFilters:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getMagFiltersSize(),
      BufferArrayBufferViewSourceTextureService.getDefaultMagFilter()
      |> SourceTextureType.filterToUint8,
      magFilters,
    ),
  minFilters:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getMinFiltersSize(),
      BufferArrayBufferViewSourceTextureService.getDefaultMinFilter()
      |> SourceTextureType.filterToUint8,
      minFilters,
    ),
  formats:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getFormatsSize(),
      BufferArrayBufferViewSourceTextureService.getDefaultFormat()
      |> SourceTextureType.formatToUint8,
      formats,
    ),
  types:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getTypesSize(),
      BufferArrayBufferViewSourceTextureService.getDefaultType(),
      types,
    ),
  isNeedUpdates:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getIsNeedUpdatesSize(),
      BufferArrayBufferViewSourceTextureService.getDefaultIsNeedUpdate(),
      isNeedUpdates,
    ),
  flipYs:
    DisposeTypeArrayService.deleteAndResetUint8(.
      texture * BufferSourceSizeTextureService.getFlipYsSize(),
      BufferArrayBufferViewSourceTextureService.getDefaultFlipY(),
      flipYs,
    ),
  widths:
    DisposeTypeArrayService.deleteAndResetUint16(.
      texture * BufferSourceSizeTextureService.getWidthsSize(),
      BufferArrayBufferViewSourceTextureService.getDefaultWidth(),
      widths,
    ),
  heights:
    DisposeTypeArrayService.deleteAndResetUint16(.
      texture * BufferSourceSizeTextureService.getHeightsSize(),
      BufferArrayBufferViewSourceTextureService.getDefaultHeight(),
      heights,
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

let handleBatchDispose = (materialData, textureArr, state) => {
  let gl = DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  let arrayBufferViewSourceTextureRecord =
    textureArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arrayBufferViewSourceTextureRecord, texture) => {
           let arrayBufferViewSourceTextureRecord =
             GroupArrayBufferViewSourceTextureService.removeMaterial(
               materialData,
               texture,
               arrayBufferViewSourceTextureRecord,
             );

           GroupArrayBufferViewSourceTextureService.isGroupArrayBufferViewSourceTexture(
             texture,
             arrayBufferViewSourceTextureRecord,
           ) ?
             arrayBufferViewSourceTextureRecord :
             {
               let arrayBufferViewSourceTextureRecord =
                 arrayBufferViewSourceTextureRecord
                 |> _disposeData(texture, gl);

               {
                 ...arrayBufferViewSourceTextureRecord,
                 disposedIndexArray:
                   DisposeMaterialService.addDisposeIndex(
                     texture,
                     arrayBufferViewSourceTextureRecord.disposedIndexArray,
                   ),
               };
             };
         },
         RecordArrayBufferViewSourceTextureMainService.getRecord(state),
       );

  {
    ...state,
    arrayBufferViewSourceTextureRecord:
      Some(arrayBufferViewSourceTextureRecord),
  };
};