open StateDataMainType;

open BasicSourceTextureType;

open DisposeComponentService;

let isAlive = (texture, {disposedIndexArray}) =>
  DisposeTextureService.isAlive(texture, disposedIndexArray);

let _disposeData = (texture, state) => {
  let {
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
        needAddedSourceArray,
        needInitedTextureIndexArray,
        nameMap,
      } as basicSourceTextureRecord =
    RecordBasicSourceTextureMainService.getRecord(state);

  /* let state =
    state
    |> DisposeTextureMainService.disposeBasicSourceTextureGlTextureMap(
         texture,
       ); */

  {
    ...state,
    basicSourceTextureRecord:
      Some({
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
        needAddedSourceArray:
          DisposeTextureMainService.disposeNeedAddedSourceArray(
            texture,
            needAddedSourceArray,
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
              state |> RecordBasicSourceTextureMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  textureArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, texture) => {
         let basicSourceTextureRecord =
           RecordBasicSourceTextureMainService.getRecord(state);

         let basicSourceTextureRecord =
           GroupBasicSourceTextureService.removeMaterial(
             materialData,
             texture,
             basicSourceTextureRecord,
           );

         isRemoveTexture ?
           {
             ...state,
             basicSourceTextureRecord: Some(basicSourceTextureRecord),
           } :
           GroupBasicSourceTextureService.isGroupBasicSourceTexture(
             texture,
             basicSourceTextureRecord,
           ) ?
             {
               ...state,
               basicSourceTextureRecord: Some(basicSourceTextureRecord),
             } :
             {
               let state = state |> _disposeData(texture);

               let basicSourceTextureRecord =
                 RecordBasicSourceTextureMainService.getRecord(state);

               {
                 ...state,
                 basicSourceTextureRecord:
                   Some({
                     ...basicSourceTextureRecord,
                     disposedIndexArray:
                       DisposeTextureService.addDisposeIndex(
                         texture,
                         basicSourceTextureRecord.disposedIndexArray,
                       ),
                   }),
               };
             };
       },
       state,
     );
};

let handleDisposeTexture = ( texture, isRemoveTexture, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(
              texture,
              isAlive,
              state |> RecordBasicSourceTextureMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let basicSourceTextureRecord =
    RecordBasicSourceTextureMainService.getRecord(state);

  let basicSourceTextureRecord =
    GroupBasicSourceTextureService.clearMaterial(
      texture,
      basicSourceTextureRecord,
    );

  isRemoveTexture ?
    {...state, basicSourceTextureRecord: Some(basicSourceTextureRecord)} :
    {
      let state = state |> _disposeData(texture);

      let basicSourceTextureRecord =
        RecordBasicSourceTextureMainService.getRecord(state);

      {
        ...state,
        basicSourceTextureRecord:
          Some({
            ...basicSourceTextureRecord,
            disposedIndexArray:
              DisposeTextureService.addDisposeIndex(
                texture,
                basicSourceTextureRecord.disposedIndexArray,
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
                   GroupBasicSourceTextureService.isGroupBasicSourceTexture(
                     texture,
                     RecordBasicSourceTextureMainService.getRecord(state),
                   )
                   |> assertFalse
                 )
               )
             )
           ),
         IsDebugMainService.getIsDebug(StateDataMain.stateData),
       );
};