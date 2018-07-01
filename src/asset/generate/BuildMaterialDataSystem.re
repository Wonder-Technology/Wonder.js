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

let _addImageData =
    ((texture, imageMap, state), imageBase64Map, imageBase64Arr) => {
  let source =
    OperateBasicSourceTextureMainService.unsafeGetSource(texture, state);

  switch (imageMap |> SparseMapService.indexOf(source)) {
  | imageIndex when imageIndex === (-1) =>
    let imageIndex = imageBase64Arr |> Js.Array.length;

    (
      imageIndex,
      imageMap |> WonderCommonlib.SparseMapService.set(imageIndex, source),
      imageBase64Arr
      |> ArrayService.push(
           switch (
             imageBase64Map |> WonderCommonlib.SparseMapService.get(texture)
           ) {
           | None =>
             _convertImageToBase64(
               TextureSizeService.getWidth(source),
               TextureSizeService.getHeight(source),
               source,
             )
           | Some(base64Str) => base64Str
           },
         ),
    );
  | imageIndex => (imageIndex, imageMap, imageBase64Arr)
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
      (materialDataArr, textureDataArr, samplerDataArr, imageBase64Arr),
      (textureIndexMap, samplerIndexMap, imageMap),
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
      imageBase64Arr,
    ),
    (textureIndexMap, samplerIndexMap, imageMap),
  );
};

let _buildDiffuseMap =
    (
      (diffuseMap, name),
      (materialDataArr, textureDataArr, samplerDataArr, imageBase64Arr),
      (textureIndexMap, samplerIndexMap, imageMap, imageBase64Map),
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
        imageBase64Arr,
      ),
      (textureIndexMap, samplerIndexMap, imageMap),
    )

  | None =>
    let textureIndex = textureDataArr |> Js.Array.length;

    let textureIndexMap =
      textureIndexMap
      |> WonderCommonlib.SparseMapService.set(diffuseMap, textureIndex);

    let (samplerIndex, samplerIndexMap, samplerDataArr) =
      _addSamplerData(diffuseMap, samplerIndexMap, state, samplerDataArr);

    let (imageIndex, imageMap, imageBase64Arr) =
      _addImageData(
        (diffuseMap, imageMap, state),
        imageBase64Map,
        imageBase64Arr,
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
        imageBase64Arr,
      ),
      (textureIndexMap, samplerIndexMap, imageMap),
    );
  };
};

let build = (materialDataMap, imageBase64Map, state) => {
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
    (materialDataArr, textureDataArr, samplerDataArr, imageBase64Arr),
    (textureIndexMap, samplerIndexMap, imageMap),
  ) =
    materialDataMap
    |> SparseMapService.reduceValid(
         (.
           (
             (materialDataArr, textureDataArr, samplerDataArr, imageBase64Arr),
             (textureIndexMap, samplerIndexMap, imageMap),
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
                 imageBase64Arr,
               ),
               (textureIndexMap, samplerIndexMap, imageMap),
               state,
             )

           | Some(diffuseMap) =>
             _buildDiffuseMap(
               (diffuseMap, name),
               (
                 materialDataArr,
                 textureDataArr,
                 samplerDataArr,
                 imageBase64Arr,
               ),
               (textureIndexMap, samplerIndexMap, imageMap, imageBase64Map),
               state,
             )
           };
         },
         (
           ([||], [||], [||], [||]),
           ([||], WonderCommonlib.HashMapService.createEmpty(), [||]),
         ),
       );
  (materialDataArr, textureDataArr, samplerDataArr, imageBase64Arr);
};