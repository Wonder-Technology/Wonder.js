let prepare = (~pictureSize=(0, 0), ~sampleCount=1, ()) => {
  DirectorCPAPI.prepare(pictureSize, sampleCount)
  ->ResultTool.getExnSuccessValue;
};

let createAndSetAllComponentPOs = () => {
  DirectorCPApService._createAndSetAllComponentPOs()
  ->ResultTool.getExnSuccessValue;
};

let init =
    (
      ~handleSuccessFunc,
      ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
      (),
    ) => {
  let (_, pipelineStream) =
    DirectorCPAPI.init()->Result.handleFail(handleFailFunc->Obj.magic);

  PipelineTool.execPipelineStream(
    ~pipelineStream,
    ~handleSuccessFunc,
    ~handleFailFunc,
    (),
  );
};

let initAndUpdate =
    (
      ~handleSuccessFunc,
      ~handleAfterInitFunc=() => (),
      ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
      (),
    ) => {
  let (_, initPipelineStream) =
    DirectorCPAPI.init()->Result.handleFail(handleFailFunc->Obj.magic);

  let (_, updatePipelineStream) =
    DirectorCPAPI.update()->Result.handleFail(handleFailFunc->Obj.magic);


  PipelineTool.execPipelineStream(
    ~pipelineStream=
      initPipelineStream
      ->WonderBsMost.Most.tap(_ => {handleAfterInitFunc()}, _)
      ->WonderBsMost.Most.concat(updatePipelineStream, _),
    ~handleSuccessFunc,
    ~handleFailFunc,
    (),
  );
};

let initAndUpdateAndUpdate =
    (
      ~handleSuccessAfterUpdate1Func,
      ~handleSuccessAfterUpdate2Func,
      ~handleAfterInitFunc=() => (),
      ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
      (),
    ) => {
  let (_, initPipelineStream) =
    DirectorCPAPI.init()->Result.handleFail(handleFailFunc->Obj.magic);

  let (_, update1PipelineStream) =
    DirectorCPAPI.update()->Result.handleFail(handleFailFunc->Obj.magic);

  let (_, update2PipelineStream) =
    DirectorCPAPI.update()->Result.handleFail(handleFailFunc->Obj.magic);

  PipelineTool.execPipelineStream(
    ~pipelineStream=
      initPipelineStream
      ->WonderBsMost.Most.tap(_ => {handleAfterInitFunc()}, _)
      ->WonderBsMost.Most.concat(
          update1PipelineStream->WonderBsMost.Most.tap(
                                   result => {
                                     handleSuccessAfterUpdate1Func()->ignore
                                   },
                                   _,
                                 ),
          _,
        )
      ->WonderBsMost.Most.concat(update2PipelineStream, _),
    ~handleSuccessFunc=handleSuccessAfterUpdate2Func,
    ~handleFailFunc,
    (),
  );
};

let initAndRender =
    (
      ~handleSuccessFunc,
      ~handleFailFunc=ResultTool.buildEmptyHandleFailFunc(),
      (),
    ) => {
  let (_, initPipelineStream) =
    DirectorCPAPI.init()->Result.handleFail(handleFailFunc->Obj.magic);

  let (_, renderPipelineStream) =
    DirectorCPAPI.render()->Result.handleFail(handleFailFunc->Obj.magic);

  PipelineTool.execPipelineStream(
    ~pipelineStream=
      initPipelineStream->WonderBsMost.Most.concat(renderPipelineStream, _),
    ~handleSuccessFunc,
    ~handleFailFunc,
    (),
  );
};
