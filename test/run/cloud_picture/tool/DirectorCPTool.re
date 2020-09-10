let prepare = (~pictureSize=(0, 0), ~sampleCount=1, ()) => {
  DirectorCPAPI.prepare(pictureSize, sampleCount)
  ->ResultTool.getExnSuccessValue;
};

let init =
    (
      ~handleSuccessFunc,
      ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
      (),
    ) => {
  let (_, pipelineStream) =
    DirectorCPAPI.init()->Result.handleFail(handleFailFunc->Obj.magic);

  PipelineTool.execPipelineStream(
    ~pipelineStream,
    ~handleSuccessFunc,
    ~handleFailFunc,
    (),
  );
};

let initAndUpdate =
    (
      ~handleSuccessFunc,
      ~handleAfterInitFunc=() => (),
      ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
      (),
    ) => {
  let (_, initPipelineStream) =
    DirectorCPAPI.init()->Result.handleFail(handleFailFunc->Obj.magic);

  let (_, updatePipelineStream) =
    DirectorCPAPI.update()->Result.handleFail(handleFailFunc->Obj.magic);

  PipelineTool.execPipelineStream(
    ~pipelineStream=
      initPipelineStream
      ->WonderBsMost.Most.tap(_ => {handleAfterInitFunc()}, _)
      ->WonderBsMost.Most.concat(updatePipelineStream),
    ~handleSuccessFunc,
    ~handleFailFunc,
    (),
  );
};
