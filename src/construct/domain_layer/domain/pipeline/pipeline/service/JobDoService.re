let register = (pipeline, job, execFunc) => {
  PipelineRepoAt.setJobExecFunc(pipeline, job, execFunc);
};

let getExecFunc = (pipelineName, jobName) => {
  PipelineRepoAt.getJobExecFunc(
    pipelineName->PipelineEntity.create,
    jobName->JobEntity.create,
  );
};
