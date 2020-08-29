let parsePipelineData =
    (data: PipelineVOType.pipelineData)
    : Result.t2((PipelineEntity.t, PipelineVOType.pipelineStream)) => {
  PipelineApService.parsePipelineData(data);
};

let registerJob =
    (
      pipeline: PipelineEntity.t,
      job: JobEntity.t,
      execFunc: PipelineVOType.execFunc,
    )
    : unit => {
  PipelineApService.registerJob(pipeline, job, execFunc);
};

let getPipelineStream =
    (pipeline: PipelineEntity.t): option(PipelineVOType.pipelineStream) => {
  PipelineApService.getPipelineStream(pipeline);
};

let setPipelineStream =
    (pipeline: PipelineEntity.t, stream: PipelineVOType.pipelineStream): unit => {
  PipelineApService.setPipelineStream(pipeline, stream);
};

let execPipelineStream =
    (handleFailFunc: Js.Exn.t => unit, pipelineStream) => {
  PipelineApService.execPipelineStream(handleFailFunc, pipelineStream);
};
