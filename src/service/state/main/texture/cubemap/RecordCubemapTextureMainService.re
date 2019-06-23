open StateDataMainType;

open TextureType;

open BufferSizeTextureService;

open CubemapTextureType;

open BufferCubemapTextureService;

let getRecord = ({cubemapTextureRecord}) =>
  cubemapTextureRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      cubemapTextureCount: int,
      (
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        pxFormats,
        nxFormats,
        pyFormats,
        nyFormats,
        pzFormats,
        nzFormats,
        pxTypes,
        nxTypes,
        pyTypes,
        nyTypes,
        pzTypes,
        nzTypes,
        isNeedUpdates,
        flipYs,
      ),
    ) => {
  let defaultWrapS = getDefaultWrapS() |> TextureType.wrapToUint8;
  let defaultWrapT = getDefaultWrapT() |> TextureType.wrapToUint8;
  let defaultMagFilter =
    getDefaultMagFilter() |> TextureType.filterToUint8;
  let defaultMinFilter =
    getDefaultMinFilter() |> TextureType.filterToUint8;
  let defaultFormat = getDefaultFormat() |> TextureType.formatToUint8;
  let defaultType = getDefaultType();
  let defaultIsNeedUpdate = getDefaultIsNeedUpdate();
  let defaultFlipY = getDefaultFlipY();

  WonderCommonlib.ArrayService.range(0, cubemapTextureCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (
           wrapSs,
           wrapTs,
           magFilters,
           minFilters,
           pxFormats,
           nxFormats,
           pyFormats,
           nyFormats,
           pzFormats,
           nzFormats,
           pxTypes,
           nxTypes,
           pyTypes,
           nyTypes,
           pzTypes,
           nzTypes,
           isNeedUpdates,
           flipYs,
         ),
         indexInTypeArray,
       ) => (
         OperateTypeArrayAllCubemapTextureService.setWrapS(
           indexInTypeArray,
           defaultWrapS,
           wrapSs,
         ),
         OperateTypeArrayAllCubemapTextureService.setWrapT(
           indexInTypeArray,
           defaultWrapT,
           wrapTs,
         ),
         OperateTypeArrayAllCubemapTextureService.setMagFilter(
           indexInTypeArray,
           defaultMagFilter,
           magFilters,
         ),
         OperateTypeArrayAllCubemapTextureService.setMinFilter(
           indexInTypeArray,
           defaultMinFilter,
           minFilters,
         ),
         OperateTypeArrayAllCubemapTextureService.setFormat(
           indexInTypeArray,
           defaultFormat,
           pxFormats,
         ),
         OperateTypeArrayAllCubemapTextureService.setFormat(
           indexInTypeArray,
           defaultFormat,
           nxFormats,
         ),
         OperateTypeArrayAllCubemapTextureService.setFormat(
           indexInTypeArray,
           defaultFormat,
           pyFormats,
         ),
         OperateTypeArrayAllCubemapTextureService.setFormat(
           indexInTypeArray,
           defaultFormat,
           nyFormats,
         ),
         OperateTypeArrayAllCubemapTextureService.setFormat(
           indexInTypeArray,
           defaultFormat,
           pzFormats,
         ),
         OperateTypeArrayAllCubemapTextureService.setFormat(
           indexInTypeArray,
           defaultFormat,
           nzFormats,
         ),
         OperateTypeArrayAllCubemapTextureService.setType(
           indexInTypeArray,
           defaultType,
           pxTypes,
         ),
         OperateTypeArrayAllCubemapTextureService.setType(
           indexInTypeArray,
           defaultType,
           nxTypes,
         ),
         OperateTypeArrayAllCubemapTextureService.setType(
           indexInTypeArray,
           defaultType,
           pyTypes,
         ),
         OperateTypeArrayAllCubemapTextureService.setType(
           indexInTypeArray,
           defaultType,
           nyTypes,
         ),
         OperateTypeArrayAllCubemapTextureService.setType(
           indexInTypeArray,
           defaultType,
           pzTypes,
         ),
         OperateTypeArrayAllCubemapTextureService.setType(
           indexInTypeArray,
           defaultType,
           nzTypes,
         ),
         OperateTypeArrayAllCubemapTextureService.setIsNeedUpdate(
           indexInTypeArray,
           defaultIsNeedUpdate,
           isNeedUpdates,
         ),
         OperateTypeArrayAllCubemapTextureService.setFlipY(
           indexInTypeArray,
           defaultFlipY,
           flipYs,
         ),
       ),
       (
         wrapSs,
         wrapTs,
         magFilters,
         minFilters,
         pxFormats,
         nxFormats,
         pyFormats,
         nyFormats,
         pzFormats,
         nzFormats,
         pxTypes,
         nxTypes,
         pyTypes,
         nyTypes,
         pzTypes,
         nzTypes,
         isNeedUpdates,
         flipYs,
       ),
     );
};

