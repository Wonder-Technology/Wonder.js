open WonderBsMost.Most

let _isFromEventStream = %raw(`
  function(stream){
    var source = stream.source;
    return !!source.event && !!source.source;
  }
  `)

let concatArray = streamArr =>
  switch Js.Array.length(streamArr) {
  | 0 => just(Obj.magic(1))
  | _ =>
    streamArr
    ->ArraySt.sliceFrom(1)
    ->ArraySt.reduceOneParam(
      (. stream1, stream2) =>
        _isFromEventStream(stream1) === true ? stream2->concat(stream1) : stream2->concat(stream1),
      streamArr[0],
    )
  }
