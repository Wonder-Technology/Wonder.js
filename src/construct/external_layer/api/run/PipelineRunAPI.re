let parsePipelineData =
    (data: PipelineVOType.pipelineData)
    : Result.t2((PipelineEntity.t, WonderBsMost.Most.stream(unit))) => {
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
    (pipeline: PipelineEntity.t): option(WonderBsMost.Most.stream(unit)) => {
  PipelineApService.getPipelineStream(pipeline);
};

let setPipelineStream =
    (pipeline: PipelineEntity.t, stream: WonderBsMost.Most.stream(unit))
    : unit => {
  PipelineApService.setPipelineStream(pipeline, stream);
};
