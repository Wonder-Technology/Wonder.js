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

    return  canvas.toDataURL();
    |}
];

let _addSourceData = (texture, sourceMap, state, sourceBase64Arr) => {
  let source =
    OperateBasicSourceTextureMainService.unsafeGetSource(texture, state);

  switch (sourceMap |> SparseMapService.indexOf(source)) {
  | sourceIndex when sourceIndex === (-1) =>
    let sourceIndex = sourceBase64Arr |> Js.Array.length;

    (
      sourceIndex,
      sourceMap |> WonderCommonlib.SparseMapService.set(sourceIndex, source),
      sourceBase64Arr
      |> ArrayService.push(
           _convertImageToBase64(
             TextureSizeService.getWidth(source),
             TextureSizeService.getHeight(source),
             source,
           ),
         ),
    );
  | sourceIndex => (sourceIndex, sourceMap, sourceBase64Arr)
  };
};

let build = (materialDataMap, state) => {
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
    (materialDataArr, textureDataArr, samplerDataArr, sourceBase64Arr),
    (textureIndexMap, samplerIndexMap, sourceMap),
  ) =
    materialDataMap
    |> SparseMapService.reduceiValid(
         (.
           (
             (
               materialDataArr,
               textureDataArr,
               samplerDataArr,
               sourceBase64Arr,
             ),
             (textureIndexMap, samplerIndexMap, sourceMap),
           ),
           (lightMaterial, name),
           materialIndex,
         ) => {
           let diffuseMap =
             OperateLightMaterialMainService.getDiffuseMap(
               lightMaterial,
               state,
             );

           switch (diffuseMap) {
           | None =>
             let diffuseColor =
               OperateLightMaterialMainService.getDiffuseColor(
                 lightMaterial,
                 state,
               );

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
                 sourceBase64Arr,
               ),
               (textureIndexMap, samplerIndexMap, sourceMap),
             );

           | Some(diffuseMap) =>
             switch (
               textureIndexMap
               |> WonderCommonlib.SparseMapService.get(diffuseMap)
             ) {
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
                   sourceBase64Arr,
                 ),
                 (textureIndexMap, samplerIndexMap, sourceMap),
               )

             | None =>
               let textureIndex = textureDataArr |> Js.Array.length;

               let textureIndexMap =
                 textureIndexMap
                 |> WonderCommonlib.SparseMapService.set(
                      diffuseMap,
                      textureIndex,
                    );

               let (samplerIndex, samplerIndexMap, samplerDataArr) =
                 _addSamplerData(
                   diffuseMap,
                   samplerIndexMap,
                   state,
                   samplerDataArr,
                 );

               let (sourceIndex, sourceMap, sourceBase64Arr) =
                 _addSourceData(
                   diffuseMap,
                   sourceMap,
                   state,
                   sourceBase64Arr,
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
                   textureDataArr
                   |> ArrayService.push(
                        {
                          name:
                            NameBasicSourceTextureMainService.getName(
                              diffuseMap,
                              state,
                            ),
                          sampler: samplerIndex,
                          source: sourceIndex,
                        }: GenerateSceneGraphType.textureData,
                      ),
                   samplerDataArr,
                   sourceBase64Arr,
                 ),
                 (textureIndexMap, samplerIndexMap, sourceMap),
               );
             }
           };
         },
         (
           ([||], [||], [||], [||]),
           ([||], WonderCommonlib.HashMapService.createEmpty(), [||]),
         ),
       );
  (materialDataArr, textureDataArr, samplerDataArr, sourceBase64Arr);
};