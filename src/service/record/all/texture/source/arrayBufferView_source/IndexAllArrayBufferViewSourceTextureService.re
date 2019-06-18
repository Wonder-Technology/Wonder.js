/* let generateArrayBufferViewSourceTextureIndexWithSetting =
    (arrayBufferViewSourceTextureIndex, settingRecord) =>
  IndexAllSourceTextureService.generateArrayBufferViewSourceTextureIndex(
    arrayBufferViewSourceTextureIndex,
    BufferSettingService.getBasicSourceTextureCount(settingRecord),
  ); */

let getAllArrayBufferViewSourceTextureIndexWhenInit =
    (index, basicSourceTextureCount) =>
  ArrayService.range(0, index - 1)
  |> Js.Array.map(indexInTypeArr =>
       IndexAllSourceTextureService.generateArrayBufferViewSourceTextureIndex(
         indexInTypeArr,
         basicSourceTextureCount,
       )
     );