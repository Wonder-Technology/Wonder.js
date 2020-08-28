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
