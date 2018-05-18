let getBasicSourceTextureIndexOffset = () => 0;

let getArrayBufferViewSourceTextureIndexOffset = (basicSourceTextureCount) => basicSourceTextureCount;

let getBasicSourceTextureIndex = (basicSourceTextureIndex) =>
  getBasicSourceTextureIndexOffset() + basicSourceTextureIndex;

let getArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, basicSourceTextureCount) =>
  getArrayBufferViewSourceTextureIndexOffset(basicSourceTextureCount)
  + arrayBufferViewSourceTextureIndex;

let getArrayBufferViewSourceTextureIndexInTypeArray =
    (arrayBufferViewSourceTextureIndex, arrayBufferViewSourceTextureIndexOffset) =>
  arrayBufferViewSourceTextureIndex
  - arrayBufferViewSourceTextureIndexOffset
  |> WonderLog.Contract.ensureCheck(
       (index) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|index should >= 0|j}, ~actual={j|is $index|j}),
                 () => index >= 0
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let isBasicSourceTextureIndex = (textureIndex, basicSourceTextureCount) =>
  textureIndex < getArrayBufferViewSourceTextureIndexOffset(basicSourceTextureCount);

let isArrayBufferViewSourceTextureIndex = (textureIndex, basicSourceTextureCount) =>
  textureIndex >= getArrayBufferViewSourceTextureIndexOffset(basicSourceTextureCount);