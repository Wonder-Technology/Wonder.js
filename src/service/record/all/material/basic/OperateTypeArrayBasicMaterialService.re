open BufferBasicMaterialService;

let getColor = (index, typeArr) =>
  TypeArrayService.getFloat3(getColorIndex(index), typeArr);

let setColor = (index, data, typeArr) =>
  TypeArrayService.setFloat3(getColorIndex(index), data, typeArr);

let getTextureIndex = OperateTypeArrayMaterialService.getTextureIndex;

let setTextureIndex =
  (. indexTuple, data, typeArr) =>
    OperateTypeArrayMaterialService.setTextureIndex(
      indexTuple,
      data,
      typeArr,
    );

let getMapUnit =
  (. index, typeArr) =>
    TypeArrayService.getUint8_1(getMapUnitIndex(index), typeArr);

let setMapUnit =
  (. index, data, typeArr) =>
    TypeArrayService.setUint8_1(getMapUnitIndex(index), data, typeArr);