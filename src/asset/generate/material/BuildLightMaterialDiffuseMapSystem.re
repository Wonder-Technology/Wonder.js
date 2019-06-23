let _buildSamplerDataMapKey = (wrapS, wrapT, magFilter, minFilter) =>
  (wrapS |> Js.Int.toString)
  ++ (wrapT |> Js.Int.toString)
  ++ (magFilter |> Js.Int.toString)
  ++ (minFilter |> Js.Int.toString);

let _getWrapData = wrap =>
  TextureType.(
    switch (wrap |> uint8ToWrap) {
    | Clamp_to_edge => 33071
    | Mirrored_repeat => 33648
    | Repeat => 10497
    }
  );

let _getFilterData = filter =>
  TextureType.(
    switch (filter |> uint8ToFilter) {
    | Nearest => 9728
    | Linear => 9729
    | Nearest_mipmap_nearest => 9984
    | Linear_mipmap_nearest => 9985
    | Nearest_mipmap_linear => 9986
    | Linear_mipmap_linear => 9987
    }
  );

let _addSamplerData = (texture, samplerIndexMap, state, samplerDataArr) => {
  let wrapS = OperateBasicSourceTextureMainService.getWrapS(texture, state);
  let wrapT = OperateBasicSourceTextureMainService.getWrapT(texture, state);
  let magFilter =
    OperateBasicSourceTextureMainService.getMagFilter(texture, state);
  let minFilter =
    OperateBasicSourceTextureMainService.getMinFilter(texture, state);

  let key = _buildSamplerDataMapKey(wrapS, wrapT, magFilter, minFilter);

  switch (samplerIndexMap |> WonderCommonlib.MutableHashMapService.get(key)) {
  | Some(samplerIndex) => (samplerIndex, samplerIndexMap, samplerDataArr)
  | None =>
    let samplerIndex = samplerDataArr |> Js.Array.length;

    (
      samplerIndex,
      samplerIndexMap
      |> WonderCommonlib.MutableHashMapService.set(key, samplerIndex),
      samplerDataArr
      |> ArrayService.push(
           {
             wrapS: _getWrapData(wrapS),
             wrapT: _getWrapData(wrapT),
             magFilter: _getFilterData(magFilter),
             minFilter: _getFilterData(minFilter),
           }: GenerateSceneGraphType.samplerData,
         ),
    );
  };
};

let _convertImageToBase64 = [%raw
  (width, height, mimeType, image) => {|
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var dataURL = null;
    canvas.height = width;
    canvas.width = height;
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL(mimeType);
    |}
];

/* let _getLastBufferViewOffset = bufferViewDataArr => {
     WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|bufferViewDataArr.length >= 1|j},
                   ~actual={j|is 0|j},
                 ),
                 () =>
                 bufferViewDataArr |> Js.Array.length >= 1
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

     let sortedBufferViewDataArr =
       bufferViewDataArr
       |> Js.Array.copy
       |> Js.Array.sortInPlaceWith(
            (
              bufferViewA: GenerateSceneGraphType.bufferViewData,
              bufferViewB: GenerateSceneGraphType.bufferViewData,
            ) =>
            bufferViewB.byteOffset - bufferViewA.byteOffset
          );

     let {byteOffset, byteLength}: GenerateSceneGraphType.bufferViewData = sortedBufferViewDataArr[0];

     byteOffset + byteLength;
   }; */

