open LogicConfigType;

open LogicConfigParseUtils;

let buildLogicConfig =
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
  logicConfig:
    Some({
      logic_setting: convertLogicSettingToRecord(logicSetting |> Js.Json.parseExn),
      init_pipelines: convertInitPipelinesToRecord(initPipelines |> Js.Json.parseExn),
      update_pipelines: convertUpdatePipelinesToRecord(updatePipelines |> Js.Json.parseExn),
      init_jobs: convertInitJobsToRecord(initJobs |> Js.Json.parseExn),
      update_jobs: convertUpdateJobsToRecord(updateJobs |> Js.Json.parseExn)
    })
};

let getLogicSetting = LogicConfigSystem.getLogicSetting;

let getInitPipelines = LogicConfigSystem.getInitPipelines;

let getInitJobs = LogicConfigSystem.getInitJobs;

let getUpdatePipelines = LogicConfigSystem.getUpdatePipelines;

let getUpdateJobs = LogicConfigSystem.getUpdateJobs;