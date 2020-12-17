

let prepare = (pictureSize, sampleCount) => DirectorCPApService.prepare(~pictureSize, ~sampleCount)

let _getStreamFromTuple = ((_, pipelineStream)) => pipelineStream

let _throwErr = %bs.raw(`
(err) => {
    throw err;
}
`)

let _executeStream = streamDataResult =>
  streamDataResult
  // TODO use Promise.reject instead of throw!
  ->Result.handleFail(_throwErr)
  ->_getStreamFromTuple
  ->WonderBsMost.Most.drain

let init = () => DirectorCPApService.init()->_executeStream

let update = () => DirectorCPApService.update()->_executeStream

let render = () => DirectorCPApService.render()->_executeStream