let _convertBase64MimeTypeToWDBMimeType = mimeType =>
  switch (mimeType) {
  | "image/png"
  | "image/jpeg" => mimeType
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_convertBase64MimeTypeToWDBMimeType",
        ~description={j|unknown mimeType: $mimeType|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _getImageMimeType = source =>
  ImageService.getMimeTypeByExtname(
    FileNameService.getFileExtName(Obj.magic(source)##name),
  );

let _getImageBase64 = (texture, source) =>
  _convertImageToBase64(
    TextureSizeService.getWidth(source),
    TextureSizeService.getHeight(source),
    _getImageMimeType(source),
    source,
  );

let _getImageUint8ArrayData =
    (texture, source, imageUint8ArrayDataMap, getResultUint8ArrayDataFunc) => {
  open Js.Typed_array;

  let (mimeType, imageUint8Array) =
    switch (
      imageUint8ArrayDataMap
      |> WonderCommonlib.MutableSparseMapService.get(texture)
    ) {
    | Some(data) => data
    | None =>
      let imageBase64 = _getImageBase64(texture, source);

      (
        BufferUtils.getBase64MimeType(imageBase64),
        BufferUtils.convertBase64ToBinary(imageBase64),
      );
    };

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

let _addImageData =
    (
      (texture, imageMap, imageUint8ArrayMap, state),
      (imageUint8ArrayDataMap, imageResultUint8ArrayMap),
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

  let source =
    OperateBasicSourceTextureMainService.unsafeGetSource(texture, state);

  switch (imageMap |> WonderCommonlib.MutableSparseMapService.indexOf(source)) {
  | imageIndex when imageIndex === (-1) =>
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
        source,
        imageUint8ArrayDataMap,
        getResultUint8ArrayDataFunc,
      );

    let imageUint8ArrayMap =
      imageUint8ArrayMap
      |> WonderCommonlib.MutableSparseMapService.set(
           imageIndex,
           imageUint8Array,
         );

    let imageResultUint8ArrayMap =
      imageResultUint8ArrayMap
      |> WonderCommonlib.MutableSparseMapService.set(texture, imageUint8Array);

    (
      imageIndex,
      imageMap
      |> WonderCommonlib.MutableSparseMapService.set(imageIndex, source),
      imageUint8ArrayMap,
      imageUint8DataArr
      |> ArrayService.push(
           {
             name: ImageUtils.getImageName(source) |> Js.Nullable.toOption,
             bufferView: bufferViewDataArr |> Js.Array.length,
             mimeType: mimeType |> _convertBase64MimeTypeToWDBMimeType,
             uint8Array: imageResultUint8Array,
             byteOffset,
           }: GenerateSceneGraphType.imageData,
         ),
      imageResultUint8ArrayMap,
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
  | imageIndex =>
    let imageResultUint8ArrayMap =
      imageResultUint8ArrayMap
      |> WonderCommonlib.MutableSparseMapService.set(
           texture,
           imageUint8ArrayMap
           |> WonderCommonlib.MutableSparseMapService.unsafeGet(imageIndex),
         );

    (
      imageIndex,
      imageMap,
      imageUint8ArrayMap,
      imageUint8DataArr,
      imageResultUint8ArrayMap,
      (totalByteLength, byteOffset, bufferViewDataArr),
    );
  };
};

let _addTextureData =
    (texture, (samplerIndex, imageIndex), state, textureDataArr) =>
  textureDataArr
  |> ArrayService.push(
       {
         name: NameBasicSourceTextureMainService.getName(texture, state),
         sampler: samplerIndex,
         source: imageIndex,
         format:
           OperateBasicSourceTextureMainService.getFormat(texture, state),
         type_: OperateBasicSourceTextureMainService.getType(texture, state),
         flipY: OperateBasicSourceTextureMainService.getFlipY(texture, state),
       }: GenerateSceneGraphType.textureData,
     );

let _addMaterialData =
    (materialDataArr, (baseColorFactor, textureIndex, name)) =>
  materialDataArr
  |> ArrayService.push(
       {baseColorFactor, baseColorTexture: Some(textureIndex), name}: GenerateSceneGraphType.lightMaterialData,
     );

let build =
    (
      (lightMaterial, diffuseMap, name),
      (
        (materialDataArr, textureDataArr, samplerDataArr, imageUint8DataArr),
        (
          textureIndexMap,
          samplerIndexMap,
          imageMap:
            WonderCommonlib.MutableSparseMapService.t(
              WonderWebgl.DomExtendType.imageElement,
            ),
          imageUint8ArrayMap,
          imageUint8ArrayDataMap,
          imageResultUint8ArrayMap,
        ),
      ),
      (totalByteLength, byteOffset, bufferViewDataArr),
      getResultUint8ArrayDataFunc,
      state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|map be basicSourceTexture|j},
                ~actual={j|not|j},
              ),
              () =>
              TypeSourceTextureMainService.isBasicSourceTexture(
                diffuseMap,
                state,
              )
              |> assertTrue
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let diffuseColor =
    OperateLightMaterialMainService.getDiffuseColor(lightMaterial, state);
  let baseColorFactor = BuildMaterialUtils.buildColorFactor(diffuseColor);

  switch (
    textureIndexMap |> WonderCommonlib.MutableSparseMapService.get(diffuseMap)
  ) {
  | Some(existedTextureIndex) => (
      (
        materialDataArr
        |> ArrayService.push(
             {
               baseColorFactor,
               baseColorTexture: Some(existedTextureIndex),
               name,
             }: GenerateSceneGraphType.lightMaterialData,
           ),
        textureDataArr,
        samplerDataArr,
        imageUint8DataArr,
      ),
      (
        textureIndexMap,
        samplerIndexMap,
        imageMap,
        imageUint8ArrayMap,
        imageResultUint8ArrayMap,
      ),
      (totalByteLength, byteOffset, bufferViewDataArr),
    )

  | None =>
    let textureIndex = textureDataArr |> Js.Array.length;

    let textureIndexMap =
      textureIndexMap
      |> WonderCommonlib.MutableSparseMapService.set(diffuseMap, textureIndex);

    let (samplerIndex, samplerIndexMap, samplerDataArr) =
      _addSamplerData(diffuseMap, samplerIndexMap, state, samplerDataArr);

    let (
      imageIndex,
      imageMap,
      imageUint8ArrayMap,
      imageUint8DataArr,
      imageResultUint8ArrayMap,
      (totalByteLength, byteOffset, bufferViewDataArr),
    ) =
      _addImageData(
        (diffuseMap, imageMap, imageUint8ArrayMap, state),
        (imageUint8ArrayDataMap, imageResultUint8ArrayMap),
        imageUint8DataArr,
        (totalByteLength, byteOffset, bufferViewDataArr),
        getResultUint8ArrayDataFunc,
      );

    (
      (
        _addMaterialData(
          materialDataArr,
          (baseColorFactor, textureIndex, name),
        ),
        _addTextureData(
          diffuseMap,
          (samplerIndex, imageIndex),
          state,
          textureDataArr,
        ),
        samplerDataArr,
        imageUint8DataArr,
      ),
      (
        textureIndexMap,
        samplerIndexMap,
        imageMap,
        imageUint8ArrayMap,
        imageResultUint8ArrayMap,
      ),
      (totalByteLength, byteOffset, bufferViewDataArr),
    );
  };
};