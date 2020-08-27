let getJobExecFunc = (pipeline, job) => {
  DpContainer.unsafeGetPipelineRepoDp().getJobExecFunc(
    pipeline->PipelineEntity.value,
    job->JobEntity.value,
  )
  ->OptionSt.fromNullable;
};

let setJobExecFunc = (pipeline, job, execFunc) => {
  DpContainer.unsafeGetPipelineRepoDp().setJobExecFunc(
    pipeline->PipelineEntity.value,
    job->JobEntity.value,
    execFunc,
  );
};

let getPipelineStream = pipeline => {
  DpContainer.unsafeGetPipelineRepoDp().getPipelineStream(
    pipeline->PipelineEntity.value,
  )
  ->OptionSt.fromNullable;
};

let setPipelineStream = (pipeline, stream) => {
  DpContainer.unsafeGetPipelineRepoDp().setPipelineStream(
    pipeline->PipelineEntity.value,
    stream,
  );
};
