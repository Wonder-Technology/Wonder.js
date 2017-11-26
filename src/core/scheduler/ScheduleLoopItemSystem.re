open StateDataType;

let update = (taskFunc, elapsed: float, state: StateDataType.state) =>
  [@bs] taskFunc(elapsed, state);

let isFinish = (index: int, state: StateDataType.state) => {
  let {isFinishMap} = ScheduleStateUtils.getSchedulerData(state);
  switch (SparseMapSystem.get(index, isFinishMap)) {
  | None => false
  | Some(isFinish_) => isFinish_
  }
};

let start = (state: StateDataType.state) => state;