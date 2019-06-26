open StateRenderType;

let _handleUpdateBasicSourceTexture =
  (.
    basicSourceTexture,
    (gl, {basicSourceTextureRecord, browserDetectRecord} as state),
  ) => {
    let basicSourceTextureInTypeArray = basicSourceTexture;

    let (basicSourceTextureRecord, browserDetectRecord) =
      UpdateBasicSourceTextureRenderService.isNeedUpdate(
        basicSourceTextureInTypeArray,
        basicSourceTextureRecord,
      ) ?
        UpdateBasicSourceTextureRenderService.update(
          gl,
          (basicSourceTexture, basicSourceTextureInTypeArray),
          (basicSourceTextureRecord, browserDetectRecord),
        ) :
        (basicSourceTextureRecord, browserDetectRecord);
    state;
  };

let _handleUpdateArrayBufferViewSourceTexture =
  (.
    arrayBufferViewTexture,
    (gl, {arrayBufferViewSourceTextureRecord, browserDetectRecord} as state),
  ) => {
    let arrayBufferViewTextureInTypeArray =
      IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
        arrayBufferViewTexture,
        IndexSourceTextureRenderService.getArrayBufferViewSourceTextureIndexOffset(
          state,
        ),
      );

    let (arrayBufferViewSourceTextureRecord, browserDetectRecord) =
      UpdateArrayBufferViewSourceTextureRenderService.isNeedUpdate(
        arrayBufferViewTextureInTypeArray,
        arrayBufferViewSourceTextureRecord,
      ) ?
        UpdateArrayBufferViewSourceTextureRenderService.update(
          gl,
          (arrayBufferViewTexture, arrayBufferViewTextureInTypeArray),
          (arrayBufferViewSourceTextureRecord, browserDetectRecord),
        ) :
        (arrayBufferViewSourceTextureRecord, browserDetectRecord);
    state;
  };

let _handleUpdateCubemapTexture =
  (.
    cubemapTexture,
    (gl, {cubemapTextureRecord, browserDetectRecord} as state),
  ) => {
    let cubemapTextureInTypeArray = cubemapTexture;

    let (cubemapTextureRecord, browserDetectRecord) =
      UpdateCubemapTextureRenderService.isNeedUpdate(
        cubemapTextureInTypeArray,
        cubemapTextureRecord,
      ) ?
        UpdateCubemapTextureRenderService.update(
          gl,
          cubemapTextureInTypeArray,
          (cubemapTextureRecord, browserDetectRecord),
        ) :
        (cubemapTextureRecord, browserDetectRecord);
    state;
  };

let handleUpdate =
    (
      gl,
      (texture, textureType),
      {
        basicSourceTextureRecord,
        arrayBufferViewSourceTextureRecord,
        browserDetectRecord,
      } as state,
    ) =>
  switch (textureType) {
  | TextureType.BasicSource =>
    _handleUpdateBasicSourceTexture(. texture, (gl, state))
  | TextureType.ArrayBufferViewSource =>
    _handleUpdateArrayBufferViewSourceTexture(. texture, (gl, state))
  | TextureType.Cubemap =>
    _handleUpdateCubemapTexture(. texture, (gl, state))
  };