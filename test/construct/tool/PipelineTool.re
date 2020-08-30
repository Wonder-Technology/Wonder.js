let createPipeline = (~pipelineName="init", ()) =>
  pipelineName->PipelineEntity.create;

let registerJobs = (~jobs, ~pipeline=createPipeline(), ()) => {
  JobCPDoService._register(pipeline, jobs);
};
