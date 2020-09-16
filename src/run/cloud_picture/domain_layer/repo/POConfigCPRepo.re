let getTransformCount = () => {
  POConfigCPRepoDp.getTransformCount();
};

let setTransformCount = transformCount => {
  CPRepo.setPOConfig({...CPRepo.getPOConfig(), transformCount});
};

let getPBRMaterialCount = () => {
  POConfigCPRepoDp.getPBRMaterialCount();
};

let setPBRMaterialCount = pbrMaterialCount => {
  CPRepo.setPOConfig({...CPRepo.getPOConfig(), pbrMaterialCount});
};

let getGeometryPointCount = () => {
  POConfigCPRepoDp.getGeometryPointCount();
};

let setGeometryPointCount = geometryPointCount => {
  CPRepo.setPOConfig({...CPRepo.getPOConfig(), geometryPointCount});
};

let getGeometryCount = () => {
  POConfigCPRepoDp.getGeometryCount();
};

let setGeometryCount = geometryCount => {
  CPRepo.setPOConfig({...CPRepo.getPOConfig(), geometryCount});
};

let getDirectionLightCount = () => {
  POConfigCPRepoDp.getDirectionLightCount();
};

let setDirectionLightCount = directionLightCount => {
  CPRepo.setPOConfig({...CPRepo.getPOConfig(), directionLightCount});
};
