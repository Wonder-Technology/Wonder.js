open Most;

let concatArray = (streamArr) => {
  let firstStream = streamArr[0];
  streamArr
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs] ((stream1, stream2) => stream1 |> concat(stream2)),
       firstStream
     )
};