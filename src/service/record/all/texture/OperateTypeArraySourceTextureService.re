let setIsNeedUpdate = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(
    BufferSourceTextureService.getIsNeedUpdateIndex(index),
    data,
    typeArr,
  );