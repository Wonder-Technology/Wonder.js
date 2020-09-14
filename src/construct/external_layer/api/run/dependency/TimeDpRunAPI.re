let unsafeGet = () => {
  DpContainer.unsafeGetTimeRepoDp();
};

let set = (dp: ITimeDp.time) => {
  TimeDpApService.set(dp);
};
