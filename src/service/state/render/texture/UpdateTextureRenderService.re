open StateRenderType;

let handleUpdate =
    (
      gl,
      texture,
      {basicSourceTextureRecord, arrayBufferViewSourceTextureRecord, browserDetectRecord} as state
    ) => {
  let (basicSourceTextureRecord, browserDetectRecord) =
    UpdateBasicSourceTextureRenderService.isNeedUpdate(texture, basicSourceTextureRecord) ?
      UpdateBasicSourceTextureRenderService.update(
        gl,
        texture,
        (basicSourceTextureRecord, browserDetectRecord)
      ) :
      (basicSourceTextureRecord, browserDetectRecord);
  let (arrayBufferViewSourceTextureRecord, browserDetectRecord) =
    UpdateArrayBufferViewSourceTextureRenderService.isNeedUpdate(
      texture,
      arrayBufferViewSourceTextureRecord
    ) ?
      UpdateArrayBufferViewSourceTextureRenderService.update(
        gl,
        texture,
        (arrayBufferViewSourceTextureRecord, browserDetectRecord)
      ) :
      (arrayBufferViewSourceTextureRecord, browserDetectRecord);
  state
};