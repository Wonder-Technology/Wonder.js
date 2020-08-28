let _injectDependencies = () => {
  RepoDpRunAPI.set({
    sceneRepo: {
      setSceneGameObject: SceneCPRepoDp.setSceneGameObject,
    },
    gameObjectRepo: {
      getMaxUID: GameObjectCPRepoDp.getMaxUID,
      setMaxUID: GameObjectCPRepoDp.setMaxUID,
      addTransform: GameObjectCPRepoDp.addTransform,
      getTransform: GameObjectCPRepoDp.getTransform,
      hasTransform: GameObjectCPRepoDp.hasTransform,
    },
    transformRepo: {
      getMaxIndex: TransformCPRepoDp.getMaxIndex,
      setMaxIndex: TransformCPRepoDp.setMaxIndex,
      getIsDirty: TransformCPRepoDp.getIsDirty,
      setIsDirty: TransformCPRepoDp.setIsDirty,
      setGameObject: TransformCPRepoDp.setGameObject,
      getGameObject: TransformCPRepoDp.getGameObject,
      hasParent: TransformCPRepoDp.hasParent,
      getParent: TransformCPRepoDp.getParent,
      setParent: TransformCPRepoDp.setParent,
      removeParent: TransformCPRepoDp.removeParent,
      getChildren: TransformCPRepoDp.getChildren,
      setChildren: TransformCPRepoDp.setChildren,
      addChild: TransformCPRepoDp.addChild,
      removeChild: TransformCPRepoDp.removeChild,
      getLocalToWorldMatrix: TransformCPRepoDp.getLocalToWorldMatrix,
      getLocalPosition: TransformCPRepoDp.getLocalPosition,
      setLocalPosition: TransformCPRepoDp.setLocalPosition,
      getLocalRotation: TransformCPRepoDp.getLocalRotation,
      setLocalRotation: TransformCPRepoDp.setLocalRotation,
      getLocalScale: TransformCPRepoDp.getLocalScale,
      setLocalScale: TransformCPRepoDp.setLocalScale,
    },
    globalTempRepo: {
      getFloat32Array1: GlobalTempCPRepoDp.getFloat32Array1,
    },
    pipelineRepo: {
      getJobExecFunc: PipelineCPRepoDp.getJobExecFunc,
      setJobExecFunc: PipelineCPRepoDp.setJobExecFunc,
      getPipelineStream: PipelineCPRepoDp.getPipelineStream,
      setPipelineStream: PipelineCPRepoDp.setPipelineStream,
    },
  });

  POConfigDpRunAPI.set({
    getTransformCount: POConfigCPRepoDp.getTransformCount,
  });
};

let _parseAndSetPipelineStream = pipelineData => {
  pipelineData
  ->PipelineRunAPI.parsePipelineData
  ->Result.mapSuccess(((pipeline, pipelineStream)) => {
      PipelineRunAPI.setPipelineStream(pipeline, pipelineStream)
    });
};

let _execPipelineStream =
    ((handleFailFunc, handleSuccessFunc), pipelineStream) => {
  pipelineStream->OptionSt.map(pipelineStream =>
    PipelineRunAPI.execPipelineStream(handleFailFunc, pipelineStream)
    ->Js.Promise.then_(() => handleSuccessFunc(), _)
  );
};

let init = ((handleFailFunc, handleSuccessFunc)) => {
  _injectDependencies();

  JobCPDoService.registerAllJobs();

  PipelineCPDoService.getInitPipelineData()
  ->_parseAndSetPipelineStream
  ->Result.bind(() => {
      PipelineCPDoService.getRunPipelineData()
      ->_parseAndSetPipelineStream
      ->Result.mapSuccess(() => {
          _execPipelineStream(
            (handleFailFunc, handleSuccessFunc),
            PipelineCPDoService.getPipelineStream(
              PipelineCPDoService.getInitPipeline(),
            ),
          )
          ->ignore
        })
    });
};

let run = ((handleFailFunc, handleSuccessFunc)) => {
  _execPipelineStream(
    (handleFailFunc, handleSuccessFunc),
    PipelineCPDoService.getPipelineStream(
      PipelineCPDoService.getRunPipeline(),
    ),
  )
  ->ignore;
};
