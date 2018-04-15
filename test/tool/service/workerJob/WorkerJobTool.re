open WorkerJobType;

open ParseWorkerJobService;

let buildMainInitPipelinesConfigWithoutCreateWorkerInstance = () => {|
[
    {
      "name": "default",
      "jobs": [
        {
          "name": "begin_init",
          "link": "merge",
          "jobs": [
            {
              "name": "init"
            },
            {
              "name": "get_finish_init_render_data"
            }
          ]
        },
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
          "link": "concat",
          "jobs": [
            {
              "name": "begin_init"
            }
          ]
        }
      ]
    }
  ]
    |};

let buildMainLoopPipelinesConfig= () => {|
[
    {
        "name": "default",
        "jobs": [
            {
                "name": "loop",
                "link": "concat",
                "jobs": [
                    {
                        "name": "send_draw_data"
                    }
                ]
            },
            {
                "name": "frame",
                "link": "merge",
                "jobs": [
                    {
                        "name": "loop"
                    },
                    {
                        "name": "get_finish_draw_data"
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

let buildMainLoopJobConfig = () => {|
[
    {
        "name": "tick"
    },
    {
        "name": "update_transform"
    },
    {
        "name": "update_camera"
    },
    {
        "name": "get_camera_data"
    },
    {
        "name": "create_basic_render_object_buffer"
    },
    {
        "name": "copy_transform"
    },
    {
        "name": "send_draw_data",
        "flags": [
            "DRAW"
        ]
    },
    {
        "name": "get_finish_draw_data",
        "flags": [
            "FINISH_DRAW_RENDER"
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
    "main_loop_pipeline": "default",
    "worker_pipeline": "default"
}
|},
      ~mainInitPipelines=buildMainInitPipelinesConfigWithoutCreateWorkerInstance(),
      ~mainLoopPipelines=buildMainLoopPipelinesConfig(),
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
      ~mainLoopJobs=buildMainLoopJobConfig(),
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
  mainLoopPipelines,
  workerPipelines,
  mainInitJobs,
  mainLoopJobs,
  workerJobs
);

let createWithRecord =
    (
      (
        setting,
        main_init_pipelines,
        main_loop_pipelines,
        main_init_jobs,
        main_loop_jobs,
        worker_pipelines,
        worker_jobs
      ),
      state: StateDataMainType.state
    ) => {
  ...state,
  workerJobRecord:
    RecordWorkerJobService.create((
      setting,
      main_init_pipelines,
      main_loop_pipelines,
      main_init_jobs,
      main_loop_jobs,
      worker_pipelines,
      worker_jobs
    ))
};

let create =
    (
      (
        workerSetting,
        mainInitPipelines,
        mainLoopPipelines,
        workerPipelines,
        mainInitJobs,
        mainLoopJobs,
        workerJobs
      ),
      state: StateDataMainType.state
    ) =>
  createWithRecord(
    (
      convertSettingToRecord(workerSetting |> Js.Json.parseExn),
      convertMainInitPipelinesToRecord(mainInitPipelines |> Js.Json.parseExn),
      convertMainLoopPipelinesToRecord(mainLoopPipelines |> Js.Json.parseExn),
      convertMainInitJobsToRecord(mainInitJobs |> Js.Json.parseExn),
      convertMainLoopJobsToRecord(mainLoopJobs |> Js.Json.parseExn),
      convertWorkerPipelinesToRecord(workerPipelines |> Js.Json.parseExn),
      convertWorkerJobsToRecord(workerJobs |> Js.Json.parseExn)
    ),
    state
  );

let getRenderWorkerPipelineJobs = OperateRenderWorkerJobService._getRenderWorkerPipelineJobs;

let convertWorkerPipelinesToRecord = ParseWorkerJobService.convertWorkerPipelinesToRecord;

let convertWorkerJobsToRecord = ParseWorkerJobService.convertWorkerJobsToRecord;

let getRenderWorkerJobStreamArr = WorkerJobService.getRenderWorkerJobStreamArr;
let getRenderWorkerPipelineJobs = OperateRenderWorkerJobService._getRenderWorkerPipelineJobs;

let convertWorkerPipelinesToRecord = ParseWorkerJobService.convertWorkerPipelinesToRecord;

let convertWorkerJobsToRecord = ParseWorkerJobService.convertWorkerJobsToRecord;

let getRenderWorkerJobStreamArr = WorkerJobService.getRenderWorkerJobStreamArr;