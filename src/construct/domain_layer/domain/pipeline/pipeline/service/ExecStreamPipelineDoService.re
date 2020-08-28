let exec = (handleFailFunc, pipelineStream: PipelinePOType.pipelineStream) => {
  pipelineStream
  ->WonderBsMost.Most.tap(
      result => {result->Result.handleFail(handleFailFunc)->ignore},
      _,
    )
  ->WonderBsMost.Most.drain;
};
