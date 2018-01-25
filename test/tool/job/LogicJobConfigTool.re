open LogicJobConfigType;

open LogicJobConfigParseSystem;

let buildLogicJobConfig =
    (
      ~logicSetting={|
    {
    "init_pipeline": "default",
    "update_pipeline": "default"
}
|},
      ~initPipelines={|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_cameraController"
        },
        {
          "name": "init_geometry"
        },
        {
          "name": "start_time"
        }
      ]
    }
  ]
        |},
      ~updatePipelines={|
[
  {
    "name": "default",
    "jobs": [
      {
        "name": "tick"
      },
      {
        "name": "update_cameraController"
      }
    ]
  }
]
        |},
      ~initJobs={|
[
    {
        "name": "init_cameraController"
    },
    {
        "name": "init_geometry"
    },
    {
        "name": "start_time"
    }
]
        |},
      ~updateJobs={|
[
  {
    "name": "tick"
  },
  {
    "name": "update_cameraController"
  }
]
        |},
      ()
    ) => (
  logicSetting,
  initPipelines,
  updatePipelines,
  initJobs,
  updateJobs
);

let initData =
    (
      (logicSetting, initPipelines, updatePipelines, initJobs, updateJobs),
      state: StateDataType.state
    ) => {
  ...state,
  logicJobConfig:
    Some({
      logic_setting: convertLogicSettingToRecord(logicSetting |> Js.Json.parseExn),
      init_pipelines: convertInitPipelinesToRecord(initPipelines |> Js.Json.parseExn),
      update_pipelines: convertUpdatePipelinesToRecord(updatePipelines |> Js.Json.parseExn),
      init_jobs: convertInitJobsToRecord(initJobs |> Js.Json.parseExn),
      update_jobs: convertUpdateJobsToRecord(updateJobs |> Js.Json.parseExn)
    })
};

let getLogicSetting = LogicJobConfigSystem.getLogicSetting;

let getInitPipelines = LogicJobConfigSystem.getInitPipelines;

let getInitJobs = LogicJobConfigSystem.getInitJobs;

let getUpdatePipelines = LogicJobConfigSystem.getUpdatePipelines;

let getUpdateJobs = LogicJobConfigSystem.getUpdateJobs;