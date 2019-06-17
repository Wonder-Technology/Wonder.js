/* let generateArrayBufferViewSourceTextureIndexWithSetting =
    (arrayBufferViewSourceTextureIndex, settingRecord) =>
  IndexSourceTextureService.generateArrayBufferViewSourceTextureIndex(
    arrayBufferViewSourceTextureIndex,
    BufferSettingService.getBasicSourceTextureCount(settingRecord),
  ); */

let getAllArrayBufferViewSourceTextureIndexWhenInit =
    (index, basicSourceTextureCount) =>
  ArrayService.range(0, index - 1)
  |> Js.Array.map(indexInTypeArr =>
       IndexSourceTextureService.generateArrayBufferViewSourceTextureIndex(
         indexInTypeArr,
         basicSourceTextureCount,
       )
     );