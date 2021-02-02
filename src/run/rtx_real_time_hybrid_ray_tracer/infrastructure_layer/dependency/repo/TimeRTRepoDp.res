let start = startTime =>
  RTRepo.setTime({
    ...RTRepo.getTime(),
    startTime: startTime->Some,
    elapsed: 0.0,
  })

let getElapsed = () => RTRepo.getTime().elapsed
