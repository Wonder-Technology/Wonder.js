open ConfigPOType;

let getSetting = () => {
  Repo.getConfig().setting->Option.get;
};

let setSetting = setting => {
  Repo.setConfig({...Repo.getConfig(), setting: setting->Some});
};
