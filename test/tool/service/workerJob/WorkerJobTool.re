open WorkerJobType;

open ParseWorkerJobService;

let buildMainInitPipelinesConfigWithoutCreateWorkerInstance = () => {|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "init",
          "link": "concat",
          "jobs": [
            {
              "name": "transfer_job_data"
            },
            {
              "name": "send_init_render_data"
            }
          ]
        },
        {
          "name": "transfer_job_data",
          "link": "merge",
          "jobs": [
            {
              "name": "send_job_data"
            },
            {
              "name": "get_finish_send_job_data"
            }
          ]
        },
        {
          "name": "frame",
          "link": "merge",
          "jobs": [
            {
              "name": "init"
            },
            {
              "name": "get_finish_init_render_data"
            }
          ]
        }
      ]
    }
  ]
    |};

let buildMainInitJobConfigWithoutCreateWorkerInstance = () => {|
[
    {
        "name": "send_job_data",
        "flags": [
            "SEND_JOB_DATA"
        ]
    },
    {
        "name": "get_finish_send_job_data",
        "flags": [
            "FINISH_SEND_JOB_DATA"
        ]
    },
    {
        "name": "send_init_render_data",
        "flags": [
            "INIT_RENDER"
        ]
    },
    {
        "name": "get_finish_init_render_data",
        "flags": [
            "FINISH_INIT_RENDER"
        ]
    }
]
    |};

let buildWorkerJobConfig =
    (
      ~workerSetting={|
    {
    "worker_file_dir": "./dist/",
    "main_init_pipeline": "default",
    "worker_pipeline": "default"
}
|},
      ~mainInitPipelines=buildMainInitPipelinesConfigWithoutCreateWorkerInstance(),
      ~workerPipelines={|
[
    {
        "name": "default",
        "jobs": {
            "render": [
                [
                    {
                        "name": "send_finish_send_job_data"
                    },
                    {
                        "name": "get_init_render_data"
                    },
                    {
                        "name": "init_gl"
                    },
                    {
                        "name": "send_finish_init_render_data"
                    }
                ]
            ]
        }
    }
]
|},
      ~mainInitJobs=buildMainInitJobConfigWithoutCreateWorkerInstance(),
      ~workerJobs={|
[
    {
        "name": "send_finish_send_job_data",
        "flags": [
            "FINISH_SEND_JOB_DATA"
        ]
    },
    {
        "name": "get_init_render_data",
        "flags": [
            "INIT_RENDER"
        ]
    },
    {
        "name": "init_gl"
    },
    {
        "name": "send_finish_init_render_data",
        "flags": [
            "FINISH_INIT_RENDER"
        ]
    }
]
        |},
      ()
    ) => (
  workerSetting,
  mainInitPipelines,
  workerPipelines,
  mainInitJobs,
  workerJobs
);

let createWithRecord =
    (
      (setting, mainInitPipelines, workerPipelines, mainInitJobs, workerJobs),
      state: StateDataMainType.state
    ) => {
  ...state,
  workerJobRecord:
    RecordWorkerJobService.create((
      setting,
      mainInitPipelines,
      workerPipelines,
      mainInitJobs,
      workerJobs
    ))
};

let create =
    (
      (workerSetting, mainInitPipelines, workerPipelines, mainInitJobs, workerJobs),
      state: StateDataMainType.state
    ) =>
  createWithRecord(
    (
      convertSettingToRecord(workerSetting |> Js.Json.parseExn),
      convertMainInitPipelinesToRecord(mainInitPipelines |> Js.Json.parseExn),
      convertMainInitJobsToRecord(mainInitJobs |> Js.Json.parseExn),
      convertWorkerPipelinesToRecord(workerPipelines |> Js.Json.parseExn),
      convertWorkerJobsToRecord(workerJobs |> Js.Json.parseExn)
    ),
    state
  );

let getRenderWorkerPipelineJobs = OperateRenderWorkerJobService._getRenderWorkerPipelineJobs;

let convertWorkerPipelinesToRecord = ParseWorkerJobService.convertWorkerPipelinesToRecord;

let convertWorkerJobsToRecord = ParseWorkerJobService.convertWorkerJobsToRecord;

let getRenderWorkerJobStreamArr = WorkerJobService.getRenderWorkerJobStreamArr;