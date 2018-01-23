open StateDataType;

open RenderConfigSystem;

let _getAllRenderJobs = (executableJobs, jobHandleMap, state: StateDataType.state) =>
  executableJobs
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (list, {name, flags, shader}: executableJob) =>
           switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
           | None =>
             /* TODO test */
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="_getAllRenderInitJobs",
                 ~description={j|can't find job handle function whose job name is $name|j},
                 ~reason="",
                 ~solution={j|make sure that the job name defined in config be correctly|j},
                 ~params={j|jobHandleMap: $jobHandleMap|j}
               )
             )
           | Some(handleFunc) => list @ [handleFunc((flags, shader))]
           }
       ),
       []
     );

let _getRenderInitJobList = (state: StateDataType.state) => state.jobData.renderInitJobList;

let _getRenderRenderJobList = (state: StateDataType.state) => state.jobData.renderRenderJobList;

let execRenderInitJobs = (gl, state: StateDataType.state) : state =>
  state
  |> _getRenderInitJobList
  |> List.fold_left((state, handleFunc) => handleFunc(gl, state), state);

let execRenderRenderJobs = (gl, state: StateDataType.state) : state =>
  state
  |> _getRenderRenderJobList
  |> List.fold_left((state, handleFunc) => handleFunc(gl, state), state);

let init = (state: StateDataType.state) => {
  let jobHandleMap = JobHandleSystem.createJobHandleMap();
  {
    ...state,
    jobData: {
      renderInitJobList:
        _getAllRenderJobs(
          getInitPipelineExecutableJobs(
            getRenderSetting(state),
            getInitPipelines(state),
            getInitJobs(state)
          ),
          jobHandleMap,
          state
        ),
      renderRenderJobList:
        _getAllRenderJobs(
          getRenderPipelineExecutableJobs(
            getRenderSetting(state),
            getRenderPipelines(state),
            getRenderJobs(state)
          ),
          jobHandleMap,
          state
        )
    }
  }
};