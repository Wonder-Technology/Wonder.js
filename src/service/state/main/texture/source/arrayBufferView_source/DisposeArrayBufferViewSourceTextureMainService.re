open StateDataMainType;

open ArrayBufferViewSourceTextureType;

open DisposeComponentService;

let isAlive = (texture, {disposedIndexArray}) =>
  DisposeTextureService.isAlive(texture, disposedIndexArray);

let _disposeData = (texture, textureIndexInTypeArr, state) => {
  let {
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        widths,
        heights,
        isNeedUpdates,
        flipYs,
        sourceMap,
        glTextureMap,
        needAddedSourceArray,
        needInitedTextureIndexArray,
        nameMap,
      } as arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);

  /*
     TODO remove related logic:
   e.g. needDisposedTextureIndexArray


     let state =
       state
       |> DisposeTextureMainService.disposeArrayBufferViewSourceTextureGlTextureMap(
            texture,
          ); */

  {
    ...state,
    arrayBufferViewSourceTextureRecord:
      Some({
        ...arrayBufferViewSourceTextureRecord,
        wrapSs:
          DisposeTypeArrayService.deleteAndResetUint8(.
            textureIndexInTypeArr * BufferSizeTextureService.getWrapSsSize(),
            BufferArrayBufferViewSourceTextureService.getDefaultWrapS()
            |> TextureType.wrapToUint8,
            wrapSs,
          ),
        wrapTs:
          DisposeTypeArrayService.deleteAndResetUint8(.
            textureIndexInTypeArr * BufferSizeTextureService.getWrapTsSize(),
            BufferArrayBufferViewSourceTextureService.getDefaultWrapT()
            |> TextureType.wrapToUint8,
            wrapTs,
          ),
        magFilters:
          DisposeTypeArrayService.deleteAndResetUint8(.
            textureIndexInTypeArr
            * BufferSizeTextureService.getMagFiltersSize(),
            BufferArrayBufferViewSourceTextureService.getDefaultMagFilter()
            |> TextureType.filterToUint8,
            magFilters,
          ),
        minFilters:
          DisposeTypeArrayService.deleteAndResetUint8(.
            textureIndexInTypeArr
            * BufferSizeTextureService.getMinFiltersSize(),
            BufferArrayBufferViewSourceTextureService.getDefaultMinFilter()
            |> TextureType.filterToUint8,
            minFilters,
          ),
        formats:
          DisposeTypeArrayService.deleteAndResetUint8(.
            textureIndexInTypeArr * BufferSizeTextureService.getFormatsSize(),
            BufferArrayBufferViewSourceTextureService.getDefaultFormat()
            |> TextureType.formatToUint8,
            formats,
          ),
        types:
          DisposeTypeArrayService.deleteAndResetUint8(.
            textureIndexInTypeArr * BufferSizeTextureService.getTypesSize(),
            BufferArrayBufferViewSourceTextureService.getDefaultType(),
            types,
          ),
        isNeedUpdates:
          DisposeTypeArrayService.deleteAndResetUint8(.
            textureIndexInTypeArr
            * BufferSizeTextureService.getIsNeedUpdatesSize(),
            BufferArrayBufferViewSourceTextureService.getDefaultIsNeedUpdate(),
            isNeedUpdates,
          ),
        flipYs:
          DisposeTypeArrayService.deleteAndResetUint8(.
            textureIndexInTypeArr * BufferSizeTextureService.getFlipYsSize(),
            BufferArrayBufferViewSourceTextureService.getDefaultFlipY(),
            flipYs,
          ),
        widths:
          DisposeTypeArrayService.deleteAndResetUint16(.
            textureIndexInTypeArr
            * BufferArrayBufferViewSourceSizeTextureService.getWidthsSize(),
            BufferArrayBufferViewSourceTextureService.getDefaultWidth(),
            widths,
          ),
        heights:
          DisposeTypeArrayService.deleteAndResetUint16(.
            textureIndexInTypeArr
            * BufferArrayBufferViewSourceSizeTextureService.getHeightsSize(),
            BufferArrayBufferViewSourceTextureService.getDefaultHeight(),
            heights,
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
              state |> RecordArrayBufferViewSourceTextureMainService.getRecord,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  textureArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, texture) => {
         let arrayBufferViewSourceTextureRecord =
           RecordArrayBufferViewSourceTextureMainService.getRecord(state);

         let arrayBufferViewSourceTextureRecord =
           GroupArrayBufferViewSourceTextureService.removeMaterial(
             materialData,
             texture,
             arrayBufferViewSourceTextureRecord,
           );

         isRemoveTexture ?
           {
             ...state,
             arrayBufferViewSourceTextureRecord:
               Some(arrayBufferViewSourceTextureRecord),
           } :
           GroupArrayBufferViewSourceTextureService.isGroupArrayBufferViewSourceTexture(
             texture,
             arrayBufferViewSourceTextureRecord,
           ) ?
             {
               ...state,
               arrayBufferViewSourceTextureRecord:
                 Some(arrayBufferViewSourceTextureRecord),
             } :
             {
               let textureIndexInTypeArr =
                 IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
                   texture,
                   IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
                     state,
                   ),
                 );

               let state =
                 state |> _disposeData(texture, textureIndexInTypeArr);

               let arrayBufferViewSourceTextureRecord =
                 RecordArrayBufferViewSourceTextureMainService.getRecord(
                   state,
                 );

               {
                 ...state,
                 arrayBufferViewSourceTextureRecord:
                   Some({
                     ...arrayBufferViewSourceTextureRecord,
                     disposedIndexArray:
                       DisposeTextureService.addDisposeIndex(
                         textureIndexInTypeArr,
                         arrayBufferViewSourceTextureRecord.disposedIndexArray,
                       ),
                   }),
               };
             };
       },
       state,
     );
};