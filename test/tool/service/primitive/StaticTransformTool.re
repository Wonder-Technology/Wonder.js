open SourceInstanceType;

let isTransformStatic = (sourceInstance, state) => {
  let {isTransformStatics} = SourceInstanceTool.getRecord(state);
  StaticTransformService.isTransformStatic(sourceInstance, isTransformStatics)
};

let markModelMatrixIsStatic = (sourceInstance, isStatic: bool, state) => {
  let {isTransformStatics} = SourceInstanceTool.getRecord(state);
  StaticTransformService.markModelMatrixIsStatic(sourceInstance, isStatic, isTransformStatics)
  |> ignore;
  state
};