let setIsNeedUpdate = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(
    BufferTextureService.getIsNeedUpdateIndex(index),
    data,
    typeArr,
  );