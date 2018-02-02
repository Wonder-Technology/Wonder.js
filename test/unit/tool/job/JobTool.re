let getRenderInitJobList = (state: StateDataType.state) =>
  RenderJobSystem._getRenderInitJobList(state);

let isJobExistInJobList = (jobName, jobList) =>
  jobList |> List.exists(((name, _)) => name === jobName);

let initLogic = LogicJobSystem.init;

let initRender = RenderJobSystem.init;

let getLogicInitJobList = LogicJobSystem._getLogicInitJobList;

let getLogicUpdateJobList = LogicJobSystem._getLogicUpdateJobList;

let init = (state: StateDataType.state) => AllJobSystem.init(state);

let execLogicInitJobs = LogicJobSystem.execLogicInitJobs;

let execLogicUpdateJobs = LogicJobSystem.execLogicUpdateJobs;

let getConfigData = () => 1 |> Obj.magic;