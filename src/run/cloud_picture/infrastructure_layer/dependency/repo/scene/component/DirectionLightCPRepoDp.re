open DirectionLightCPPOType;

let getMaxIndex = () => {
  CPRepo.getExnDirectionLight().maxIndex;
};

let setMaxIndex = maxIndex => {
  CPRepo.setDirectionLight({...CPRepo.getExnDirectionLight(), maxIndex});
};

let getGameObject = light => {
  CPRepo.getExnDirectionLight().gameObjectMap
  ->ImmutableSparseMap.get(light);
};

let setGameObject = (light, gameObject) => {
  let {gameObjectMap} as lightPO = CPRepo.getExnDirectionLight();

  CPRepo.setDirectionLight({
    ...lightPO,
    gameObjectMap: gameObjectMap->ImmutableSparseMap.set(light, gameObject),
  });
};

let getColor = light => {
  OperateTypeArrayDirectionLightCPRepoUtils.getColor(
    light,
    CPRepo.getExnDirectionLight().colors,
  );
};

let setColor = (light, color) => {
  OperateTypeArrayDirectionLightCPRepoUtils.setColor(
    light,
    color,
    CPRepo.getExnDirectionLight().colors,
  );
};

let getIntensity = light => {
  OperateTypeArrayDirectionLightCPRepoUtils.getIntensity(
    light,
    CPRepo.getExnDirectionLight().intensities,
  );
};

let setIntensity = (light, intensity) => {
  OperateTypeArrayDirectionLightCPRepoUtils.setIntensity(
    light,
    intensity,
    CPRepo.getExnDirectionLight().intensities,
  );
};
