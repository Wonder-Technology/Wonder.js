let _getInitPipelineJobs = () => [
  (StartTimeCPJobEntity.create(), StartTimeCPJobEntity.exec),
];

let _getRunPipelineJobs = () => [
  (UpdateTransformCPJobEntity.create(), UpdateTransformCPJobEntity.exec),
];

let _register = (pipeline, jobs) => {
  jobs->ListSt.forEach(((job, execFunc)) => {
    PipelineRunAPI.registerJob(pipeline, job, execFunc)
  });
};

let registerAllJobs = () => {
  _register(PipelineCPRepo.getInitPipeline(), _getInitPipelineJobs());
  _register(PipelineCPRepo.getRunPipeline(), _getRunPipelineJobs());
};
