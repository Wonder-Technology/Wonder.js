let _buildSamplerDataMapKey = (wrapS, wrapT, magFilter, minFilter) =>
  (wrapS |> Js.Int.toString)
  ++ (wrapT |> Js.Int.toString)
  ++ (magFilter |> Js.Int.toString)
  ++ (minFilter |> Js.Int.toString);

let _getWrapData = wrap =>
  SourceTextureType.(
    switch (wrap |> uint8ToWrap) {
    | Clamp_to_edge => 33071
    | Mirrored_repeat => 33648
    | Repeat => 10497
    }
  );

let _getFilterData = filter =>
  SourceTextureType.(
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

  switch (samplerIndexMap |> WonderCommonlib.HashMapService.get(key)) {
  | Some(samplerIndex) => (samplerIndex, samplerIndexMap, samplerDataArr)
  | None =>
    let samplerIndex = samplerDataArr |> Js.Array.length;

    (
      samplerIndex,
      samplerIndexMap |> WonderCommonlib.HashMapService.set(key, samplerIndex),
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
  switch (FileNameService.getFileExtName(Obj.magic(source)##name)) {
  | None
  | Some(".png") => "image/png"
  | Some(".jpg")
  | Some(".jpeg") => "image/jpeg"
  | mimeType =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getImageMimeType",
        ~description={j|unknown image mimeType: $mimeType|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _getImageBase64 = (texture, source) =>
  _convertImageToBase64(
    TextureSizeService.getWidth(source),
    TextureSizeService.getHeight(source),
    _getImageMimeType(source),
    source,
  );

let _addImageData =
    (
      (texture, imageMap, state),
      imageUint8ArrayDataMap,
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
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
  open Js.Typed_array;

  let source =
    OperateBasicSourceTextureMainService.unsafeGetSource(texture, state);

  switch (imageMap |> SparseMapService.indexOf(source)) {
  | imageIndex when imageIndex === (-1) =>
    let imageIndex = imageUint8DataArr |> Js.Array.length;

    let (mimeType, imageUint8Array) =
      switch (
        imageUint8ArrayDataMap
        |> WonderCommonlib.SparseMapService.get(texture)
      ) {
      | Some(data) => data
      | None =>
        let imageBase64 = _getImageBase64(texture, source);

        (
          BufferUtils.getBase64MimeType(imageBase64),
          BufferUtils.convertBase64ToBinary(imageBase64),
        );
      };

    let imageUint8ArrayByteLength = imageUint8Array |> Uint8Array.byteLength;

    let imageUint8ArrayAlignedByteLength =
      imageUint8ArrayByteLength |> BufferUtils.alignedLength;

    (
      imageIndex,
      imageMap |> WonderCommonlib.SparseMapService.set(imageIndex, source),
      imageUint8DataArr
      |> ArrayService.push(
           {
             name: ImageUtils.getImageName(source) |> Js.Nullable.toOption,
             bufferView: bufferViewDataArr |> Js.Array.length,
             mimeType: mimeType |> _convertBase64MimeTypeToWDBMimeType,
             uint8Array: imageUint8Array,
             byteOffset,
           }: GenerateSceneGraphType.imageData,
         ),
      (
        totalByteLength + imageUint8ArrayAlignedByteLength,
        byteOffset + imageUint8ArrayAlignedByteLength,
        bufferViewDataArr
        |> ArrayService.push(
             {buffer: 0, byteOffset, byteLength: imageUint8ArrayByteLength}: GenerateSceneGraphType.bufferViewData,
           ),
      ),
    );
  | imageIndex => (
      imageIndex,
      imageMap,
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
    )
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
       }: GenerateSceneGraphType.textureData,
     );

let build =
    (
      (lightMaterial, diffuseMap, name),
      (
        (materialDataArr, textureDataArr, samplerDataArr, imageUint8DataArr),
        (textureIndexMap, samplerIndexMap, imageMap, imageUint8ArrayDataMap),
      ),
      (totalByteLength, byteOffset, bufferViewDataArr),
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

  switch (textureIndexMap |> WonderCommonlib.SparseMapService.get(diffuseMap)) {
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
      (textureIndexMap, samplerIndexMap, imageMap),
      (totalByteLength, byteOffset, bufferViewDataArr),
    )

  | None =>
    let textureIndex = textureDataArr |> Js.Array.length;

    let textureIndexMap =
      textureIndexMap
      |> WonderCommonlib.SparseMapService.set(diffuseMap, textureIndex);

    let (samplerIndex, samplerIndexMap, samplerDataArr) =
      _addSamplerData(diffuseMap, samplerIndexMap, state, samplerDataArr);

    let (
      imageIndex,
      imageMap,
      imageUint8DataArr,
      (totalByteLength, byteOffset, bufferViewDataArr),
    ) =
      _addImageData(
        (diffuseMap, imageMap, state),
        imageUint8ArrayDataMap,
        imageUint8DataArr,
        (totalByteLength, byteOffset, bufferViewDataArr),
      );

    (
      (
        materialDataArr
        |> ArrayService.push(
             {baseColorFactor, baseColorTexture: Some(textureIndex), name}: GenerateSceneGraphType.lightMaterialData,
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
      (textureIndexMap, samplerIndexMap, imageMap),
      (totalByteLength, byteOffset, bufferViewDataArr),
    );
  };
};