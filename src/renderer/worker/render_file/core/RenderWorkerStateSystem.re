open RenderWorkerStateDataType;

let setState = (stateData, state) => {
  stateData.state = Some(state);
  state
};

let createState = () => {
  jobData: None,
  gpuDetectData: {extensionInstancedArrays: None, precision: None},
  deviceManagerData: {gl: None, viewport: None}
};

/* let getState = (stateData) => Js.Option.getExn(stateData.state); */
let getState = (stateData) =>
  switch stateData.state {
  | None => createState()
  | Some(state) => state
  };

/* TODO refactor: move out */
let setJobData = (pipelineJobs, jobs, stateData) =>
  {
    ...getState(stateData),
    jobData:
      Some({
        pipelineJobs:
          RenderWorkerJobConfigParseSystem.convertPipelineJobsToRecord(
            Js.Json.parseExn(pipelineJobs)
          ),
        jobs: RenderWorkerJobConfigParseSystem.convertJobsToRecord(Js.Json.parseExn(jobs))
      })
  }
  |> setState(stateData)
  |> ignore;

let _unsafeGetJobData = (state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j| exist|j}, ~actual={j|not|j}),
              () => state.jobData |> assertExist
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  state.jobData |> Js.Option.getExn
};

let getPipelineJobs = (state) => _unsafeGetJobData(state).pipelineJobs;

let getJobs = (state) => _unsafeGetJobData(state).jobs;