open StateDataMainType;

open CubemapTextureType;

open DisposeComponentService;

let isAlive = (texture, {disposedIndexArray}) =>
  DisposeTextureService.isAlive(texture, disposedIndexArray);

let _disposeData = (texture, state) => {
  let {
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
        pxSourceMap,
        nxSourceMap,
        pySourceMap,
        nySourceMap,
        pzSourceMap,
        nzSourceMap,
        glTextureMap,
        needAddedPXSourceArray,
        needAddedNXSourceArray,
        needAddedPYSourceArray,
        needAddedNYSourceArray,
        needAddedPZSourceArray,
        needAddedNZSourceArray,
        needInitedTextureIndexArray,
        nameMap,
      } as cubemapTextureRecord =
    RecordCubemapTextureMainService.getRecord(state);

  {
    ...state,
    cubemapTextureRecord:
      Some({
        ...cubemapTextureRecord,
        wrapSs:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getWrapSsSize(),
            BufferCubemapTextureService.getDefaultWrapS()
            |> TextureType.wrapToUint8,
            wrapSs,
          ),
        wrapTs:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getWrapTsSize(),
            BufferCubemapTextureService.getDefaultWrapT()
            |> TextureType.wrapToUint8,
            wrapTs,
          ),
        magFilters:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getMagFiltersSize(),
            BufferCubemapTextureService.getDefaultMagFilter()
            |> TextureType.filterToUint8,
            magFilters,
          ),
        minFilters:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getMinFiltersSize(),
            BufferCubemapTextureService.getDefaultMinFilter()
            |> TextureType.filterToUint8,
            minFilters,
          ),
        pxFormats:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getFormatsSize(),
            BufferCubemapTextureService.getDefaultFormat()
            |> TextureType.formatToUint8,
            pxFormats,
          ),
        nxFormats:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getFormatsSize(),
            BufferCubemapTextureService.getDefaultFormat()
            |> TextureType.formatToUint8,
            nxFormats,
          ),
        pyFormats:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getFormatsSize(),
            BufferCubemapTextureService.getDefaultFormat()
            |> TextureType.formatToUint8,
            pyFormats,
          ),
        nyFormats:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getFormatsSize(),
            BufferCubemapTextureService.getDefaultFormat()
            |> TextureType.formatToUint8,
            nyFormats,
          ),
        pzFormats:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getFormatsSize(),
            BufferCubemapTextureService.getDefaultFormat()
            |> TextureType.formatToUint8,
            pzFormats,
          ),
        nzFormats:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getFormatsSize(),
            BufferCubemapTextureService.getDefaultFormat()
            |> TextureType.formatToUint8,
            nzFormats,
          ),
        pxTypes:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getTypesSize(),
            BufferCubemapTextureService.getDefaultType(),
            pxTypes,
          ),
        nxTypes:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getTypesSize(),
            BufferCubemapTextureService.getDefaultType(),
            nxTypes,
          ),
        pyTypes:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getTypesSize(),
            BufferCubemapTextureService.getDefaultType(),
            pyTypes,
          ),
        nyTypes:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getTypesSize(),
            BufferCubemapTextureService.getDefaultType(),
            nyTypes,
          ),
        pzTypes:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getTypesSize(),
            BufferCubemapTextureService.getDefaultType(),
            pzTypes,
          ),
        nzTypes:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getTypesSize(),
            BufferCubemapTextureService.getDefaultType(),
            nzTypes,
          ),
        isNeedUpdates:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getIsNeedUpdatesSize(),
            BufferCubemapTextureService.getDefaultIsNeedUpdate(),
            isNeedUpdates,
          ),
        flipYs:
          DisposeTypeArrayService.deleteAndResetUint8(.
            texture * BufferSizeTextureService.getFlipYsSize(),
            BufferCubemapTextureService.getDefaultFlipY(),
            flipYs,
          ),
        pxSourceMap: pxSourceMap |> disposeSparseMapData(texture),
        nxSourceMap: nxSourceMap |> disposeSparseMapData(texture),
        pySourceMap: pySourceMap |> disposeSparseMapData(texture),
        nySourceMap: nySourceMap |> disposeSparseMapData(texture),
        pzSourceMap: pzSourceMap |> disposeSparseMapData(texture),
        nzSourceMap: nzSourceMap |> disposeSparseMapData(texture),
        needAddedPXSourceArray:
          DisposeTextureMainService.disposeNeedAddedSourceArray(
            texture,
            needAddedPXSourceArray,
          ),
        needAddedNXSourceArray:
          DisposeTextureMainService.disposeNeedAddedSourceArray(
            texture,
            needAddedNXSourceArray,
          ),
        needAddedPYSourceArray:
          DisposeTextureMainService.disposeNeedAddedSourceArray(
            texture,
            needAddedPYSourceArray,
          ),
        needAddedNYSourceArray:
          DisposeTextureMainService.disposeNeedAddedSourceArray(
            texture,
            needAddedNYSourceArray,
          ),
        needAddedPZSourceArray:
          DisposeTextureMainService.disposeNeedAddedSourceArray(
            texture,
            needAddedPZSourceArray,
          ),
        needAddedNZSourceArray:
          DisposeTextureMainService.disposeNeedAddedSourceArray(
            texture,
            needAddedNZSourceArray,
          ),
        needInitedTextureIndexArray:
          DisposeTextureMainService.disposeNeedInitedSourceArray(
            texture,
            needInitedTextureIndexArray,
          ),
        nameMap: nameMap |> disposeSparseMapData(texture),
      }),
  };
};

