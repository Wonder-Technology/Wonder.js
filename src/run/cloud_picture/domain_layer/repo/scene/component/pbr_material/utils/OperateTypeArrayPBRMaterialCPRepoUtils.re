open BufferPBRMaterialCPRepoUtils;

let getDiffuseColor = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat3Tuple(getDiffuseColorIndex(index), typeArr);

let setDiffuseColor = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat3(getDiffuseColorIndex(index), data, typeArr);

let getSpecular = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat1(getSpecularIndex(index), typeArr);

let setSpecular = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat1(getSpecularIndex(index), data, typeArr);

let getRoughness = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat1(getRoughnessIndex(index), typeArr);

let setRoughness = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat1(getRoughnessIndex(index), data, typeArr);

let getMetalness = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat1(getMetalnessIndex(index), typeArr);

let setMetalness = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat1(getMetalnessIndex(index), data, typeArr);
