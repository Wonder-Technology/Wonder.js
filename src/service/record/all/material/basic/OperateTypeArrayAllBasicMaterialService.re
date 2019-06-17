open BufferAllBasicMaterialService;

let getColor = (index, typeArr) =>
  TypeArrayService.getFloat3(getColorIndex(index), typeArr);

let setColor = (index, data, typeArr) =>
  TypeArrayService.setFloat3(getColorIndex(index), data, typeArr);

let _isDepthTest = isDepthTest => isDepthTest === 0;

let getIsDepthTest = (index, typeArr): bool =>
  TypeArrayService.getUint8_1(getIsDepthTestIndex(index), typeArr)
  |> _isDepthTest;

let convertIsDepthTestToVal = isDepthTest => isDepthTest ? 0 : 1;

let setIsDepthTest = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getIsDepthTestIndex(index), data, typeArr);

let getAlpha = (index, typeArr) =>
  TypeArrayService.getFloat1(getAlphaIndex(index), typeArr);

let setAlpha = (index, data, typeArr) =>
  TypeArrayService.setFloat1(getAlphaIndex(index), data, typeArr);