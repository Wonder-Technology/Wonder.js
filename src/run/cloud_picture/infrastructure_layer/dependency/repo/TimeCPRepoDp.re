let start = (startTime) => {
  CPRepo.setTime({
    ...CPRepo.getTime(),
    startTime: startTime->Js.Nullable.return,
    elapsed: 0.0,
  });
};

let getElapsed = () => {
  CPRepo.getTime().elapsed;
};
