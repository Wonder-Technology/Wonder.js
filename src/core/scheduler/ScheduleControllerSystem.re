open Contract;

open StateDataType;

/* todo add pause,resume, stop control */
/* todo add more Items */
let _remove = (index: int, state: state) => {
  let {count, funcRecordArray} as data = ScheduleStateCommon.getSchedulerData(state);
  ArraySystem.deleteBySwap(index, count - 1, funcRecordArray) |> ignore;
  data.count = pred(data.count);
  state
};

let _getFuncRecord = (index: int, funcRecordArray) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          {j|$funcRecordArray[$index] should exist|j},
          () => WonderCommonlib.ArraySystem.get(index, funcRecordArray) |> assertExist
        )
      )
  );
  Array.unsafe_get(funcRecordArray, index)
};

let update = (elapsed: float, state: state) : state => {
  let {count, funcRecordArray} = ScheduleStateCommon.getSchedulerData(state);
  ArraySystem.range(0, count - 1)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, index: int) => {
           let {update, isFinish} = _getFuncRecord(index, funcRecordArray);
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
  let {count, funcRecordArray} as data = ScheduleStateCommon.getSchedulerData(state);
  ArraySystem.range(0, count - 1)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, index: int) => {
           let {start} = _getFuncRecord(index, funcRecordArray);
           state |> start
         }
       ),
       state
     )
};

let scheduleLoop = (taskFunc, state: state) => {
  let {count: index, funcRecordArray} as data = ScheduleStateCommon.getSchedulerData(state);
  Array.unsafe_set(
    funcRecordArray,
    index,
    {
      update: ScheduleLoopItemCommon.update(taskFunc),
      isFinish: ScheduleLoopItemCommon.isFinish(index),
      start: ScheduleLoopItemCommon.start
    }
  );
  data.count = succ(data.count);
  state
};