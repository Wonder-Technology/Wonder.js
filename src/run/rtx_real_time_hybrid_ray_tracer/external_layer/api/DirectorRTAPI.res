let prepare = pictureSize => DirectorRTApService.prepare(~pictureSize)

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

let init = () => DirectorRTApService.init()->_executeStream

let update = () => DirectorRTApService.update()->_executeStream

let render = () => DirectorRTApService.render()->_executeStream
