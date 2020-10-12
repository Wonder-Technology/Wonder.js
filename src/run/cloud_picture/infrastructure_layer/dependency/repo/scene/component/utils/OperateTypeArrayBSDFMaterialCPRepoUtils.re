open BufferBSDFMaterialCPRepoUtils;

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

let getTransmission = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat1(getTransmissionIndex(index), typeArr);

let setTransmission = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat1(getTransmissionIndex(index), data, typeArr);

let getIOR = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat1(getIORIndex(index), typeArr);

let setIOR = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat1(getIORIndex(index), data, typeArr);
