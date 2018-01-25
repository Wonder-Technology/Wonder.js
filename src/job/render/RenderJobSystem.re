open StateDataType;

let _getAllRenderJobs = (executableJobs, jobHandleMap, state: StateDataType.state) =>
  RenderJobConfigType.(
    executableJobs
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (list, {name, flags, shader}: executableJob) =>
             switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
             | None => JobSystem.handleGetNoneJob(name, jobHandleMap)
             | Some(handleFunc) => list @ [(name, handleFunc((flags, shader)))]
             }
         ),
         []
       )
  );

let _getRenderInitJobList = (state: StateDataType.state) => state.jobData.renderInitJobList;

let _getRenderRenderJobList = (state: StateDataType.state) => state.jobData.renderRenderJobList;

let execRenderInitJobs = (gl, state: StateDataType.state) : state =>
  state
  |> _getRenderInitJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(gl, state), state);

let execRenderRenderJobs = (gl, state: StateDataType.state) : state =>
  state
  |> _getRenderRenderJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(gl, state), state);

let init = (state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    renderInitJobList:
      _getAllRenderJobs(
        RenderJobConfigSystem.getInitPipelineExecutableJobs(
          RenderJobConfigSystem.getRenderSetting(state),
          RenderJobConfigSystem.getInitPipelines(state),
          RenderJobConfigSystem.getInitJobs(state)
        ),
        RenderJobHandleSystem.createInitJobHandleMap(),
        state
      ),
    renderRenderJobList:
      _getAllRenderJobs(
        RenderJobConfigSystem.getRenderPipelineExecutableJobs(
          RenderJobConfigSystem.getRenderSetting(state),
          RenderJobConfigSystem.getRenderPipelines(state),
          RenderJobConfigSystem.getRenderJobs(state)
        ),
        RenderJobHandleSystem.createRenderJobHandleMap(),
        state
      )
  }
};

let addRenderInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    renderInitJobList:
      JobSystem.addJob(
        (targetJobName, afterJobName, targetHandleFunc),
        _getRenderInitJobList(state)
      )
  }
};

let addRenderRenderJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    renderRenderJobList:
      JobSystem.addJob(
        (targetJobName, afterJobName, targetHandleFunc),
        _getRenderRenderJobList(state)
      )
  }
};

let removeRenderInitJob = (targetJobName: string, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    renderInitJobList: JobSystem.removeJob(targetJobName, _getRenderInitJobList(state))
  }
};

let removeRenderRenderJob = (targetJobName: string, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    renderRenderJobList: JobSystem.removeJob(targetJobName, _getRenderRenderJobList(state))
  }
};