let register = (pipeline, job, execFunc) =>
  DpContainer.unsafeGetPipelineRepoDp().setJobExecFunc(
    pipeline->PipelineEntity.value,
    job->JobEntity.value,
    execFunc,
  )

let getExecFunc = (pipelineName, jobName) =>
  DpContainer.unsafeGetPipelineRepoDp().getJobExecFunc(pipelineName, jobName)
