let prepare = () => {
  DirectorCPAPI.prepare()->ResultTool.getExnSuccessValue;
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

// let run =
//     (
//       ~handleSuccessFunc,
//       ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
//       (),
//     ) => {
//   let (_, pipelineStream) =
//     DirectorCPAPI.run()->Result.handleFail(handleFailFunc->Obj.magic);

//   PipelineTool.execPipelineStream(
//     ~pipelineStream,
//     ~handleSuccessFunc,
//     ~handleFailFunc,
//     (),
//   );
// };

let initAndRun =
    (
      ~handleSuccessFunc,
      ~handleAfterInitFunc=() => (),
      ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
      (),
    ) => {
  let (_, initPipelineStream) =
    DirectorCPAPI.init()->Result.handleFail(handleFailFunc->Obj.magic);

  let (_, runPipelineStream) =
    DirectorCPAPI.run()->Result.handleFail(handleFailFunc->Obj.magic);

  PipelineTool.execPipelineStream(
    ~pipelineStream=
      initPipelineStream
      ->WonderBsMost.Most.tap(_ => {handleAfterInitFunc()}, _)
      ->WonderBsMost.Most.concat(runPipelineStream),
    ~handleSuccessFunc,
    ~handleFailFunc,
    (),
  );
};
