open BufferBasicMaterialService;

let getColor = (index, typeArr) => TypeArrayService.getFloat3(getColorIndex(index), typeArr);

let setColor = (index, data, typeArr) =>
  TypeArrayService.setFloat3(getColorIndex(index), data, typeArr);

let getTextureIndex = ((index, textureIndex, textureCountPerBasicMaterial), typeArr) =>
  TypeArrayService.getUint32_1(
    getTextureIndexIndex(index, textureIndex, textureCountPerBasicMaterial),
    typeArr
  );

let setTextureIndex = ((index, textureIndex, textureCountPerBasicMaterial), data, typeArr) =>
  TypeArrayService.setUint32_1(
    getTextureIndexIndex(index, textureIndex, textureCountPerBasicMaterial),
    data,
    typeArr
  );

/* let getTextureCount = (index, typeArr) =>
     TypeArrayService.getUint8_1(getTextureCountIndex(index), typeArr);

   let setTextureCount = (index, data, typeArr) =>
     TypeArrayService.setUint8_1(getTextureCountIndex(index), data, typeArr); */
let getMapUnit = (index, typeArr) => TypeArrayService.getUint8_1(getMapUnitIndex(index), typeArr);

let setMapUnit = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getMapUnitIndex(index), data, typeArr);