let start = startTime => {
  CPRepo.setTime({
    ...CPRepo.getTime(),
    startTime: startTime->Some,
    elapsed: 0.0,
  });
};

let getElapsed = () => {
  CPRepo.getTime().elapsed;
};
