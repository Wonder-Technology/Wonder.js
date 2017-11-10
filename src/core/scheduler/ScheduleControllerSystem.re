open Contract;

open StateDataType;

/* todo add pause,resume, stop control */
/* todo add more Items */
let _remove = (index: int, state: state) => {
  let {count, funcRecordList} as data = ScheduleStateUtils.getSchedulerData(state);
  ArraySystem.deleteBySwap(index, count - 1, funcRecordList) |> ignore;
  data.count = pred(data.count);
  state
};

let _getFuncRecord = (index: int, funcRecordList) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          {j|$funcRecordList[$index] should exist|j},
          () => ArraySystem.get(index, funcRecordList) |> assertExist
        )
      )
  );
  Array.unsafe_get(funcRecordList, index)
};

let update = (elapsed: float, state: state) : state => {
  let {count, funcRecordList} = ScheduleStateUtils.getSchedulerData(state);
  ArraySystem.range(0, count - 1)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, index: int) => {
           let {update, isFinish} = _getFuncRecord(index, funcRecordList);
           let state = state |> update(elapsed);
           if (isFinish(state)) {
             _remove(index, state)
           } else {
             state
           }
         }
       ),
       state
     )
};

let start = (state: state) => {
  let {count, funcRecordList} as data = ScheduleStateUtils.getSchedulerData(state);
  ArraySystem.range(0, count - 1)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, index: int) => {
           let {start} = _getFuncRecord(index, funcRecordList);
           state |> start
         }
       ),
       state
     )
};

let scheduleLoop = (taskFunc, state: state) => {
  let {count: index, funcRecordList} as data = ScheduleStateUtils.getSchedulerData(state);
  Array.unsafe_set(
    funcRecordList,
    index,
    {
      update: ScheduleLoopItemSystem.update(taskFunc),
      isFinish: ScheduleLoopItemSystem.isFinish(index),
      start: ScheduleLoopItemSystem.start
    }
  );
  data.count = succ(data.count);
  state
};

let initData = () => {
  count: 0,
  funcRecordList: ArraySystem.createEmpty(),
  isFinishMap: HashMapSystem.createEmpty()
};