open StateRenderType;

let handleUpdate =
    (
      gl,
      texture,
      {basicSourceTextureRecord, arrayBufferViewSourceTextureRecord, browserDetectRecord} as state
    ) =>
  IndexSourceTextureService.handleByJudgeSourceTextureIndex(
    texture,
    arrayBufferViewSourceTextureRecord.textureIndexOffset,
    (gl, state),
    (
      (
        basicSourceTextureInTypeArray,
        (
          gl,
          {basicSourceTextureRecord, arrayBufferViewSourceTextureRecord, browserDetectRecord} as state
        )
      ) => {
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
        state
      },
      (
        arrayBufferViewTextureInTypeArray,
        (
          gl,
          {basicSourceTextureRecord, arrayBufferViewSourceTextureRecord, browserDetectRecord} as state
        )
      ) => {
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
      }
    )
  );