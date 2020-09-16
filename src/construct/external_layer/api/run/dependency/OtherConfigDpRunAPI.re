let unsafeGet = () => {
  DpContainer.unsafeGetOtherConfigDp();
};

let set = (dp: IConfigDp.otherConfig) => {
  OtherConfigDpApService.set(dp);
};
