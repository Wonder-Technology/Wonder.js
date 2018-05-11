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

let buildMainLoopPipelinesConfig = () => {|
[
    {
        "name": "default",
        "jobs": [
            {
                "name": "loop",
                "link": "concat",
                "jobs": [
                    {
                        "name": "send_render_data"
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
                        "name": "get_finish_render_data"
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
        "name": "create_light_render_object_buffer"
    },
    {
        "name": "send_render_data",
        "flags": [
            "DRAW"
        ]
    },
    {
        "name": "get_finish_render_data",
        "flags": [
            "FINISH_RENDER"
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
                ],
                [
                    {
                        "name": "get_render_data"
                    },
                    {
                        "name": "send_finish_render_data"
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
        "name": "create_gl"
    },
    {
        "name": "init_transform"
    },
    {
        "name": "init_basic_material"
    },
    {
        "name": "send_finish_init_render_data",
        "flags": [
            "FINISH_INIT_RENDER"
        ]
    },
    {
        "name": "get_render_data",
        "flags": [
            "DRAW"
        ]
    },
    {
        "name": "clear_color"
    },
    {
        "name": "clear_buffer"
    },
    {
        "name": "clear_last_send_component"
    },
    {
        "name": "send_uniform_shader_data"
    },
    {
        "name": "render_basic"
    },
    {
        "name": "send_finish_render_data",
        "flags": [
            "FINISH_RENDER"
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
    ) => {
  ...state,
  workerJobRecord:
    Some({
      setting: convertSettingToRecord(workerSetting |> Js.Json.parseExn),
      mainInitPipelines: convertMainInitPipelinesToRecord(mainInitPipelines |> Js.Json.parseExn),
      mainLoopPipelines: convertMainLoopPipelinesToRecord(mainLoopPipelines |> Js.Json.parseExn),
      workerPipelines: convertWorkerPipelinesToRecord(workerPipelines |> Js.Json.parseExn),
      mainInitJobs: convertMainInitJobsToRecord(mainInitJobs |> Js.Json.parseExn),
      mainLoopJobs: convertMainLoopJobsToRecord(mainLoopJobs |> Js.Json.parseExn),
      workerJobs: convertWorkerJobsToRecord(workerJobs |> Js.Json.parseExn)
    })
};