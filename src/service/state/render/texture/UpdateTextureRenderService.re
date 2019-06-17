open StateRenderType;

let _handleUpdateBasicSourceTexture =
  (.
    basicSourceTexture,
    (
      gl,
      {
        basicSourceTextureRecord,
        arrayBufferViewSourceTextureRecord,
        browserDetectRecord,
      } as state,
    ),
  ) => {
    let basicSourceTextureInTypeArray = basicSourceTexture;

    let (basicSourceTextureRecord, browserDetectRecord) =
      UpdateBasicSourceTextureRenderService.isNeedUpdate(
        basicSourceTextureInTypeArray,
        basicSourceTextureRecord,
      ) ?
        UpdateBasicSourceTextureRenderService.update(
          gl,
          basicSourceTextureInTypeArray,
          (basicSourceTextureRecord, browserDetectRecord),
        ) :
        (basicSourceTextureRecord, browserDetectRecord);
    state;
  };

let _handleUpdateArrayBufferViewSourceTexture =
  (.
    arrayBufferViewTexture,
    (
      gl,
      {
        basicSourceTextureRecord,
        arrayBufferViewSourceTextureRecord,
        browserDetectRecord,
      } as state,
    ),
  ) => {
    let arrayBufferViewTextureInTypeArray =
      IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
        arrayBufferViewTexture,
        arrayBufferViewSourceTextureRecord.textureIndexOffset,
      );

    let (arrayBufferViewSourceTextureRecord, browserDetectRecord) =
      UpdateArrayBufferViewSourceTextureRenderService.isNeedUpdate(
        arrayBufferViewTextureInTypeArray,
        arrayBufferViewSourceTextureRecord,
      ) ?
        UpdateArrayBufferViewSourceTextureRenderService.update(
          gl,
          (arrayBufferViewTexture,
          arrayBufferViewTextureInTypeArray),
          (arrayBufferViewSourceTextureRecord, browserDetectRecord),
        ) :
        (arrayBufferViewSourceTextureRecord, browserDetectRecord);
    state;
  };

let handleUpdate =
    (
      gl,
      texture,
      {
        basicSourceTextureRecord,
        arrayBufferViewSourceTextureRecord,
        browserDetectRecord,
      } as state,
    ) =>
  IndexAllSourceTextureService.handleByJudgeSourceTextureIndex(
    texture,
    arrayBufferViewSourceTextureRecord.textureIndexOffset,
    (gl, state),
    (
      _handleUpdateBasicSourceTexture,
      _handleUpdateArrayBufferViewSourceTexture,
    ),
  );