let handleDispose = (isRemoveTexture, materialData, textureArr, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
              textureArr,
              isAlive,
              state |> RecordCubemapTextureMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  textureArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, texture) => {
         let cubemapTextureRecord =
           RecordCubemapTextureMainService.getRecord(state);

         let cubemapTextureRecord =
           GroupCubemapTextureService.removeMaterial(
             materialData,
             texture,
             cubemapTextureRecord,
           );

         isRemoveTexture ?
           {...state, cubemapTextureRecord: Some(cubemapTextureRecord)} :
           GroupCubemapTextureService.isGroupCubemapTexture(
             texture,
             cubemapTextureRecord,
           ) ?
             {...state, cubemapTextureRecord: Some(cubemapTextureRecord)} :
             {
               let state = state |> _disposeData(texture);

               let cubemapTextureRecord =
                 RecordCubemapTextureMainService.getRecord(state);

               {
                 ...state,
                 cubemapTextureRecord:
                   Some({
                     ...cubemapTextureRecord,
                     disposedIndexArray:
                       DisposeTextureService.addDisposeIndex(
                         texture,
                         cubemapTextureRecord.disposedIndexArray,
                       ),
                   }),
               };
             };
       },
       state,
     );
};

let handleDisposeTexture = (texture, isRemoveTexture, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(
              texture,
              isAlive,
              state |> RecordCubemapTextureMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let cubemapTextureRecord = RecordCubemapTextureMainService.getRecord(state);

  let cubemapTextureRecord =
    GroupCubemapTextureService.clearMaterial(texture, cubemapTextureRecord);

  isRemoveTexture ?
    {...state, cubemapTextureRecord: Some(cubemapTextureRecord)} :
    {
      let state = state |> _disposeData(texture);

      let cubemapTextureRecord =
        RecordCubemapTextureMainService.getRecord(state);

      {
        ...state,
        cubemapTextureRecord:
          Some({
            ...cubemapTextureRecord,
            disposedIndexArray:
              DisposeTextureService.addDisposeIndex(
                texture,
                cubemapTextureRecord.disposedIndexArray,
              ),
          }),
      };
    }
    |> WonderLog.Contract.ensureCheck(
         state =>
           WonderLog.(
             Contract.(
               Operators.(
                 test(
                   Log.buildAssertMessage(
                     ~expect={j|texture:$texture not to be group|j},
                     ~actual={j|is|j},
                   ),
                   () =>
                   GroupCubemapTextureService.isGroupCubemapTexture(
                     texture,
                     RecordCubemapTextureMainService.getRecord(state),
                   )
                   |> assertFalse
                 )
               )
             )
           ),
         IsDebugMainService.getIsDebug(StateDataMain.stateData),
       );
};