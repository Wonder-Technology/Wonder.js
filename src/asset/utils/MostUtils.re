open Most;

[@bs.module "most"]
/* (string, WorkerType.worker, Js.boolean) => stream(MessageDataType.messageData) = */
external fromWorkerEvent : (string, WorkerType.worker) => stream({.. "operateType": string}) =
  "fromEvent";

/* let fromWorkerEvent = (eventName, target) => fromEvent(eventName, target |> Obj.magic, Js.false_); */
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
  | 0 => Most.just(Obj.magic(1))
  | _ =>
    streamArr
    |> Js.Array.sliceFrom(1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           (stream1, stream2) =>
             /* TODO refactor:

                  stream1 |> concat(stream2) : stream1 |> concat(stream2)

                  duplicate!

                */
             _isFromEventStream(stream1) === Js.true_ ?
               /* stream1|> concatMap((e) => stream2) : stream1 |> concat(stream2) */
               stream1 |> concat(stream2) : stream1 |> concat(stream2)
         ),
         streamArr[0]
       )
  };

/* TODO check first stream and only first should be fromEvent stream */
/* TODO check stream count >=2 */
let concatStreamFuncArray = (stateData, streamFuncArr) =>
  /* streamFuncArr
     |> Js.Array.sliceFrom(2)
     |> WonderCommonlib.ArrayService.reduceOneParam(
          [@bs] ((stream1, streamFunc2) => stream1 |> concat(streamFunc2(None, stateData))),
          streamFuncArr[0](None, stateData) |> concatMap((e) => streamFuncArr[1](e, stateData))
        ); */
  streamFuncArr
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((stream1, streamFunc2) => stream1 |> concatMap((e) => streamFunc2(e, stateData))),
       streamFuncArr[0](None, stateData)
     );

let callFunc = (func) => just(func) |> map((func) => func());