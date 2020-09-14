open BufferDirectionLightCPRepoUtils;

let getColor = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat3Tuple(getColorIndex(index), typeArr);

let setColor = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat3(getColorIndex(index), data, typeArr);

let getIntensity = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat1(getIntensityIndex(index), typeArr);

let setIntensity = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat1(getIntensityIndex(index), data, typeArr);
