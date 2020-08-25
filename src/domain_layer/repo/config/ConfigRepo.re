open ConfigPOType;

let getSetting = () => {
  Repo.getConfig().setting->OptionSt.get;
};

let setSetting = setting => {
  Repo.setConfig({...Repo.getConfig(), setting: setting->Some});
};
