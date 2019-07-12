open StateDataMainType;

let _addSamplerData = (texture, state, samplerDataArr) => {
  let wrapS = OperateCubemapTextureMainService.getWrapS(texture, state);
  let wrapT = OperateCubemapTextureMainService.getWrapT(texture, state);
  let magFilter =
    OperateCubemapTextureMainService.getMagFilter(texture, state);
  let minFilter =
    OperateCubemapTextureMainService.getMinFilter(texture, state);

  (
    samplerDataArr |> Js.Array.length,
    samplerDataArr
    |> ArrayService.push(
         {
           wrapS: BuildTextureDataUtils.getWrapData(wrapS),
           wrapT: BuildTextureDataUtils.getWrapData(wrapT),
           magFilter: BuildTextureDataUtils.getFilterData(magFilter),
           minFilter: BuildTextureDataUtils.getFilterData(minFilter),
         }: GenerateSceneGraphType.samplerData,
       ),
  );
};

let _getImageUint8ArrayData = (texture, source, getResultUint8ArrayDataFunc) => {
  open Js.Typed_array;

  let imageBase64 = BuildTextureDataUtils.getImageBase64(source);

  let (mimeType, imageUint8Array) = (
    BufferUtils.getBase64MimeType(imageBase64),
    BufferUtils.convertBase64ToBinary(imageBase64),
  );

  let imageResultUint8Array = imageUint8Array |> getResultUint8ArrayDataFunc;
  let imageResultUint8ArrayByteLength =
    imageResultUint8Array |> Uint8Array.byteLength;
  let imageResultUint8ArrayAlignedByteLength =
    imageResultUint8ArrayByteLength |> BufferUtils.alignedLength;

  (
    mimeType,
    imageUint8Array,
    (
      imageResultUint8Array,
      imageResultUint8ArrayByteLength,
      imageResultUint8ArrayAlignedByteLength,
    ),
  );
};

let _addOneFaceImageData =
    (
      oneFaceSource,
      /* (texture, imageUint8ArrayMap, state), */
      (texture, state),
      /* (imageUint8ArrayDataMap, imageResultUint8ArrayMap), */
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|byteOffset aligned with multiple of 4|j},
                ~actual={j|not|j},
              ),
              () =>
              byteOffset mod 4 == 0
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let imageIndex = imageUint8DataArr |> Js.Array.length;

  let (
    mimeType,
    imageUint8Array,
    (
      imageResultUint8Array,
      imageResultUint8ArrayByteLength,
      imageResultUint8ArrayAlignedByteLength,
    ),
  ) =
    _getImageUint8ArrayData(
      texture,
      oneFaceSource,
      getResultUint8ArrayDataFunc,
    );

  /* let imageUint8ArrayMap =
     imageUint8ArrayMap
     |> WonderCommonlib.MutableSparseMapService.set(
          imageIndex,
          imageUint8Array,
        ); */

  /* let imageResultUint8ArrayMap =
     imageResultUint8ArrayMap
     |> WonderCommonlib.MutableSparseMapService.set(texture, imageUint8Array); */

  (
    imageIndex,
    /* imageUint8ArrayMap, */
    imageUint8DataArr
    |> ArrayService.push(
         {
           name:
             ImageUtils.getImageName(oneFaceSource) |> Js.Nullable.toOption,
           bufferView: bufferViewDataArr |> Js.Array.length,
           mimeType:
             mimeType
             |> BuildTextureDataUtils.convertBase64MimeTypeToWDBMimeType,
           uint8Array: imageResultUint8Array,
           byteOffset,
         }: GenerateSceneGraphType.imageData,
       ),
    /* imageResultUint8ArrayMap, */
    (
      totalByteLength + imageResultUint8ArrayAlignedByteLength,
      byteOffset + imageResultUint8ArrayAlignedByteLength,
      bufferViewDataArr
      |> ArrayService.push(
           {
             buffer: 0,
             byteOffset,
             byteLength: imageResultUint8ArrayByteLength,
           }: GenerateSceneGraphType.bufferViewData,
         ),
    ),
  );
};

