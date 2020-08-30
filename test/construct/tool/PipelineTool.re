let createPipeline = (~pipelineName="init", ()) =>
  pipelineName->PipelineEntity.create;

let registerJobs = (~jobs, ~pipeline=createPipeline(), ()) => {
  JobCPDoService._register(pipeline, jobs);
};

let execPipelineStream =
    (
      ~pipelineStream,
      ~handleSuccessFunc,
      ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
      (),
    ) => {
  pipelineStream
  ->WonderBsMost.Most.tap(
      result => {result->Result.handleFail(handleFailFunc)->ignore},
      _,
    )
  ->WonderBsMost.Most.drain
  ->Js.Promise.then_(() => handleSuccessFunc()->Js.Promise.resolve, _);
};
