open StateRenderType;

let handleUpdate =
    (
      gl,
      texture,
      {basicSourceTextureRecord, arrayBufferViewSourceTextureRecord, browserDetectRecord} as state
    ) => {
  let basicSourceTextureInTypeArray = texture;
  let (basicSourceTextureRecord, browserDetectRecord) =
    UpdateBasicSourceTextureRenderService.isNeedUpdate(
      basicSourceTextureInTypeArray,
      basicSourceTextureRecord
    ) ?
      UpdateBasicSourceTextureRenderService.update(
        gl,
        basicSourceTextureInTypeArray,
        (basicSourceTextureRecord, browserDetectRecord)
      ) :
      (basicSourceTextureRecord, browserDetectRecord);
  let arrayBufferViewTextureInTypeArray =
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      arrayBufferViewSourceTextureRecord.textureIndexOffset
    );
  let (arrayBufferViewSourceTextureRecord, browserDetectRecord) =
    UpdateArrayBufferViewSourceTextureRenderService.isNeedUpdate(
      arrayBufferViewTextureInTypeArray,
      arrayBufferViewSourceTextureRecord
    ) ?
      UpdateArrayBufferViewSourceTextureRenderService.update(
        gl,
        arrayBufferViewTextureInTypeArray,
        (arrayBufferViewSourceTextureRecord, browserDetectRecord)
      ) :
      (arrayBufferViewSourceTextureRecord, browserDetectRecord);
  state
};