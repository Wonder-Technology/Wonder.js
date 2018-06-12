open BufferLightMaterialService;

let getDiffuseColor = (index, typeArr) =>
  TypeArrayService.getFloat3(getDiffuseColorIndex(index), typeArr);

let setDiffuseColor = (index, data, typeArr) =>
  TypeArrayService.setFloat3(getDiffuseColorIndex(index), data, typeArr);

let getSpecularColor = (index, typeArr) =>
  TypeArrayService.getFloat3(getSpecularColorIndex(index), typeArr);

let setSpecularColor = (index, data, typeArr) =>
  TypeArrayService.setFloat3(getSpecularColorIndex(index), data, typeArr);

let getShininess = (index, typeArr) =>
  TypeArrayService.getFloat1(getShininessIndex(index), typeArr);

let setShininess = (index, data, typeArr) =>
  TypeArrayService.setFloat1(getShininessIndex(index), data, typeArr);

let getTextureIndex = OperateTypeArrayMaterialService.getTextureIndex;

let setTextureIndex =
  (. indexTuple, data, typeArr) =>
    OperateTypeArrayMaterialService.setTextureIndex(
      indexTuple,
      data,
      typeArr,
    );

let getDiffuseMapUnit =
  (. index, typeArr) =>
    TypeArrayService.getUint8_1(getDiffuseMapUnitIndex(index), typeArr);

let setDiffuseMapUnit =
  (. index, data, typeArr) =>
    TypeArrayService.setUint8_1(
      getDiffuseMapUnitIndex(index),
      data,
      typeArr,
    );

let getSpecularMapUnit = (. index, typeArr) =>
  TypeArrayService.getUint8_1(getSpecularMapUnitIndex(index), typeArr);

let setSpecularMapUnit = (. index, data, typeArr) =>
  TypeArrayService.setUint8_1(getSpecularMapUnitIndex(index), data, typeArr);