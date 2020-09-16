let start = () => {
  DpContainer.unsafeGetTimeRepoDp().start(
    DpContainer.unsafeGetTimeDp().getNow(),
  );
};

let getElapsed = () => {
  DpContainer.unsafeGetTimeRepoDp().getElapsed();
};
