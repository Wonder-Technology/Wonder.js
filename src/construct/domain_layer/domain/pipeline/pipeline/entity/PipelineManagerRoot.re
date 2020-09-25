let getPipelineStream = pipeline => {
  DpContainer.unsafeGetPipelineRepoDp().getPipelineStream(
    pipeline->PipelineEntity.value,
  )
  
};

let setPipelineStream = (pipeline, stream) => {
  DpContainer.unsafeGetPipelineRepoDp().setPipelineStream(
    pipeline->PipelineEntity.value,
    stream,
  );
};
