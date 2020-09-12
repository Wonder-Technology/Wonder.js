let unsafeGet = () => {
  DpContainer.unsafeGetPOConfigDp();
};

let set = (dp: IConfigDp.poConfig) => {
  POConfigDpApService.set(dp);
};
