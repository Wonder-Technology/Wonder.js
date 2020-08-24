open SettingPOType;

let getBuffer = () => {
  ConfigRepo.getSetting()->Result.mapSuccess(({buffer}) => buffer);
};

let getIsDebug = () => {
  ConfigRepo.getSetting()->Result.mapSuccess(({isDebug}) => isDebug);
};
