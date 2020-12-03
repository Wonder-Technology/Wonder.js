let createPipeline = (~pipelineName="init", ()) => pipelineName->PipelineEntity.create

let registerJobs = (~jobs, ~pipeline=createPipeline(), ()) =>
  JobCPDoService._register(pipeline, jobs)

let execPipelineStream = (
  ~pipelineStream,
  ~handleSuccessFunc,
  ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
  (),
) =>
  pipelineStream
  ->WonderBsMost.Most.recoverWith(err => WonderBsMost.Most.just(err->Result.fail), _)
  ->WonderBsMost.Most.tap(result => result->Result.handleFail(handleFailFunc)->ignore, _)
  ->WonderBsMost.Most.drain
  ->Js.Promise.then_(() => handleSuccessFunc()->Js.Promise.resolve, _)

let buildEmptyPipelineData = (): PipelineVOType.pipelineData => {
  name: "",
  firstGroup: "frame",
  groups: list{{name: "frame", link: Concat, elements: list{}}},
}
