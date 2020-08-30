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
