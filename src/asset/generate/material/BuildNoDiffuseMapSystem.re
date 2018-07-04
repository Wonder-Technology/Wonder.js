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
    (totalByteLength, byteOffset, bufferViewDataArr),
  );
};