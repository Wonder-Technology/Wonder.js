open Most;

[@bs.module "most"]
/* (string, WorkerType.worker, Js.boolean) => stream(MessageDataType.messageData) = */
external fromWorkerEvent :
  (string, WorkerType.worker) => stream({.. "operateType": string}) =
  "fromEvent";

/* let fromWorkerEvent = (eventName, target) => fromEvent(eventName, target |> Obj.magic, Js.false_); */
let _isFromEventStream = [%bs.raw
  {|
  function(stream) {
    return stream instanceof EventTargetSource || stream instanceof EventEmitterSource;
  }
  |}
];

let concatArray = (streamArr) =>
  streamArr
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (stream1, stream2) =>
           _isFromEventStream(stream1) ?
             stream1 |> concatMap((e) => stream2) : stream1 |> concat(stream2)
       ),
       streamArr[0]
     );

/* TODO check first stream and only first should be fromEvent stream */
/* TODO check stream count >=2 */
let concatStreamFuncArray = (stateData, streamFuncArr) =>
  /* streamFuncArr
     |> Js.Array.sliceFrom(2)
     |> WonderCommonlib.ArraySystem.reduceOneParam(
          [@bs] ((stream1, streamFunc2) => stream1 |> concat(streamFunc2(None, stateData))),
          streamFuncArr[0](None, stateData) |> concatMap((e) => streamFuncArr[1](e, stateData))
        ); */
  streamFuncArr
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs] ((stream1, streamFunc2) => stream1 |> concatMap((e) => streamFunc2(e, stateData))),
       streamFuncArr[0](None, stateData)
     );

let callFunc = (func) => just(func) |> map((func) => func());