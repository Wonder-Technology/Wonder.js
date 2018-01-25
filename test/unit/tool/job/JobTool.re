let getRenderInitJobList = (state: StateDataType.state) => JobSystem._getRenderInitJobList(state);

let isJobExistInJobList = (jobName, jobList) =>
  jobList |> List.exists(((name, _)) => name === jobName);

let initLogic = JobSystem._initLogic;

let initRender = JobSystem._initRender;

let getLogicInitJobList = JobSystem._getLogicInitJobList;

let getLogicUpdateJobList = JobSystem._getLogicUpdateJobList;

let init = (state: StateDataType.state) => JobSystem.init(state);

let execLogicInitJobs = JobSystem.execLogicInitJobs;

let execLogicUpdateJobs = JobSystem.execLogicUpdateJobs;