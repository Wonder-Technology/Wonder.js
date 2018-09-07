open StateDataMainType;

let setStartTime = [%bs.raw
  startTime => {|
  if(!!window.performance){
    window.performance.now = () => startTime;
  }
  else{
    window.performance = {
      now: () => startTime
    };
  }
  |}
];

let getTimeControllerRecord = state => state.timeControllerRecord;

let setElapsed = (elapsed, state) => {
  ...state,
  timeControllerRecord: {
    ...state.timeControllerRecord,
    elapsed,
  },
};