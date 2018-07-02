let _buildSamplerDataMapKey = (wrapS, wrapT, magFilter, minFilter) =>
  (wrapS |> Js.Int.toString)
  ++ (wrapT |> Js.Int.toString)
  ++ (magFilter |> Js.Int.toString)
  ++ (minFilter |> Js.Int.toString);

let _getWrapData = wrap =>
  SourceTextureType.(
    switch (wrap |> uint8ToWrap) {
    | CLAMP_TO_EDGE => 33071
    | MIRRORED_REPEAT => 33648
    | REPEAT => 10497
    }
  );

let _getFilterData = filter =>
  SourceTextureType.(
    switch (filter |> uint8ToFilter) {
    | NEAREST => 9728
    | LINEAR => 9729
    | NEAREST_MIPMAP_NEAREST => 9984
    | LINEAR_MIPMAP_NEAREST => 9985
    | NEAREST_MIPMAP_LINEAR => 9986
    | LINEAR_MIPMAP_LINEAR => 9987
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
  (width, height, image) => {|
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var dataURL = null;
    canvas.height = width;
    canvas.width = height;
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL();
    |}
];

let _getLastBufferViewOffset = bufferViewDataArr => {
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

  let {byteOffset, byteLength}: GenerateSceneGraphType.bufferViewData = bufferViewDataArr[(
                                                                    bufferViewDataArr
                                                                    |> Js.Array.length
                                                                    )
                                                                    - 1];

  byteOffset + byteLength;
};

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

let _addImageData =
    (
      (texture, imageMap, state),
      imageBase64Map,
      imageUint8DataArr,
      (totalByteLength, bufferViewDataArr),
    ) => {
  open Js.Typed_array;

  let source =
    OperateBasicSourceTextureMainService.unsafeGetSource(texture, state);

  switch (imageMap |> SparseMapService.indexOf(source)) {
  | imageIndex when imageIndex === (-1) =>
    let imageIndex = imageUint8DataArr |> Js.Array.length;

    let imageBase64 =
      switch (imageBase64Map |> WonderCommonlib.SparseMapService.get(texture)) {
      | None =>
        _convertImageToBase64(
          TextureSizeService.getWidth(source),
          TextureSizeService.getHeight(source),
          source,
        )
      | Some(base64Str) => base64Str
      };

    let imageUint8Array = BinaryUtils.convertBase64ToBinary(imageBase64);

    let imageUint8ArrayByteLength =
      imageUint8Array |> Uint8Array.byteLength |> BinaryUtils.alignedLength;

    (
      imageIndex,
      imageMap |> WonderCommonlib.SparseMapService.set(imageIndex, source),
      imageUint8DataArr
      |> ArrayService.push(
           {
             bufferView: bufferViewDataArr |> Js.Array.length,
             mimeType:
               BinaryUtils.getBase64MimeType(imageBase64)
               |> _convertBase64MimeTypeToWDBMimeType,
             uint8Array: imageUint8Array,
           }: GenerateSceneGraphType.imageData,
         ),
      (
        totalByteLength + imageUint8ArrayByteLength,
        bufferViewDataArr
        |> ArrayService.push(
             {
               buffer: 0,
               byteOffset: _getLastBufferViewOffset(bufferViewDataArr),
               byteLength: imageUint8ArrayByteLength,
             }: GenerateSceneGraphType.bufferViewData,
           ),
      ),
    );
  | imageIndex => (
      imageIndex,
      imageMap,
      imageUint8DataArr,
      (totalByteLength, bufferViewDataArr),
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

let _buildNoDiffuseMap =
    (
      (lightMaterial, name),
      (materialDataArr, textureDataArr, samplerDataArr, imageUint8DataArr),
      (textureIndexMap, samplerIndexMap, imageMap),
      (totalByteLength, bufferViewDataArr),
      state,
    ) => {
  let diffuseColor =
    OperateLightMaterialMainService.getDiffuseColor(lightMaterial, state);

  (
    (
      materialDataArr
      |> ArrayService.push(
           {
             baseColorFactor:
               Some([|
                 diffuseColor[0],
                 diffuseColor[1],
                 diffuseColor[2],
                 1.0,
               |]),
             baseColorTexture: None,
             name,
           }: GenerateSceneGraphType.materialData,
         ),
      textureDataArr,
      samplerDataArr,
      imageUint8DataArr,
    ),
    (textureIndexMap, samplerIndexMap, imageMap),
    (totalByteLength, bufferViewDataArr),
  );
};

let _buildDiffuseMap =
    (
      (diffuseMap, name),
      (materialDataArr, textureDataArr, samplerDataArr, imageUint8DataArr),
      (textureIndexMap, samplerIndexMap, imageMap, imageBase64Map),
      (totalByteLength, bufferViewDataArr),
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

  switch (textureIndexMap |> WonderCommonlib.SparseMapService.get(diffuseMap)) {
  | Some(existedTextureIndex) => (
      (
        materialDataArr
        |> ArrayService.push(
             {
               baseColorFactor: None,
               baseColorTexture: Some(existedTextureIndex),
               name,
             }: GenerateSceneGraphType.materialData,
           ),
        textureDataArr,
        samplerDataArr,
        imageUint8DataArr,
      ),
      (textureIndexMap, samplerIndexMap, imageMap),
      (totalByteLength, bufferViewDataArr),
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
      (totalByteLength, bufferViewDataArr),
    ) =
      _addImageData(
        (diffuseMap, imageMap, state),
        imageBase64Map,
        imageUint8DataArr,
        (totalByteLength, bufferViewDataArr),
      );

    (
      (
        materialDataArr
        |> ArrayService.push(
             {
               baseColorFactor: None,
               baseColorTexture: Some(textureIndex),
               name,
             }: GenerateSceneGraphType.materialData,
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
      (totalByteLength, bufferViewDataArr),
    );
  };
};

let build =
    (
      materialDataMap,
      imageBase64Map,
      (totalByteLength, bufferViewDataArr),
      state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(GenerateCommon.checkShouldHasNoSlot(materialDataMap))
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let (
    (materialDataArr, textureDataArr, samplerDataArr, imageUint8DataArr),
    (textureIndexMap, samplerIndexMap, imageMap),
    (totalByteLength, bufferViewDataArr),
  ) =
    materialDataMap
    |> SparseMapService.reduceValid(
         (.
           (
             (
               materialDataArr,
               textureDataArr,
               samplerDataArr,
               imageUint8DataArr,
             ),
             (textureIndexMap, samplerIndexMap, imageMap),
             (totalByteLength, bufferViewDataArr),
           ),
           (lightMaterial, name),
         ) => {
           let diffuseMap =
             OperateLightMaterialMainService.getDiffuseMap(
               lightMaterial,
               state,
             );

           switch (diffuseMap) {
           | None =>
             _buildNoDiffuseMap(
               (lightMaterial, name),
               (
                 materialDataArr,
                 textureDataArr,
                 samplerDataArr,
                 imageUint8DataArr,
               ),
               (textureIndexMap, samplerIndexMap, imageMap),
               (totalByteLength, bufferViewDataArr),
               state,
             )

           | Some(diffuseMap) =>
             _buildDiffuseMap(
               (diffuseMap, name),
               (
                 materialDataArr,
                 textureDataArr,
                 samplerDataArr,
                 imageUint8DataArr,
               ),
               (textureIndexMap, samplerIndexMap, imageMap, imageBase64Map),
               (totalByteLength, bufferViewDataArr),
               state,
             )
           };
         },
         (
           ([||], [||], [||], [||]),
           ([||], WonderCommonlib.HashMapService.createEmpty(), [||]),
           (totalByteLength, bufferViewDataArr),
         ),
       );
  (
    materialDataArr,
    textureDataArr,
    samplerDataArr,
    imageUint8DataArr,
    (totalByteLength, bufferViewDataArr),
  );
};