let getRenderInitJobList = (state: StateDataType.state) => JobSystem._getRenderInitJobList(state);

let isJobExistInJobList = (jobName, jobList) =>
  jobList |> List.exists(((name, _)) => name === jobName);