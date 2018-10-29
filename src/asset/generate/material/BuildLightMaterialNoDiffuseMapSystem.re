let build =
    (
      (lightMaterial, name),
      (
        (materialDataArr, textureDataArr, samplerDataArr, imageUint8DataArr),
        (textureIndexMap, samplerIndexMap, imageMap),
      ),
      (totalByteLength, byteOffset, bufferViewDataArr),
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
               BuildMaterialUtils.buildColorFactor(diffuseColor),
             baseColorTexture: None,
             name,
           }: GenerateSceneGraphType.lightMaterialData,
         ),
      textureDataArr,
      samplerDataArr,
      imageUint8DataArr,
    ),
    (textureIndexMap, samplerIndexMap, imageMap),
    (totalByteLength, byteOffset, bufferViewDataArr),
  );
};