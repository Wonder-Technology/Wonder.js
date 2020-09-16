let unsafeGet = () => {
  DpContainer.unsafeGetTimeRepoDp();
};

let set = (dp: IRepoDp.repo) => {
  RepoDpApService.set(dp);
};