let _initBufferData = cubemapTextureCount => {
  let buffer = createBuffer(cubemapTextureCount);
  let (
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    pxFormats,
    nxFormats,
    pyFormats,
    nyFormats,
    pzFormats,
    nzFormats,
    pxTypes,
    nxTypes,
    pyTypes,
    nyTypes,
    pzTypes,
    nzTypes,
    isNeedUpdates,
    flipYs,
  ) =
    CreateTypeArrayAllCubemapTextureService.createTypeArrays(
      buffer,
      cubemapTextureCount,
    );

  (
    buffer,
    (
      wrapSs,
      wrapTs,
      magFilters,
      minFilters,
      pxFormats,
      nxFormats,
      pyFormats,
      nyFormats,
      pzFormats,
      nzFormats,
      pxTypes,
      nxTypes,
      pyTypes,
      nyTypes,
      pzTypes,
      nzTypes,
      isNeedUpdates,
      flipYs,
    )
    |> setAllTypeArrDataToDefault(cubemapTextureCount),
  );
};

let create = ({settingRecord} as state) => {
  let cubemapTextureCount =
    BufferSettingService.getCubemapTextureCount(settingRecord);
  let (
    buffer,
    (
      wrapSs,
      wrapTs,
      magFilters,
      minFilters,
      pxFormats,
      nxFormats,
      pyFormats,
      nyFormats,
      pzFormats,
      nzFormats,
      pxTypes,
      nxTypes,
      pyTypes,
      nyTypes,
      pzTypes,
      nzTypes,
      isNeedUpdates,
      flipYs,
    ),
  ) =
    _initBufferData(cubemapTextureCount);
  state.cubemapTextureRecord =
    Some({
      index: 0,
      buffer,
      wrapSs,
      wrapTs,
      magFilters,
      minFilters,
      pxFormats,
      nxFormats,
      pyFormats,
      nyFormats,
      pzFormats,
      nzFormats,
      pxTypes,
      nxTypes,
      pyTypes,
      nyTypes,
      pzTypes,
      nzTypes,
      isNeedUpdates,
      flipYs,
      nameMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      materialsMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      pxSourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      nxSourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      pySourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      nySourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      pzSourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      nzSourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      needAddedPXSourceArray: WonderCommonlib.ArrayService.createEmpty(),
      needAddedNXSourceArray: WonderCommonlib.ArrayService.createEmpty(),
      needAddedPYSourceArray: WonderCommonlib.ArrayService.createEmpty(),
      needAddedNYSourceArray: WonderCommonlib.ArrayService.createEmpty(),
      needAddedPZSourceArray: WonderCommonlib.ArrayService.createEmpty(),
      needAddedNZSourceArray: WonderCommonlib.ArrayService.createEmpty(),
      needInitedTextureIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      needDisposedTextureIndexArray:
        WonderCommonlib.ArrayService.createEmpty(),
    });
  state;
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
        index,
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        pxFormats,
        nxFormats,
        pyFormats,
        nyFormats,
        pzFormats,
        nzFormats,
        pxTypes,
        nxTypes,
        pyTypes,
        nyTypes,
        pzTypes,
        nzTypes,
        isNeedUpdates,
        flipYs,
        nameMap,
        materialsMap,
        pxSourceMap,
        nxSourceMap,
        pySourceMap,
        nySourceMap,
        pzSourceMap,
        nzSourceMap,
        glTextureMap,
        disposedIndexArray,
        needAddedPXSourceArray,
        needAddedNXSourceArray,
        needAddedPYSourceArray,
        needAddedNYSourceArray,
        needAddedPZSourceArray,
        needAddedNZSourceArray,
        needInitedTextureIndexArray,
        needDisposedTextureIndexArray,
      } as record =
    state |> getRecord;

  {
    ...state,
    cubemapTextureRecord:
      Some({
        ...record,
        index,
        wrapSs:
          wrapSs
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getWrapSsSize(),
             ),
        wrapTs:
          wrapTs
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getWrapTsSize(),
             ),
        magFilters:
          magFilters
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getMagFiltersSize(),
             ),
        minFilters:
          minFilters
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getMinFiltersSize(),
             ),
        pxFormats:
          pxFormats
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFormatsSize(),
             ),
        nxFormats:
          nxFormats
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFormatsSize(),
             ),
        pyFormats:
          pyFormats
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFormatsSize(),
             ),
        nyFormats:
          nyFormats
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFormatsSize(),
             ),
        pzFormats:
          pzFormats
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFormatsSize(),
             ),
        nzFormats:
          nzFormats
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFormatsSize(),
             ),
        pxTypes:
          pxTypes
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getTypesSize(),
             ),
        nxTypes:
          nxTypes
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getTypesSize(),
             ),
        pyTypes:
          pyTypes
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getTypesSize(),
             ),
        nyTypes:
          nyTypes
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getTypesSize(),
             ),
        pzTypes:
          pzTypes
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getTypesSize(),
             ),
        nzTypes:
          nzTypes
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getTypesSize(),
             ),
        isNeedUpdates:
          isNeedUpdates
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getIsNeedUpdatesSize(),
             ),
        flipYs:
          flipYs
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFlipYsSize(),
             ),
        nameMap: nameMap |> WonderCommonlib.MutableSparseMapService.copy,
        materialsMap:
          materialsMap |> WonderCommonlib.MutableSparseMapService.copy,
        pxSourceMap:
          pxSourceMap |> WonderCommonlib.MutableSparseMapService.copy,
        nxSourceMap:
          nxSourceMap |> WonderCommonlib.MutableSparseMapService.copy,
        pySourceMap:
          pySourceMap |> WonderCommonlib.MutableSparseMapService.copy,
        nySourceMap:
          nySourceMap |> WonderCommonlib.MutableSparseMapService.copy,
        pzSourceMap:
          pzSourceMap |> WonderCommonlib.MutableSparseMapService.copy,
        nzSourceMap:
          nzSourceMap |> WonderCommonlib.MutableSparseMapService.copy,
        glTextureMap:
          glTextureMap |> WonderCommonlib.MutableSparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        needAddedPXSourceArray: needAddedPXSourceArray |> Js.Array.copy,
        needAddedNXSourceArray: needAddedNXSourceArray |> Js.Array.copy,
        needAddedPYSourceArray: needAddedPYSourceArray |> Js.Array.copy,
        needAddedNYSourceArray: needAddedNYSourceArray |> Js.Array.copy,
        needAddedPZSourceArray: needAddedPZSourceArray |> Js.Array.copy,
        needAddedNZSourceArray: needAddedNZSourceArray |> Js.Array.copy,
        needInitedTextureIndexArray:
          needInitedTextureIndexArray |> Js.Array.copy,
        needDisposedTextureIndexArray:
          needDisposedTextureIndexArray |> Js.Array.copy,
      }),
  };
};