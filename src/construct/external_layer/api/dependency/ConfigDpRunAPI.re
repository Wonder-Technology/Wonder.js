let unsafeGet = () => {
  DpContainer.unsafeGetConfigDp();
};

let set = (dp: IConfigDp.config) => {
  ConfigDpApService.set(dp);
};
