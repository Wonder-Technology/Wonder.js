let getTextureIndex =
  (. index, typeArr) =>
    TypeArrayService.getUint32_1(
      BufferMaterialService.getTextureIndexIndex(index),
      typeArr,
    );

let setTextureIndex = (index, data, typeArr) =>
  TypeArrayService.setUint32_1(
    BufferMaterialService.getTextureIndexIndex(index),
    data,
    typeArr,
  );