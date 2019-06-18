let getBasicSourceTextureIndexOffset = () => 0;

let getArrayBufferViewSourceTextureIndexOffset = basicSourceTextureCount => basicSourceTextureCount;

let generateBasicSourceTextureIndex = basicSourceTextureIndex =>
  getBasicSourceTextureIndexOffset() + basicSourceTextureIndex;

let generateArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, basicSourceTextureCount) =>
  getArrayBufferViewSourceTextureIndexOffset(basicSourceTextureCount)
  + arrayBufferViewSourceTextureIndex;

let getArrayBufferViewSourceTextureIndexInTypeArray =
    (
      arrayBufferViewSourceTextureIndex,
      arrayBufferViewSourceTextureIndexOffset,
    ) =>
  arrayBufferViewSourceTextureIndex
  - arrayBufferViewSourceTextureIndexOffset
  |> WonderLog.Contract.ensureCheck(
       index =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|index should >= 0|j},
                   ~actual={j|is $index|j},
                 ),
                 () =>
                 index >= 0
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let isBasicSourceTextureIndex =
    (textureIndex, arrayBufferViewSourceTextureIndexOffset) =>
  textureIndex < arrayBufferViewSourceTextureIndexOffset;

let isArrayBufferViewSourceTextureIndex =
    (textureIndex, arrayBufferViewSourceTextureIndexOffset) =>
  textureIndex >= arrayBufferViewSourceTextureIndexOffset;

let handleByJudgeSourceTextureIndex =
    (
      textureIndex,
      arrayBufferViewSourceTextureIndexOffset,
      funcDataTuple,
      (
        handleBasicSourceTextureIndexFunc,
        handleArrayBufferViewSourceTextureIndexFunc,
      ),
    ) =>
  isBasicSourceTextureIndex(
    textureIndex,
    arrayBufferViewSourceTextureIndexOffset,
  ) ?
    handleBasicSourceTextureIndexFunc(. textureIndex, funcDataTuple) :
    handleArrayBufferViewSourceTextureIndexFunc(.
      /* getArrayBufferViewSourceTextureIndexInTypeArray(
           textureIndex,
           arrayBufferViewSourceTextureIndexOffset
         ), */
      textureIndex,
      funcDataTuple,
    );

let getSourceTextureType =
    (sourceTextureIndex, arrayBufferViewSourceTextureIndexOffset) =>
  isBasicSourceTextureIndex(
    sourceTextureIndex,
    arrayBufferViewSourceTextureIndexOffset,
  ) ?
    TextureType.BasicSource : TextureType.ArrayBufferViewSource;