open WonderBsMost.Most;

[@bs.module "most"]
external fromWorkerEvent : (string, WorkerType.worker) => stream({.. "operateType": string}) =
  "fromEvent";

let _isFromEventStream = [%bs.raw
  {|
  function(stream) {
    var source = stream.source;
    return !!source.event && !!source.source;
  }
  |}
];

let concatArray = (streamArr) =>
  switch (Js.Array.length(streamArr)) {
  | 0 => WonderBsMost.Most.just(Obj.magic(1))
  | _ =>
    streamArr
    |> Js.Array.sliceFrom(1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (stream1, stream2) =>
             _isFromEventStream(stream1) === true ?
               stream1 |> concat(stream2) : stream1 |> concat(stream2)
         ),
         streamArr[0]
       )
  };

let concatStreamFuncArray = (stateData, streamFuncArr) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let count = streamFuncArr |> Js.Array.length;
      test(
        Log.buildAssertMessage(~expect={j|stream count >= 2|j}, ~actual={j|is $count|j}),
        () => count >= 2
      );
      test(
        "the first stream should be fromEvent stream",
        () => streamFuncArr[0] |> _isFromEventStream |> assertJsTrue
      );
      test(
        "only the first stream should be fromEvent stream",
        () =>
          streamFuncArr
          |> Js.Array.sliceFrom(1)
          |> WonderCommonlib.ArrayService.forEach(
               [@bs] ((stream) => stream |> _isFromEventStream |> assertJsFalse)
             )
      )
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  streamFuncArr
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((stream1, streamFunc2) => stream1 |> concatMap((e) => streamFunc2(e, stateData))),
       streamFuncArr[0](None, stateData)
     )
};

let callFunc = (func) => just(func) |> map((func) => func());