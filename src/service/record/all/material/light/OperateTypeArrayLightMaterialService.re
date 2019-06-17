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