let _addImageData =
    (
      (texture, state),
      /* (imageUint8ArrayDataMap, imageResultUint8ArrayMap), */
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
    ) => {
  let (
    pxImageIndex,
    imageUint8DataArr,
    /* imageResultUint8ArrayMap, */
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    _addOneFaceImageData(
      OperateCubemapTextureMainService.unsafeGetPXSource(texture, state),
      (texture, state),
      /* (imageUint8ArrayDataMap, imageResultUint8ArrayMap), */
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
    );

  let (
    nxImageIndex,
    imageUint8DataArr,
    /* imageResultUint8ArrayMap, */
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    _addOneFaceImageData(
      OperateCubemapTextureMainService.unsafeGetNXSource(texture, state),
      (texture, state),
      /* (imageUint8ArrayDataMap, imageResultUint8ArrayMap), */
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
    );
  let (
    pyImageIndex,
    imageUint8DataArr,
    /* imageResultUint8ArrayMap, */
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    _addOneFaceImageData(
      OperateCubemapTextureMainService.unsafeGetPYSource(texture, state),
      (texture, state),
      /* (imageUint8ArrayDataMap, imageResultUint8ArrayMap), */
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
    );
  let (
    nyImageIndex,
    imageUint8DataArr,
    /* imageResultUint8ArrayMap, */
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    _addOneFaceImageData(
      OperateCubemapTextureMainService.unsafeGetNYSource(texture, state),
      (texture, state),
      /* (imageUint8ArrayDataMap, imageResultUint8ArrayMap), */
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
    );
  let (
    pzImageIndex,
    imageUint8DataArr,
    /* imageResultUint8ArrayMap, */
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    _addOneFaceImageData(
      OperateCubemapTextureMainService.unsafeGetPZSource(texture, state),
      (texture, state),
      /* (imageUint8ArrayDataMap, imageResultUint8ArrayMap), */
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
    );
  let (
    nzImageIndex,
    imageUint8DataArr,
    /* imageResultUint8ArrayMap, */
    (totalByteLength, byteOffset, bufferViewDataArr),
  ) =
    _addOneFaceImageData(
      OperateCubemapTextureMainService.unsafeGetNZSource(texture, state),
      (texture, state),
      /* (imageUint8ArrayDataMap, imageResultUint8ArrayMap), */
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
    );

  (
    (
      pxImageIndex,
      nxImageIndex,
      pyImageIndex,
      nyImageIndex,
      pzImageIndex,
      nzImageIndex,
    ),
    imageUint8DataArr,
    /* imageResultUint8ArrayMap, */
    (totalByteLength, byteOffset, bufferViewDataArr),
  );
};

let _addTextureData =
    (
      texture,
      (
        samplerIndex,
        (
          pxImageIndex,
          nxImageIndex,
          pyImageIndex,
          nyImageIndex,
          pzImageIndex,
          nzImageIndex,
        ),
      ),
      state,
      textureDataArr,
    ) =>
  textureDataArr
  |> ArrayService.push(
       {
         name: NameCubemapTextureMainService.getName(texture, state),
         sampler: samplerIndex,
         pxSource: pxImageIndex,
         nxSource: nxImageIndex,
         pySource: pyImageIndex,
         nySource: nyImageIndex,
         pzSource: pzImageIndex,
         nzSource: nzImageIndex,
         pxFormat:
           OperateCubemapTextureMainService.getPXFormat(texture, state),
         nxFormat:
           OperateCubemapTextureMainService.getNXFormat(texture, state),
         pyFormat:
           OperateCubemapTextureMainService.getPYFormat(texture, state),
         nyFormat:
           OperateCubemapTextureMainService.getNYFormat(texture, state),
         pzFormat:
           OperateCubemapTextureMainService.getPZFormat(texture, state),
         nzFormat:
           OperateCubemapTextureMainService.getNZFormat(texture, state),
         pxType: OperateCubemapTextureMainService.getPXType(texture, state),
         nxType: OperateCubemapTextureMainService.getNXType(texture, state),
         pyType: OperateCubemapTextureMainService.getPYType(texture, state),
         nyType: OperateCubemapTextureMainService.getNYType(texture, state),
         pzType: OperateCubemapTextureMainService.getPZType(texture, state),
         nzType: OperateCubemapTextureMainService.getNZType(texture, state),
         flipY: OperateCubemapTextureMainService.getFlipY(texture, state),
       }: GenerateSceneGraphType.cubemapTextureData,
     );

let build =
    (
      cubemapTextureDataArr,
      samplerDataArr,
      imageUint8DataArr,
      /* imageUint8ArrayDataMap,
         imageResultUint8ArrayMap, */
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
      state,
    ) =>
  switch (SkyboxSceneMainService.getCubemapTexture(state)) {
  | None => (
      None,
      (cubemapTextureDataArr, samplerDataArr, imageUint8DataArr),
      /* imageResultUint8ArrayMap, */
      (totalByteLength, byteOffset, bufferViewDataArr),
    )
  | Some(cubemapTexture) =>
    let (samplerIndex, samplerDataArr) =
      _addSamplerData(cubemapTexture, state, samplerDataArr);

    let (
      (
        pxImageIndex,
        nxImageIndex,
        pyImageIndex,
        nyImageIndex,
        pzImageIndex,
        nzImageIndex,
      ),
      imageUint8DataArr,
      /* imageResultUint8ArrayMap, */
      (totalByteLength, byteOffset, bufferViewDataArr),
    ) =
      _addImageData(
        (cubemapTexture, state),
        /* (imageUint8ArrayDataMap, imageResultUint8ArrayMap), */
        imageUint8DataArr,
        (totalByteLength, byteOffset, bufferViewDataArr),
        getResultUint8ArrayDataFunc,
      );

    let skyboxCubemapTextureIndex = cubemapTextureDataArr |> Js.Array.length;

    let cubemapTextureDataArr =
      _addTextureData(
        cubemapTexture,
        (
          samplerIndex,
          (
            pxImageIndex,
            nxImageIndex,
            pyImageIndex,
            nyImageIndex,
            pzImageIndex,
            nzImageIndex,
          ),
        ),
        state,
        cubemapTextureDataArr,
      );

    (
      Some(skyboxCubemapTextureIndex),
      (cubemapTextureDataArr, samplerDataArr, imageUint8DataArr),
      /* imageResultUint8ArrayMap, */
      (totalByteLength, byteOffset, bufferViewDataArr),
    );
  };