let getShaderIndicesSize = () => 1;

let getShaderIndicesLength = (count) => count * getShaderIndicesSize();

let getShaderIndicesOffset = (count) => 0;

let getShaderIndexIndex = (index) => index * getShaderIndicesSize();

let getShaderIndex = (index, typeArr) =>
  TypeArrayService.getInt32_1(getShaderIndexIndex(index), typeArr);

let setShaderIndex = (index, data, typeArr) =>
  TypeArrayService.setInt32_1(getShaderIndexIndex(index), data, typeArr);

let hasShaderIndex = (materialIndex: int, shaderIndices) =>
  getShaderIndex(materialIndex, shaderIndices)
  !== DefaultTypeArrayValueService.getDefaultShaderIndex();