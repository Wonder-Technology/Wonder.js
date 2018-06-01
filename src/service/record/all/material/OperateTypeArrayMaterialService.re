let getTextureIndex =
[@bs]
  (
    ((index, textureIndex, textureCountPerMaterial), typeArr) =>
      TypeArrayService.getUint32_1(
        BufferMaterialService.getTextureIndexIndex(index, textureIndex, textureCountPerMaterial),
        typeArr
      )
  );

let setTextureIndex = ((index, textureIndex, textureCountPerMaterial), data, typeArr) =>
  TypeArrayService.setUint32_1(
    BufferMaterialService.getTextureIndexIndex(index, textureIndex, textureCountPerMaterial),
    data,
    typeArr
  );