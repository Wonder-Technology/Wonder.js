let prepare = (pictureSize, sampleCount) => {
  DirectorCPApService.prepare(~pictureSize, ~sampleCount);
};

let _getStreamFromTuple = ((_, pipelineStream)) => pipelineStream;

let _throwErr = [%bs.raw {|
(err) => {
    throw err;
}
|}];

let init = () => {
  DirectorCPApService.init()
  // TODO use Promise.reject instead of throw!
  ->Result.handleFail(_throwErr)
  ->_getStreamFromTuple
  ->WonderBsMost.Most.drain;
};

// let update = () => {
//   DirectorCPApService.update();
// };

// let render = () => {
//   DirectorCPApService.render();
// };
