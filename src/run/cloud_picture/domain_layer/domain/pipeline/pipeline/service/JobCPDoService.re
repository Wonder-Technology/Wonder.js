let _getInitPipelineJobs = () => [
  (
    CreateAllPOECSBuffersCPJobEntity.create(),
    CreateAllPOECSBuffersCPJobEntity.exec,
  ),
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
  _register(PipelineRepo.getInitPipeline(), _getInitPipelineJobs());
  _register(PipelineRepo.getRunPipeline(), _getRunPipelineJobs());
};
